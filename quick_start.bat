@echo off
REM AI Learning Hub - Windows Batch Setup Script

echo 🧠 Welcome to AI Learning Hub!
echo ============================================
echo Setting up your AI learning environment...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

echo ✅ Python found

REM Run the Python setup script
python setup.py

pause
