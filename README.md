# Hybrid AI CLI/GUI Tool

A powerful tool that combines local and remote AI models for development assistance. This tool uses remote AI (Gemini, Qwen) to guide local models (Ollama) in executing tasks, providing the best of both worlds: privacy and speed of local processing with the intelligence of remote models.

Users can choose between:
- **CLI Mode**: Command-line interface for power users
- **GUI Mode**: Graphical interface for users who prefer visual tools

## Features

- **Hybrid Intelligence**: Remote AI models guide local execution
- **Privacy First**: Sensitive data stays local
- **Resource Efficient**: Works on limited hardware
- **Multi-Model Support**: Gemini, Qwen, and Ollama integration
- **Task Orchestration**: Complex tasks broken down into manageable steps
- **Dual Interface**: Both CLI and GUI options available

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
# Basic usage
hybrid-ai "Generate a Flutter login widget"

# Specify complexity level
hybrid-ai --complexity high "Design a complete Laravel API with authentication"

# Force remote processing
hybrid-ai --remote "Explain quantum computing concepts"

# Force local processing
hybrid-ai --local "What is a for loop in JavaScript?"

# Start GUI mode
hybrid-ai --gui
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

## How It Works

1. **Task Analysis**: The system analyzes your request to determine complexity
2. **Decision Making**: Chooses between local, remote, or hybrid processing
3. **Remote Guidance**: Complex tasks are sent to remote AI for planning
4. **Local Execution**: Execution plan is carried out using local resources
5. **Result Delivery**: Final result is presented to you

## Models Used

- **Local**: Ollama with SmolLM2, CodeGemma, TinyLlama
- **Remote**: Gemini (Google), Qwen (Alibaba Cloud)

## Configuration

The `.env` file contains all configuration options:

```env
# Gemini API Key (required for remote Gemini access)
GEMINI_API_KEY=your_gemini_api_key_here

# Qwen API Key (required for remote Qwen access)
QWEN_API_KEY=your_qwen_api_key_here

# Local AI Settings
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_LOCAL_MODEL=smollm2:1.7b
DEFAULT_REMOTE_MODEL=gemini-pro

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