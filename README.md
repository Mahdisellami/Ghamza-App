# Ghamza Shop - E-Commerce Platform

A modern full-stack e-commerce platform for **Ghamza**, a Tunisian brand specializing in authentic handcrafted products. Built with Next.js 14, FastAPI, and PostgreSQL.

## Tech Stack

### Frontend (Vercel)
- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Query** for data fetching
- **Axios** for API calls

### Backend (Render)
- **FastAPI** (Python 3.11+)
- **PostgreSQL 16** database
- **SQLAlchemy** ORM
- **Alembic** for migrations
- **Pydantic** for validation

### DevOps
- **Docker & Docker Compose** for local development
- **Vercel** for frontend deployment
- **Render** for backend & database hosting

## Features

### Phase 1 (Current)
- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ User authentication & registration
- ✅ Order management
- ✅ Admin product management
- 🚧 Payment integration (planned)
- 🚧 Instagram integration (planned)

## Project Structure

```
Ghamza-App/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities & API client
│   │   └── stores/          # Zustand stores
│   ├── public/              # Static assets
│   └── Dockerfile
│
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── routers/         # API endpoints
│   │   └── main.py          # FastAPI entry point
│   ├── alembic/             # Database migrations
│   ├── seed_data.py         # Database seeding script
│   ├── requirements.txt
│   └── Dockerfile
│
├── docs/                    # Documentation
├── docker-compose.yml       # Production Docker setup
├── docker-compose.dev.yml   # Development Docker setup
├── start.sh                 # Startup script
└── stop.sh                  # Shutdown script
```

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ghamza-App
   ```

2. **Start all services**
   ```bash
   ./start.sh dev
   ```

   This will:
   - Start PostgreSQL database
   - Start FastAPI backend
   - Start Next.js frontend
   - Seed the database with initial data

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - pgAdmin: http://localhost:5050 (admin@ghamza.com / admin)

4. **Stop all services**
   ```bash
   ./stop.sh
   ```

### Local Development (Without Docker)

See [QUICK_START.md](./docs/QUICK_START.md) for detailed local setup instructions.

## Database Schema

### Core Tables
- **users** - User accounts and profiles
- **categories** - Product categories
- **products** - Product catalog
- **cart_items** - Shopping cart items
- **orders** - Customer orders
- **order_items** - Order line items

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Key Endpoints

#### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

#### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin)

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user

#### Orders
- `GET /api/orders` - List user's orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create new order

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://ghamza_user:ghamza_password@localhost:5432/ghamza_shop
DEBUG=True
API_HOST=0.0.0.0
API_PORT=8000
ALLOWED_ORIGINS=http://localhost:3000
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
3. Deploy from `main` branch

### Backend (Render)
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables from `.env.example`

### Database (Render)
1. Create a PostgreSQL database
2. Copy the connection URL to backend environment

See [DEPLOYMENT_CHECKLIST.md](./docs/DEPLOYMENT_CHECKLIST.md) for detailed deployment steps.

## Development Workflow

### Database Migrations

```bash
# Create a new migration
cd backend
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Seeding Database

```bash
cd backend
python seed_data.py
```

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

## Default Credentials

**Admin User:**
- Email: admin@ghamza.com
- Password: admin123

**Database (Docker):**
- User: ghamza_user
- Password: ghamza_password
- Database: ghamza_shop

**pgAdmin:**
- Email: admin@ghamza.com
- Password: admin

## Brand Information

**Ghamza** is a Tunisian brand specializing in authentic handcrafted products.
- Instagram: [@gamza_tounsia](https://www.instagram.com/gamza_tounsia/)

## TODO / Roadmap

- [ ] Implement JWT authentication properly
- [ ] Add password hashing with bcrypt
- [ ] Integrate payment gateway (Stripe / local Tunisian gateways)
- [ ] Add Instagram integration
- [ ] Add product reviews and ratings
- [ ] Implement admin dashboard
- [ ] Add email notifications
- [ ] Add product search and filtering
- [ ] Add product images upload
- [ ] Mobile app (React Native)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For questions or issues, please create an issue on GitHub.