#!/bin/bash

# Hybrid AI CLI/GUI Installation Script

set -e  # Exit on any error

echo "========================================"
echo "  Hybrid AI CLI/GUI Installation Script  "
echo "========================================"
echo

# Check if running on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo "Warning: This script is designed for Linux. You may need to adjust commands for your OS."
fi

# Check for required tools
echo "Checking for required tools..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js (v14 or higher) and try again."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed."
    echo "Please install npm and try again."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed."
    echo "Please install Git and try again."
    exit 1
fi

echo "✓ All required tools found"
echo

# Install npm dependencies
echo "Installing npm dependencies..."
npm install
echo "✓ npm dependencies installed"
echo

# Install Ollama
echo "Installing Ollama for local AI processing..."
echo "This may require sudo privileges."

# Try to install without sudo first
if curl -fsSL https://ollama.com/install.sh | sh; then
    echo "✓ Ollama installed successfully"
else
    echo "Ollama installation requires sudo privileges."
    echo "Please run the following command manually:"
    echo "curl -fsSL https://ollama.com/install.sh | sudo sh"
    echo
    echo "Press Enter when you've completed this step..."
    read
fi

echo

# Start Ollama service
echo "Starting Ollama service..."
if command -v ollama &> /dev/null; then
    ollama serve > /dev/null 2>&1 &
    echo "✓ Ollama service started"
else
    echo "Warning: Ollama command not found. Please start Ollama manually if needed."
fi

echo

# Pull a lightweight model
echo "Pulling a lightweight AI model for local processing..."
if command -v ollama &> /dev/null; then
    echo "This may take a few minutes depending on your internet connection..."
    ollama pull smollm2:1.7b
    echo "✓ Lightweight model installed"
else
    echo "Warning: Ollama not found. Please install models manually after installing Ollama."
fi

echo

# Setup configuration
echo "Setting up configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Configuration file created"
else
    echo "Configuration file already exists"
fi

echo

# Get API keys
echo "========================================"
echo "  API Key Setup  "
echo "========================================"
echo
echo "To use remote AI services, you'll need API keys:"
echo
echo "1. Gemini (Google):"
echo "   - Visit: https://aistudio.google.com/"
echo "   - Sign in with your Google account"
echo "   - Create an API key"
echo
echo "2. Qwen (Alibaba Cloud):"
echo "   - Visit: https://help.aliyun.com/product/148140.html"
echo "   - Sign up for an account"
echo "   - Get your API key"
echo
echo "After obtaining your API keys, add them to the .env file:"
echo "nano .env"
echo

# Link the CLI tool
echo "Linking CLI tool..."
npm link
echo "✓ CLI tool linked"
echo

# Final instructions
echo "========================================"
echo "  Installation Complete!  "
echo "========================================"
echo
echo "To use the tool:"
echo "1. Add your API keys to .env if you want to use remote services:"
echo "   nano .env"
echo
echo "2. For CLI usage:"
echo "   hybrid-ai \"Your question here\""
echo
echo "3. For GUI usage:"
echo "   hybrid-ai --gui"
echo
echo "Enjoy using Hybrid AI CLI/GUI!"