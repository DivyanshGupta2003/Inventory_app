# Inventory & Order Management System

A full-stack web application for managing products, customers, orders, and inventory tracking.

## 🔗 Live Links

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://inventory-app-five-theta.vercel.app |
| Backend API (Render) | https://inventory-app-k5gx.onrender.com |
| API Documentation | https://inventory-app-k5gx.onrender.com/docs |
| Docker Hub Image | https://hub.docker.com/r/divyansh123docker/inventory-backend |

---

## 📋 Project Overview

This Inventory & Order Management System allows businesses to manage their products, customers, and orders efficiently. It includes real-time inventory tracking, automatic stock reduction on order placement, and a clean dashboard for monitoring key metrics.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Containerization | Docker |
| Orchestration | Docker Compose |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git & GitHub |

---

## ✨ Features

### Product Management
- Add, view, update, and delete products
- Unique SKU/code per product
- Real-time stock quantity tracking
- Low stock alerts on dashboard

### Customer Management
- Add, view, and delete customers
- Unique email validation per customer
- Store name, email, and phone number

### Order Management
- Create orders with multiple products
- Automatic total amount calculation
- Automatic stock reduction on order placement
- View order details with product breakdown
- Cancel/delete orders

### Dashboard
- Total products count
- Total customers count
- Total orders count
- Low stock products list (quantity < 5)

---

## 🔧 Business Rules

- Product SKU must be unique
- Customer email must be unique
- Product quantity cannot be negative
- Orders cannot be placed if stock is insufficient
- Creating an order automatically reduces available stock
- Total order amount is calculated automatically by the backend

---

## 📁 Project Structure

```
inventory-app/
├── backend/
│   ├── main.py          # FastAPI routes
│   ├── models.py        # SQLAlchemy database models
│   ├── schemas.py       # Pydantic validation schemas
│   ├── crud.py          # Business logic / database operations
│   ├── database.py      # Database connection configuration
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile       # Backend container configuration
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Products.js
│   │   │   ├── Customers.js
│   │   │   └── Orders.js
│   │   ├── App.js
│   │   ├── api.js       # Axios API configuration
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile       # Frontend container configuration
├── docker-compose.yml   # Multi-service orchestration
├── .env.example         # Environment variables template
└── README.md
```

---

## 🚀 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products |
| POST | /products | Create a product |
| GET | /products/{id} | Get product by ID |
| PUT | /products/{id} | Update a product |
| DELETE | /products/{id} | Delete a product |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /customers | Get all customers |
| POST | /customers | Create a customer |
| GET | /customers/{id} | Get customer by ID |
| DELETE | /customers/{id} | Delete a customer |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /orders | Get all orders |
| POST | /orders | Create an order |
| GET | /orders/{id} | Get order by ID |
| DELETE | /orders/{id} | Cancel an order |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard | Get summary stats |

---

## 🐳 Run Locally with Docker

### Prerequisites
- Docker Desktop installed and running
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/DivyanshGupta2003/Inventory_app.git
cd Inventory_app

# 2. Create environment file
cp .env.example .env

# 3. Start all services
docker compose up --build
```

### Access the app
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

### Stop the app
```bash
docker compose down
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=inventory
```

For the frontend, create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## 🌐 Deployment

### Backend — Render
1. Create a PostgreSQL database on Render (free tier)
2. Create a Web Service connected to this GitHub repo
3. Set Root Directory to `backend`
4. Add environment variable: `DATABASE_URL` = your Render PostgreSQL URL
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend — Vercel
1. Import this GitHub repo on Vercel
2. Set Root Directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL` = your Render backend URL
4. Deploy

---

## 🐋 Docker Hub

Backend image available at:
```
docker pull divyansh123docker/inventory-backend:latest
```

---

## 👤 Author

**Divyansh Gupta**
- GitHub: [@DivyanshGupta2003](https://github.com/DivyanshGupta2003)
