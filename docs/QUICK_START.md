# Quick Start Guide

This guide will help you get the Ghamza Shop application running locally.

## Option 1: Docker (Recommended)

### Prerequisites
- Docker Desktop installed and running

### Steps

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd Ghamza-App
   ```

2. **Start Development Environment**
   ```bash
   ./start.sh dev
   ```

   This single command will:
   - Pull required Docker images
   - Start PostgreSQL database
   - Start FastAPI backend with hot reload
   - Start Next.js frontend with hot reload
   - Create database tables
   - Seed initial data

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs
   - pgAdmin: http://localhost:5050

4. **Make Changes**
   - Frontend code in `frontend/` will hot-reload automatically
   - Backend code in `backend/` will hot-reload automatically

5. **Stop Services**
   ```bash
   ./stop.sh
   ```

## Option 2: Local Development (Without Docker)

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 16+

### Backend Setup

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Database**
   ```bash
   # Create PostgreSQL database
   createdb ghamza_shop

   # Or using psql
   psql -U postgres
   CREATE DATABASE ghamza_shop;
   \q
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Run Migrations**
   ```bash
   alembic upgrade head
   ```

6. **Seed Database**
   ```bash
   python seed_data.py
   ```

7. **Start Backend Server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   Backend will be available at: http://localhost:8000

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000

## Verify Installation

1. **Check Backend Health**
   ```bash
   curl http://localhost:8000/health
   ```

   Expected response:
   ```json
   {"status": "healthy"}
   ```

2. **Check API Documentation**
   Visit: http://localhost:8000/docs

3. **Check Frontend**
   Visit: http://localhost:3000

4. **Test API Endpoints**
   ```bash
   # Get all products
   curl http://localhost:8000/api/products

   # Get all categories
   curl http://localhost:8000/api/categories
   ```

## Default Test Data

After seeding, you'll have:

### Categories
- Pottery
- Textiles
- Jewelry
- Baskets
- Home Decor

### Sample Products
- Traditional Tunisian Plate (Pottery)
- Handwoven Table Runner (Textiles)
- Ceramic Tagine Pot (Pottery)

### Admin User
- Email: admin@ghamza.com
- Password: admin123

## Common Issues

### Docker Issues

**Issue:** "Docker is not running"
- **Solution:** Start Docker Desktop

**Issue:** "Port already in use"
- **Solution:** Stop conflicting services or change ports in docker-compose files

### Backend Issues

**Issue:** "Database connection failed"
- **Solution:** Check PostgreSQL is running and credentials in `.env` are correct

**Issue:** "Module not found"
- **Solution:** Make sure virtual environment is activated and dependencies are installed

### Frontend Issues

**Issue:** "Cannot connect to API"
- **Solution:** Verify backend is running and `NEXT_PUBLIC_API_URL` in `.env.local` is correct

**Issue:** "Module not found"
- **Solution:** Run `npm install` again

## Next Steps

- Read the [README.md](../README.md) for full documentation
- Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for deployment guide
- Explore the API at http://localhost:8000/docs
- Start building features!

## Development Tips

1. **Hot Reload**
   - Frontend: Changes reflect immediately
   - Backend: FastAPI automatically reloads on code changes

2. **Database Management**
   - Use pgAdmin at http://localhost:5050
   - Or use command line: `psql -U ghamza_user -d ghamza_shop`

3. **API Testing**
   - Use the Swagger UI at http://localhost:8000/docs
   - Or use tools like Postman/Insomnia

4. **Logs**
   ```bash
   # Docker logs
   docker-compose -f docker-compose.dev.yml logs -f

   # Individual service logs
   docker-compose -f docker-compose.dev.yml logs -f backend
   docker-compose -f docker-compose.dev.yml logs -f frontend
   ```
