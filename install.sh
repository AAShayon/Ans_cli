#!/bin/bash

# Hybrid AI CLI/GUI Installation Script

set -e  # Exit on any error

echo "========================================"
echo "  Hybrid AI CLI/GUI Installation Script  "
echo "========================================"
echo
echo "Built for students and developers - completely free to use!"
echo

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

# Detect OS
echo "Detecting operating system..."
OS_TYPE=""
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS_TYPE="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS_TYPE="Mac"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    OS_TYPE="Windows"
else
    OS_TYPE="Unknown"
fi

echo "✓ Detected OS: $OS_TYPE"
echo

# Install npm dependencies
echo "Installing npm dependencies..."
npm install
echo "✓ npm dependencies installed"
echo

# Ask user about AI service preference
echo "========================================"
echo "  AI Service Configuration  "
echo "========================================"
echo
echo "What type of AI processing would you prefer?"
echo "1. Local models (requires Ollama, best for privacy and performance with GPU)"
echo "2. Cloud models (OpenRouter API, free service, no GPU required)"
echo "3. Both local and cloud models"
echo

read -p "Enter your choice (1, 2, or 3): " ai_choice

# Install Ollama if selected
if [[ $ai_choice == "1" || $ai_choice == "3" ]]; then
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
    
    # Pull lightweight models
    echo "Pulling lightweight AI models for local processing..."
    if command -v ollama &> /dev/null; then
        echo "This may take a few minutes depending on your internet connection..."
        ollama pull smollm2:1.7b
        ollama pull codellama:7b-instruct
        ollama pull codegemma:2b
        ollama pull tinyllama:1.1b
        echo "✓ Local models installed"
    else
        echo "Warning: Ollama not found. Please install models manually after installing Ollama."
    fi
    
    echo
fi

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

if [[ $ai_choice == "2" || $ai_choice == "3" ]]; then
    echo "To use cloud AI services, you'll need an OpenRouter API key:"
    echo
    echo "1. OpenRouter (Free Cloud Service):"
    echo "   - Visit: https://openrouter.ai/keys"
    echo "   - Sign up for an account"
    echo "   - Create an API key"
    echo
fi

if [[ $ai_choice == "1" || $ai_choice == "3" ]]; then
    echo "For complex tasks, you can also use senior developer services:"
    echo
    echo "2. Gemini (Google):"
    echo "   - Visit: https://aistudio.google.com/"
    echo "   - Sign in with your Google account"
    echo "   - Create an API key"
    echo
    echo "3. Qwen (Alibaba Cloud):"
    echo "   - Visit: https://help.aliyun.com/product/148140.html"
    echo "   - Sign up for an account"
    echo "   - Get your API key"
    echo
fi

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

if [[ $ai_choice == "1" ]]; then
    echo "To use the tool with local models:"
    echo "1. Add your API keys to .env if you want to use senior developer services:"
    echo "   nano .env"
    echo
    echo "2. For CLI usage:"
    echo "   hybrid-ai \"Your question here\""
    echo
    echo "3. For GUI usage:"
    echo "   hybrid-ai --gui"
    echo
    echo "4. For image processing:"
    echo "   hybrid-ai -i \"path/to/image.png\" \"Describe this image\""
elif [[ $ai_choice == "2" ]]; then
    echo "To use the tool with cloud models:"
    echo "1. Add your OpenRouter API key to .env:"
    echo "   nano .env"
    echo
    echo "2. For CLI usage:"
    echo "   hybrid-ai \"Your question here\""
    echo
    echo "3. For GUI usage:"
    echo "   hybrid-ai --gui"
    echo
    echo "4. For image processing:"
    echo "   hybrid-ai -i \"path/to/image.png\" \"Describe this image\""
else
    echo "To use the tool:"
    echo "1. Add your API keys to .env:"
    echo "   nano .env"
    echo
    echo "2. For CLI usage:"
    echo "   hybrid-ai \"Your question here\""
    echo
    echo "3. For GUI usage:"
    echo "   hybrid-ai --gui"
    echo
    echo "4. For image processing:"
    echo "   hybrid-ai -i \"path/to/image.png\" \"Describe this image\""
fi

echo
echo "You can also run the interactive setup at any time:"
echo "hybrid-ai --setup"
echo
echo "Enjoy using Hybrid AI CLI/GUI!"