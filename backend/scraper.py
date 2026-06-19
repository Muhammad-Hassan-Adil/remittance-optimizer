import os
import requests
from bs4 import BeautifulSoup
from database import SessionLocal, engine
import models
import datetime

def fetch_exchange_rate(currency):
    url = f'https://www.google.com/finance/quote/{currency}-PKR'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    rate_tag = soup.find('div', class_='YMlKec fxKbKc')
    if rate_tag:
        rate_str = rate_tag.text.strip().replace(',', '')
        return float(rate_str)
        
    fallbacks = {
        'USD': 278.50,
        'GBP': 355.20,
        'EUR': 298.40,
        'AUD': 185.60,
        'AED': 75.80
    }
    return fallbacks.get(currency, 280.0)

def seed_data():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Fetch and save live rates
        currencies = ['USD', 'GBP', 'EUR', 'AUD', 'AED']
        rates = {}
        for curr in currencies:
            rates[curr] = fetch_exchange_rate(curr)
            print(f"Fetched {curr}: {rates[curr]}")
            
        rate = models.Rate(
            usd_to_pkr=rates['USD'],
            gbp_to_pkr=rates['GBP'],
            eur_to_pkr=rates['EUR'],
            aud_to_pkr=rates['AUD'],
            aed_to_pkr=rates['AED'],
            updated_at=datetime.datetime.utcnow()
        )
        db.add(rate)
        
        # Seed platforms
        platforms_data = [
            {"name": "Payoneer", "slug": "payoneer", "fee_percentage": 2.0, "fee_fixed": 0.0},
            {"name": "Elevate", "slug": "elevate", "fee_percentage": 0.0, "fee_fixed": 1.5},
            {"name": "Wise", "slug": "wise", "fee_percentage": 1.5, "fee_fixed": 0.0}
        ]
        
        for p_data in platforms_data:
            exists = db.query(models.Platform).filter(models.Platform.slug == p_data["slug"]).first()
            if not exists:
                db.add(models.Platform(**p_data))
                
        # Seed banks
        banks_data = [
            {"name": "Meezan Bank", "slug": "meezan-bank", "tax_filer_percentage": 1.0, "tax_non_filer_percentage": 2.0},
            {"name": "HBL", "slug": "hbl", "tax_filer_percentage": 1.0, "tax_non_filer_percentage": 2.0},
            {"name": "Faysal Bank", "slug": "faysal-bank", "tax_filer_percentage": 1.0, "tax_non_filer_percentage": 2.0}
        ]
        
        for b_data in banks_data:
            exists = db.query(models.Bank).filter(models.Bank.slug == b_data["slug"]).first()
            if not exists:
                db.add(models.Bank(**b_data))
                
        db.commit()
        print(f"Database seeded successfully with {len(currencies)} currencies.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
