#!/bin/bash

# Stop all Docker services

echo "Stopping all services..."

docker-compose down
docker-compose -f docker-compose.dev.yml down

echo "✅ All services stopped"
