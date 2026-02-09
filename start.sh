#!/bin/bash

# Startup script for local development with Docker

set -e

echo "=========================================="
echo "  Ghamza Shop - Docker Setup"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if database needs seeding
echo "Checking if database needs initial setup..."

# Function to seed database
seed_database() {
    echo "📦 Seeding database with initial data..."
    echo "Waiting for database to be ready..."
    sleep 5

    # Run seed script in backend container
    docker-compose exec -T backend python seed_data.py

    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully!"
    else
        echo "⚠️  Database seeding failed or already seeded"
    fi
}

# Parse arguments
MODE="dev"
if [ "$1" == "prod" ]; then
    MODE="prod"
    echo "🚀 Starting in PRODUCTION mode"
elif [ "$1" == "dev" ]; then
    MODE="dev"
    echo "🔧 Starting in DEVELOPMENT mode (with hot reload)"
else
    echo "🔧 Starting in DEVELOPMENT mode (with hot reload)"
    echo "   Use './start.sh prod' for production mode"
fi

echo ""

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down > /dev/null 2>&1 || true
docker-compose -f docker-compose.dev.yml down > /dev/null 2>&1 || true

echo ""

# Start services
if [ "$MODE" == "dev" ]; then
    echo "Starting services (development mode)..."
    docker-compose -f docker-compose.dev.yml up -d

    # Wait for services to be ready
    echo "Waiting for services to start..."
    sleep 10

    # Check if we need to seed
    NEEDS_SEED=$(docker-compose -f docker-compose.dev.yml exec -T postgres psql -U ghamza_user -d ghamza_shop -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_name='products'" 2>/dev/null || echo "0")

    if [ "$NEEDS_SEED" == "0" ]; then
        seed_database
    else
        echo "✅ Database already contains data"
    fi
else
    echo "Starting services (production mode)..."
    docker-compose up -d

    # Wait for services to be ready
    echo "Waiting for services to start..."
    sleep 10

    # Check if we need to seed
    NEEDS_SEED=$(docker-compose exec -T postgres psql -U ghamza_user -d ghamza_shop -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_name='products'" 2>/dev/null || echo "0")

    if [ "$NEEDS_SEED" == "0" ]; then
        seed_database
    else
        echo "✅ Database already contains data"
    fi
fi

echo ""
echo "=========================================="
echo "  🎉 All services are running!"
echo "=========================================="
echo ""
echo "📍 Access your application:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo "   pgAdmin:   http://localhost:5050"
echo "              (admin@ghamza.com / admin)"
echo ""
echo "📊 View logs:"
if [ "$MODE" == "dev" ]; then
    echo "   docker-compose -f docker-compose.dev.yml logs -f"
else
    echo "   docker-compose logs -f"
fi
echo ""
echo "🛑 Stop all services:"
if [ "$MODE" == "dev" ]; then
    echo "   docker-compose -f docker-compose.dev.yml down"
else
    echo "   docker-compose down"
fi
echo ""
echo "Mode: $MODE"
echo "=========================================="
