from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory & Order Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ── Products ──────────────────────────────────────────────
@app.post("/products", response_model=schemas.Product, status_code=201)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@app.get("/products", response_model=list[schemas.Product])
def list_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@app.get("/products/{id}", response_model=schemas.Product)
def get_product(id: int, db: Session = Depends(get_db)):
    p = crud.get_product(db, id)
    if not p:
        raise HTTPException(404, "Product not found")
    return p

@app.put("/products/{id}", response_model=schemas.Product)
def update_product(id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.update_product(db, id, product)

@app.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    crud.delete_product(db, id)
    return {"message": "Product deleted"}

# ── Customers ─────────────────────────────────────────────
@app.post("/customers", response_model=schemas.Customer, status_code=201)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db, customer)

@app.get("/customers", response_model=list[schemas.Customer])
def list_customers(db: Session = Depends(get_db)):
    return crud.get_customers(db)

@app.get("/customers/{id}", response_model=schemas.Customer)
def get_customer(id: int, db: Session = Depends(get_db)):
    c = crud.get_customer(db, id)
    if not c:
        raise HTTPException(404, "Customer not found")
    return c

@app.delete("/customers/{id}")
def delete_customer(id: int, db: Session = Depends(get_db)):
    crud.delete_customer(db, id)
    return {"message": "Customer deleted"}

# ── Orders ────────────────────────────────────────────────
@app.post("/orders", response_model=schemas.Order, status_code=201)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db, order)

@app.get("/orders", response_model=list[schemas.Order])
def list_orders(db: Session = Depends(get_db)):
    return crud.get_orders(db)

@app.get("/orders/{id}", response_model=schemas.Order)
def get_order(id: int, db: Session = Depends(get_db)):
    o = crud.get_order(db, id)
    if not o:
        raise HTTPException(404, "Order not found")
    return o

@app.delete("/orders/{id}")
def delete_order(id: int, db: Session = Depends(get_db)):
    crud.delete_order(db, id)
    return {"message": "Order deleted"}

# ── Dashboard ─────────────────────────────────────────────
@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard(db)