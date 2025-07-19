#!/bin/bash
set -e

echo "Starting build process..."

# Install system dependencies if needed
# apt-get update && apt-get install -y build-essential

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "Build completed successfully!" 