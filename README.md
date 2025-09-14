# Hybrid AI CLI/GUI Tool

A powerful tool that combines local and remote AI models following a "professor-student" approach:
- **Remote AI (Gemini/Qwen)** = Professor (provides expert guidance and precise instructions)
- **Local AI (Ollama)** = Student (executes the professor's instructions locally)

This approach gives you the best of both worlds: expert-level guidance from remote AI with the privacy and speed of local execution.

Users can choose between:
- **CLI Mode**: Command-line interface for power users
- **GUI Mode**: Graphical interface for users who prefer visual tools

## Features

- **Professor-Student Model**: Remote AI provides expert instructions, local AI executes them
- **Privacy First**: Sensitive data stays local during execution
- **Resource Efficient**: Works on limited hardware
- **Multi-Model Support**: Gemini, Qwen, and Ollama integration
- **Task Orchestration**: Complex tasks broken down into manageable steps
- **Dual Interface**: Both CLI and GUI options available

## How It Works

1. **Simple Tasks**: Student (local AI) handles them independently
2. **Complex Tasks**: 
   - Professor (remote AI) provides detailed, expert instructions
   - Student (local AI) executes those precise instructions
3. **Result Delivery**: You get both the expert guidance and the executed work

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- Git (for cloning the repository)

## Installation

### Method 1: Automated Installation (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/AAShayon/Ans_cli.git
   cd Ans_cli
   ```

2. Run the installation script:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

3. Follow the prompts to:
   - Install Ollama (for local AI processing)
   - Get API keys for remote services (Gemini, Qwen)
   - Configure the tool

### Method 2: Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AAShayon/Ans_cli.git
   cd Ans_cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Ollama for local AI processing:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

4. Get API keys:
   - **Gemini (Google)**: 
     1. Go to https://aistudio.google.com/
     2. Sign in with your Google account
     3. Create an API key
   - **Qwen (Alibaba Cloud)**:
     1. Go to https://help.aliyun.com/product/148140.html
     2. Sign up for an account
     3. Get your API key

5. Configure the tool:
   ```bash
   cp .env.example .env
   nano .env  # Add your API keys here
   ```

6. Link the CLI tool:
   ```bash
   npm link
   ```

## Usage

### CLI Mode

```bash
# Basic usage (student works independently)
hybrid-ai "What is a variable in JavaScript?"

# Complex task (professor provides guidance, student executes)
hybrid-ai --complexity high "Create a complete React authentication system"

# Force professor-direct consultation
hybrid-ai --remote "Explain quantum computing in simple terms"

# Force student-only work
hybrid-ai --local "Generate a for loop in Python"
```

### GUI Mode

Run the GUI version:
```bash
hybrid-ai --gui
```

Or directly run the GUI script:
```bash
node src/gui.js
```

## The Professor-Student Approach

When you use the hybrid mode for complex tasks:

1. **Professor Phase**: Remote AI (Gemini/Qwen) acts as an expert professor, providing:
   - Detailed step-by-step instructions
   - Best practices and expert insights
   - Specific guidance tailored to your task

2. **Student Phase**: Local AI (Ollama) acts as a diligent student, responsible for:
   - Executing the professor's instructions precisely
   - Implementing the plan step by step
   - Showing the work clearly

3. **Result**: You get both the expert guidance and the executed implementation

## Models Used

- **Local (Student)**: Ollama with SmolLM2, CodeGemma, TinyLlama
- **Remote (Professor)**: Gemini (Google), Qwen (Alibaba Cloud)

## Configuration

The `.env` file contains all configuration options:

```env
# Professor API Keys
GEMINI_API_KEY=your_gemini_api_key_here
QWEN_API_KEY=your_qwen_api_key_here

# Student Settings
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_STUDENT_MODEL=smollm2:1.7b
DEFAULT_PROFESSOR_MODEL=gemini-pro

# Complexity Threshold (characters)
COMPLEXITY_THRESHOLD=100
```

## Troubleshooting

### Common Issues

1. **"Cannot connect to Ollama"**:
   - Make sure Ollama is installed and running
   - Start Ollama with: `ollama serve`

2. **"API key not configured"**:
   - Make sure you've added your API keys to the `.env` file

3. **"Command not found: hybrid-ai"**:
   - Make sure you ran `npm link` during installation

### Getting Help

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact the maintainer

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT