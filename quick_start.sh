#!/bin/bash

# AI Learning Hub - Quick Start Setup Script
# This script automatically sets up the environment and starts the platform

echo "🧠 Welcome to AI Learning Hub!"
echo "============================================"
echo "Setting up your AI learning environment..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

print_status "Python 3 found"

# Check if we're on macOS and can use Homebrew for Jupyter
if [[ "$OSTYPE" == "darwin"* ]]; then
    print_info "macOS detected - checking for Homebrew..."
    if command -v brew &> /dev/null; then
        print_status "Homebrew found"
        
        # Check if Jupyter is already installed via Homebrew
        if ! command -v jupyter &> /dev/null; then
            print_info "Installing Jupyter via Homebrew..."
            brew install jupyter
            print_status "Jupyter installed via Homebrew"
        else
            print_status "Jupyter already available"
        fi
    else
        print_warning "Homebrew not found. Will use virtual environment for Jupyter."
    fi
fi

# Create virtual environment if it doesn't exist
if [ ! -d "ai_env" ]; then
    print_info "Creating Python virtual environment..."
    python3 -m venv ai_env
    print_status "Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
print_info "Activating virtual environment..."
source ai_env/bin/activate

# Upgrade pip
print_info "Upgrading pip..."
pip install --upgrade pip

# Install required packages
print_info "Installing required Python packages..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    print_status "All packages installed successfully"
else
    print_error "Package installation failed. Please check the error messages above."
    exit 1
fi

# Function to open URL in browser
open_browser() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$1"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$1"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start "$1"
    fi
}

# Start the platform
echo ""
echo "🚀 Starting AI Learning Hub..."
echo "============================================"

# Start web server in background
print_info "Starting web dashboard on http://localhost:8000"
python -m http.server 8000 &
WEB_PID=$!

# Wait a moment for server to start
sleep 2

# Start Jupyter Lab in background
print_info "Starting Jupyter Lab on http://localhost:8888"
jupyter lab --no-browser --port=8888 &
JUPYTER_PID=$!

# Wait a moment for Jupyter to start
sleep 3

# Open browsers
print_info "Opening browsers..."
open_browser "http://localhost:8000"
sleep 2
open_browser "http://localhost:8888"

echo ""
print_status "Setup complete! Your AI Learning Hub is now running."
echo ""
echo "📊 Web Dashboard: http://localhost:8000"
echo "📓 Jupyter Lab:   http://localhost:8888"
echo ""
echo "🎯 What's Next:"
echo "   1. Explore the dashboard to set learning goals"
echo "   2. Open the '01_AI_Fundamentals.ipynb' notebook in Jupyter Lab"
echo "   3. Start learning and track your progress!"
echo ""
echo "💡 To stop the platform:"
echo "   - Press Ctrl+C in this terminal"
echo "   - Or run: kill $WEB_PID $JUPYTER_PID"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    print_info "Shutting down AI Learning Hub..."
    kill $WEB_PID 2>/dev/null
    kill $JUPYTER_PID 2>/dev/null
    print_status "Goodbye! Happy learning! 🎓"
    exit 0
}

# Set trap to cleanup on Ctrl+C
trap cleanup SIGINT

# Keep script running
print_info "Platform is running. Press Ctrl+C to stop."
wait
