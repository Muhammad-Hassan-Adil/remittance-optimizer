from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
from database import engine, get_db
from services import RemittanceService
from pydantic import BaseModel
from apscheduler.schedulers.background import BackgroundScheduler
from scraper import seed_data

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Pakistani Freelance Remittance Optimizer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def start_scheduler():
    scheduler = BackgroundScheduler()
    # Run the scraper every 24 hours
    scheduler.add_job(seed_data, 'interval', hours=24)
    scheduler.start()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Pakistani Freelance Remittance Optimizer API. Go to /docs for the API documentation."}

@app.get("/api/rate")
def get_rate(db: Session = Depends(get_db)):
    rate = RemittanceService.get_latest_rate(db)
    if not rate:
        raise HTTPException(status_code=404, detail="Rate not found")
    return {"usd_to_pkr": rate.usd_to_pkr, "updated_at": rate.updated_at}

@app.get("/api/platforms")
def get_platforms(db: Session = Depends(get_db)):
    return RemittanceService.get_platforms(db)

@app.get("/api/banks")
def get_banks(db: Session = Depends(get_db)):
    return RemittanceService.get_banks(db)

@app.get("/api/payout/{currency}/{platform_slug}/{bank_slug}")
def get_payout(
    currency: str,
    platform_slug: str, 
    bank_slug: str, 
    amount: float = Query(100.0, gt=0), 
    is_filer: bool = Query(True),
    db: Session = Depends(get_db)
):
    result = RemittanceService.calculate_payout(db, platform_slug, bank_slug, amount, is_filer, currency)
    if not result:
        raise HTTPException(status_code=404, detail="Platform, bank, or rate not found")
    return result

@app.post("/api/contact")
def create_contact(contact: ContactMessageCreate, db: Session = Depends(get_db)):
    db_msg = models.ContactMessage(
        name=contact.name,
        email=contact.email,
        message=contact.message
    )
    db.add(db_msg)
    db.commit()
    return {"message": "Message sent successfully!"}

@app.get("/api/leaderboard")
def get_leaderboard(amount: float = Query(1000.0, gt=0), is_filer: bool = Query(True), currency: str = Query("USD"), db: Session = Depends(get_db)):
    platforms = RemittanceService.get_platforms(db)
    banks = RemittanceService.get_banks(db)
    
    results = []
    for p in platforms:
        for b in banks:
            payout = RemittanceService.calculate_payout(db, p.slug, b.slug, amount, is_filer, currency)
            if payout:
                results.append(payout)
    
    # Sort descending by final_pkr
    results.sort(key=lambda x: x["final_pkr"], reverse=True)
    return results[:5]
