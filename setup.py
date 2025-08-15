"""
AI Learning Hub - Windows Setup Script
Automatically sets up the environment and starts the platform
"""

import os
import sys
import subprocess
import time
import webbrowser
from pathlib import Path

def print_colored(message, color='white'):
    """Print colored messages"""
    colors = {
        'red': '\033[91m',
        'green': '\033[92m',
        'yellow': '\033[93m',
        'blue': '\033[94m',
        'white': '\033[0m'
    }
    print(f"{colors.get(color, colors['white'])}{message}\033[0m")

def print_status(message):
    print_colored(f"✅ {message}", 'green')

def print_warning(message):
    print_colored(f"⚠️  {message}", 'yellow')

def print_error(message):
    print_colored(f"❌ {message}", 'red')

def print_info(message):
    print_colored(f"ℹ️  {message}", 'blue')

def check_python():
    """Check if Python is installed"""
    try:
        result = subprocess.run([sys.executable, '--version'], 
                              capture_output=True, text=True)
        print_status(f"Python found: {result.stdout.strip()}")
        return True
    except:
        print_error("Python not found. Please install Python 3.8+ and try again.")
        return False

def create_venv():
    """Create virtual environment"""
    if not os.path.exists('ai_env'):
        print_info("Creating Python virtual environment...")
        subprocess.run([sys.executable, '-m', 'venv', 'ai_env'])
        print_status("Virtual environment created")
    else:
        print_status("Virtual environment already exists")

def get_venv_python():
    """Get path to virtual environment Python"""
    if os.name == 'nt':  # Windows
        return os.path.join('ai_env', 'Scripts', 'python.exe')
    else:
        return os.path.join('ai_env', 'bin', 'python')

def install_packages():
    """Install required packages"""
    venv_python = get_venv_python()
    
    print_info("Upgrading pip...")
    subprocess.run([venv_python, '-m', 'pip', 'install', '--upgrade', 'pip'])
    
    print_info("Installing required packages...")
    result = subprocess.run([venv_python, '-m', 'pip', 'install', '-r', 'requirements.txt'])
    
    if result.returncode == 0:
        print_status("All packages installed successfully")
        return True
    else:
        print_error("Package installation failed")
        return False

def start_servers():
    """Start web server and Jupyter Lab"""
    venv_python = get_venv_python()
    
    print_info("Starting web dashboard on http://localhost:8000")
    web_process = subprocess.Popen([venv_python, '-m', 'http.server', '8000'])
    
    time.sleep(2)
    
    print_info("Starting Jupyter Lab on http://localhost:8888")
    jupyter_process = subprocess.Popen([venv_python, '-m', 'jupyter', 'lab', 
                                      '--no-browser', '--port=8888'])
    
    time.sleep(3)
    
    return web_process, jupyter_process

def open_browsers():
    """Open web browsers"""
    print_info("Opening browsers...")
    webbrowser.open('http://localhost:8000')
    time.sleep(2)
    webbrowser.open('http://localhost:8888')

def main():
    print_colored("🧠 Welcome to AI Learning Hub!", 'blue')
    print("=" * 44)
    print("Setting up your AI learning environment...")
    print()
    
    # Check Python
    if not check_python():
        sys.exit(1)
    
    # Create virtual environment
    create_venv()
    
    # Install packages
    if not install_packages():
        sys.exit(1)
    
    # Start platform
    print()
    print_colored("🚀 Starting AI Learning Hub...", 'blue')
    print("=" * 44)
    
    try:
        web_process, jupyter_process = start_servers()
        open_browsers()
        
        print()
        print_status("Setup complete! Your AI Learning Hub is now running.")
        print()
        print("📊 Web Dashboard: http://localhost:8000")
        print("📓 Jupyter Lab:   http://localhost:8888")
        print()
        print("🎯 What's Next:")
        print("   1. Explore the dashboard to set learning goals")
        print("   2. Open the '01_AI_Fundamentals.ipynb' notebook in Jupyter Lab")
        print("   3. Start learning and track your progress!")
        print()
        print_info("Platform is running. Press Ctrl+C to stop.")
        
        # Keep running until interrupted
        try:
            web_process.wait()
        except KeyboardInterrupt:
            print()
            print_info("Shutting down AI Learning Hub...")
            web_process.terminate()
            jupyter_process.terminate()
            print_status("Goodbye! Happy learning! 🎓")
            
    except Exception as e:
        print_error(f"Error starting platform: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
