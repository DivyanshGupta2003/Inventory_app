Inventory & Order Management System
A full-stack web application for managing products, customers, orders, and inventory tracking.
🔗 Live Links
ServiceURLFrontend (Vercel)https://inventory-app-five-theta.vercel.appBackend API (Render)https://inventory-app-k5gx.onrender.comAPI Documentationhttps://inventory-app-k5gx.onrender.com/docsDocker Hub Imagehttps://hub.docker.com/r/divyansh123docker/inventory-backend

📋 Project Overview
This Inventory & Order Management System allows businesses to manage their products, customers, and orders efficiently. It includes real-time inventory tracking, automatic stock reduction on order placement, and a clean dashboard for monitoring key metrics.

🛠️ Tech Stack
LayerTechnologyFrontendReact.jsBackendPython, FastAPIDatabasePostgreSQLContainerizationDockerOrchestrationDocker ComposeFrontend HostingVercelBackend HostingRenderVersion ControlGit & GitHub

✨ Features
Product Management

Add, view, update, and delete products
Unique SKU/code per product
Real-time stock quantity tracking
Low stock alerts on dashboard

Customer Management

Add, view, and delete customers
Unique email validation per customer
Store name, email, and phone number

Order Management

Create orders with multiple products
Automatic total amount calculation
Automatic stock reduction on order placement
View order details with product breakdown
Cancel/delete orders

Dashboard

Total products count
Total customers count
Total orders count
Low stock products list (quantity < 5)


🔧 Business Rules

Product SKU must be unique
Customer email must be unique
Product quantity cannot be negative
Orders cannot be placed if stock is insufficient
Creating an order automatically reduces available stock
Total order amount is calculated automatically by the backend


📁 Project Structure
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

🚀 API Endpoints
Products
MethodEndpointDescriptionGET/productsGet all productsPOST/productsCreate a productGET/products/{id}Get product by IDPUT/products/{id}Update a productDELETE/products/{id}Delete a product
Customers
MethodEndpointDescriptionGET/customersGet all customersPOST/customersCreate a customerGET/customers/{id}Get customer by IDDELETE/customers/{id}Delete a customer
Orders
MethodEndpointDescriptionGET/ordersGet all ordersPOST/ordersCreate an orderGET/orders/{id}Get order by IDDELETE/orders/{id}Cancel an order
Dashboard
MethodEndpointDescriptionGET/dashboardGet summary stats

🐳 Run Locally with Docker
Prerequisites

Docker Desktop installed and running
Git

Steps
bash# 1. Clone the repository
git clone https://github.com/DivyanshGupta2003/Inventory_app.git
cd Inventory_app

# 2. Create environment file
cp .env.example .env

# 3. Start all services
docker compose up --build
Access the app
ServiceURLFrontendhttp://localhost:3000Backend APIhttp://localhost:8000API Docshttp://localhost:8000/docs
Stop the app
bashdocker compose down

⚙️ Environment Variables
Create a .env file in the root directory:
envPOSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=inventory
For the frontend, create frontend/.env:
envREACT_APP_API_URL=http://localhost:8000

🌐 Deployment
Backend — Render

Create a PostgreSQL database on Render (free tier)
Create a Web Service connected to this GitHub repo
Set Root Directory to backend
Add environment variable: DATABASE_URL = your Render PostgreSQL URL
Build command: pip install -r requirements.txt
Start command: uvicorn main:app --host 0.0.0.0 --port $PORT

Frontend — Vercel

Import this GitHub repo on Vercel
Set Root Directory to frontend
Add environment variable: REACT_APP_API_URL = your Render backend URL
Deploy


🐋 Docker Hub
Backend image available at:
docker pull divyansh123docker/inventory-backend:latest

👤 Author
Divyansh Gupta

GitHub: @DivyanshGupta2003
