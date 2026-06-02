from fastapi import HTTPException
from sqlalchemy.orm import Session
import models, schemas

# ── Products ──────────────────────────────────────────────
def create_product(db: Session, data: schemas.ProductCreate):
    if db.query(models.Product).filter_by(sku=data.sku).first():
        raise HTTPException(400, "SKU already exists")
    p = models.Product(**data.dict())
    db.add(p); db.commit(); db.refresh(p)
    return p

def get_products(db: Session):
    return db.query(models.Product).all()

def get_product(db: Session, id: int):
    return db.query(models.Product).get(id)

def update_product(db: Session, id: int, data: schemas.ProductCreate):
    p = db.query(models.Product).get(id)
    if not p:
        raise HTTPException(404, "Product not found")
    existing = db.query(models.Product).filter(models.Product.sku == data.sku, models.Product.id != id).first()
    if existing:
        raise HTTPException(400, "SKU already exists")
    for k, v in data.dict().items():
        setattr(p, k, v)
    db.commit(); db.refresh(p)
    return p

def delete_product(db: Session, id: int):
    p = db.query(models.Product).get(id)
    if not p:
        raise HTTPException(404, "Product not found")
    db.delete(p); db.commit()

# ── Customers ─────────────────────────────────────────────
def create_customer(db: Session, data: schemas.CustomerCreate):
    if db.query(models.Customer).filter_by(email=data.email).first():
        raise HTTPException(400, "Email already exists")
    c = models.Customer(**data.dict())
    db.add(c); db.commit(); db.refresh(c)
    return c

def get_customers(db: Session):
    return db.query(models.Customer).all()

def get_customer(db: Session, id: int):
    return db.query(models.Customer).get(id)

def delete_customer(db: Session, id: int):
    c = db.query(models.Customer).get(id)
    if not c:
        raise HTTPException(404, "Customer not found")
    db.delete(c); db.commit()

# ── Orders ────────────────────────────────────────────────
def create_order(db: Session, data: schemas.OrderCreate):
    if not db.query(models.Customer).get(data.customer_id):
        raise HTTPException(404, "Customer not found")
    total = 0.0
    items_to_create = []
    for item in data.items:
        product = db.query(models.Product).get(item.product_id)
        if not product:
            raise HTTPException(404, f"Product {item.product_id} not found")
        if product.quantity < item.quantity:
            raise HTTPException(400, f"Insufficient stock for '{product.name}'. Available: {product.quantity}")
        total += product.price * item.quantity
        items_to_create.append((product, item.quantity, product.price))

    order = models.Order(customer_id=data.customer_id, total=total)
    db.add(order); db.flush()
    for product, qty, price in items_to_create:
        db.add(models.OrderItem(order_id=order.id, product_id=product.id, quantity=qty, unit_price=price))
        product.quantity -= qty
    db.commit(); db.refresh(order)
    return order

def get_orders(db: Session):
    return db.query(models.Order).all()

def get_order(db: Session, id: int):
    return db.query(models.Order).get(id)

def delete_order(db: Session, id: int):
    o = db.query(models.Order).get(id)
    if not o:
        raise HTTPException(404, "Order not found")
    db.delete(o); db.commit()

# ── Dashboard ─────────────────────────────────────────────
def get_dashboard(db: Session):
    low_stock = db.query(models.Product).filter(models.Product.quantity < 5).all()
    return {
        "total_products":  db.query(models.Product).count(),
        "total_customers": db.query(models.Customer).count(),
        "total_orders":    db.query(models.Order).count(),
        "low_stock":       [{"id": p.id, "name": p.name, "quantity": p.quantity} for p in low_stock],
    }