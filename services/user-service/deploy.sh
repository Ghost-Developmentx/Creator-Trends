#!/bin/bash

# Exit script if any command fails
set -e

# Load environment variables
if [ -f "./.env" ]; then
  echo "Loading environment variables from .env file..."
  export "$(grep -v '^#' ./.env.local | xargs)"
else
  echo ".env file not found!"
  exit 1
fi

# Change to the directory containing the Dockerfile
cd /g/ghost-projects/creator-trends/services/user-service

# Function to log messages
log_message() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Stop any running containers
log_message "Stopping running containers..."
docker-compose down

# Remove unused data
log_message "Removing unused data..."
docker system prune -f

# Build the Docker images
log_message "Building Docker images..."
docker-compose build

# Ensure dependencies are installed
log_message "Installing dependencies..."
docker-compose run --rm user-service npm install

# Start the containers in detached mode
log_message "Starting Docker containers..."
docker-compose up -d

# Check the status of the containers
log_message "Checking container status..."
docker-compose ps

# Log the deployment completion
log_message "Deployment complete!"

# Show logs for all services
log_message "Showing logs..."
docker-compose logs -f
