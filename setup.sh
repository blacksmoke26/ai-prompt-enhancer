#!/bin/bash

# Synapse - Development Setup Script

echo "🚀 Setting up Synapse..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Go back to root
cd ..

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.example backend/.env
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Configure your AI providers in backend/.env"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "📚 For more information, check the README.md file"
