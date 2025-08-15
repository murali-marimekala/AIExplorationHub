#!/usr/bin/env python3
"""
AI Learning Hub - Environment Validation Script
Tests that all components are working correctly
"""

import sys
import os
import subprocess
import importlib
from pathlib import Path

def check_python_version():
    """Check if Python version is adequate"""
    version = sys.version_info
    if version.major == 3 and version.minor >= 8:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} (need 3.8+)")
        return False

def check_virtual_env():
    """Check if virtual environment exists and is activated"""
    venv_path = Path("ai_env")
    if venv_path.exists():
        print("✅ Virtual environment found")
        
        # Check if it's activated
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            print("✅ Virtual environment is activated")
            return True
        else:
            print("⚠️  Virtual environment exists but not activated")
            return False
    else:
        print("❌ Virtual environment not found")
        return False

def check_packages():
    """Check if required packages are installed"""
    required_packages = [
        'numpy', 'pandas', 'matplotlib', 'plotly', 
        'ipywidgets', 'jupyter', 'jupyterlab'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package}")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_jupyter():
    """Check if Jupyter Lab can be started"""
    try:
        result = subprocess.run(['jupyter', '--version'], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print("✅ Jupyter is available")
            return True
        else:
            print("❌ Jupyter not working properly")
            return False
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("❌ Jupyter not found")
        return False

def check_files():
    """Check if required files exist"""
    required_files = [
        'index.html',
        'requirements.txt',
        'notebooks/01_AI_Fundamentals.ipynb',
        'assets/css/style.css',
        'assets/js/app.js'
    ]
    
    missing_files = []
    
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path}")
            missing_files.append(file_path)
    
    return len(missing_files) == 0, missing_files

def main():
    print("🧠 AI Learning Hub - Environment Validation")
    print("=" * 50)
    
    all_good = True
    
    # Check Python version
    print("\n📍 Python Version:")
    if not check_python_version():
        all_good = False
    
    # Check virtual environment
    print("\n📍 Virtual Environment:")
    if not check_virtual_env():
        all_good = False
    
    # Check packages
    print("\n📍 Required Packages:")
    packages_ok, missing_packages = check_packages()
    if not packages_ok:
        all_good = False
    
    # Check Jupyter
    print("\n📍 Jupyter Lab:")
    if not check_jupyter():
        all_good = False
    
    # Check files
    print("\n📍 Required Files:")
    files_ok, missing_files = check_files()
    if not files_ok:
        all_good = False
    
    # Summary
    print("\n" + "=" * 50)
    if all_good:
        print("🎉 All checks passed! Your environment is ready.")
        print("\n🚀 Next steps:")
        print("1. Start web server: python -m http.server 8000")
        print("2. Start Jupyter Lab: jupyter lab --no-browser --port=8888")
        print("3. Open http://localhost:8000 in your browser")
        print("4. Begin with the AI Fundamentals notebook!")
    else:
        print("❌ Some issues found. Please fix them before proceeding:")
        
        if missing_packages:
            print(f"\n📦 Install missing packages:")
            print(f"pip install {' '.join(missing_packages)}")
        
        if missing_files:
            print(f"\n📁 Missing files - please re-download the repository:")
            for file in missing_files:
                print(f"  - {file}")
        
        print(f"\n🔧 Try running the setup script:")
        print("./quick_start.sh  # macOS/Linux")
        print("quick_start.bat   # Windows")

if __name__ == "__main__":
    main()
