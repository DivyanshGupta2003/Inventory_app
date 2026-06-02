from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional

# ── Product ───────────────────────────────────────────────
class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int

    @validator("quantity")
    def qty_non_negative(cls, v):
        if v < 0:
            raise ValueError("Quantity cannot be negative")
        return v

class Product(ProductCreate):
    id: int
    class Config:
        orm_mode = True

# ── Customer ──────────────────────────────────────────────
class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None

class Customer(CustomerCreate):
    id: int
    class Config:
        orm_mode = True

# ── Order ─────────────────────────────────────────────────
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    product: Optional[Product] = None
    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class Order(BaseModel):
    id: int
    customer_id: int
    total: float
    customer: Optional[Customer] = None
    items: List[OrderItemOut] = []
    class Config:
        orm_mode = True