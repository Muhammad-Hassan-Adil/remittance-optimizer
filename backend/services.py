from sqlalchemy.orm import Session
import models

class RemittanceService:
    @staticmethod
    def get_latest_rate(db: Session):
        return db.query(models.Rate).order_by(models.Rate.updated_at.desc()).first()

    @staticmethod
    def get_platforms(db: Session):
        return db.query(models.Platform).all()

    @staticmethod
    def get_banks(db: Session):
        return db.query(models.Bank).all()

    @staticmethod
    def calculate_payout(db: Session, platform_slug: str, bank_slug: str, amount: float, is_filer: bool, currency: str = "USD"):
        platform = db.query(models.Platform).filter(models.Platform.slug == platform_slug).first()
        bank = db.query(models.Bank).filter(models.Bank.slug == bank_slug).first()
        rate_record = RemittanceService.get_latest_rate(db)
        
        if not platform or not bank or not rate_record:
            return None
            
        # Get specific currency rate dynamically
        rate_val = getattr(rate_record, f"{currency.lower()}_to_pkr", None)
        if rate_val is None or rate_val <= 0:
            return None
            
        amount_after_fixed = amount - platform.fee_fixed
        if amount_after_fixed < 0:
            amount_after_fixed = 0
            
        platform_fee = platform.fee_fixed + (amount_after_fixed * (platform.fee_percentage / 100))
        amount_to_convert = amount - platform_fee
        
        if amount_to_convert < 0:
            amount_to_convert = 0
            
        pkr_base = amount_to_convert * rate_val
        
        tax_percentage = bank.tax_filer_percentage if is_filer else bank.tax_non_filer_percentage
        tax_pkr = pkr_base * (tax_percentage / 100)
        
        final_pkr = pkr_base - tax_pkr
        
        return {
            "base_amount": amount,
            "currency": currency.upper(),
            "exchange_rate": rate_val,
            "platform_name": platform.name,
            "bank_name": bank.name,
            "platform_slug": platform.slug,
            "bank_slug": bank.slug,
            "platform_fee": round(platform_fee, 2),
            "tax_pkr": round(tax_pkr, 2),
            "final_pkr": round(final_pkr, 2)
        }
