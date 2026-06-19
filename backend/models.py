from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
import datetime

class Rate(Base):
    __tablename__ = "rates"
    id = Column(Integer, primary_key=True, index=True)
    usd_to_pkr = Column(Float, nullable=False, default=0.0)
    gbp_to_pkr = Column(Float, nullable=False, default=0.0)
    eur_to_pkr = Column(Float, nullable=False, default=0.0)
    aud_to_pkr = Column(Float, nullable=False, default=0.0)
    aed_to_pkr = Column(Float, nullable=False, default=0.0)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

class Platform(Base):
    __tablename__ = "platforms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    fee_percentage = Column(Float, default=0.0) # e.g. 2.0 for 2%
    fee_fixed = Column(Float, default=0.0)      # e.g. 1.5 for $1.50

class Bank(Base):
    __tablename__ = "banks"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    tax_filer_percentage = Column(Float, default=1.0) # 1% for filers
    tax_non_filer_percentage = Column(Float, default=2.0) # 2% for non-filers

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
