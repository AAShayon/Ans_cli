# Hybrid AI CLI/GUI Tool - Professional Senior Developer Workflow

A sophisticated AI tool that implements a complete professional software development workflow:
- **Senior Developers (Gemini/Qwen)**: Create architecture, specifications, and conduct code reviews
- **Implementation Team (Ollama Models)**: Implement solutions using specialized models for each task type
- **Testing Framework (Sprite MCP)**: Automatically test code quality and functionality
- **Continuous Improvement**: Iterative refinement based on professional feedback
- **Motivational Guidance**: Inspirational messages about technology freedom throughout the process
- **Interactive API Setup**: Guided setup for remote AI services

This approach mimics a complete professional software development process with specialized roles, automated testing, inspirational guidance, and easy API configuration.

Users can choose between:
- **CLI Mode**: Command-line interface for power users
- **GUI Mode**: Graphical interface for users who prefer visual tools

## Features

- **Professional Development Workflow**: Architecture → Implementation → Testing → Review → Improvement
- **Role-Based AI Processing**: Specialized AI for each development role
- **Dynamic Model Selection**: Chooses optimal local models based on task type
- **Automated Testing**: Integration with Sprite MCP testing framework
- **Privacy First**: Sensitive data stays local during implementation
- **Resource Efficient**: Works on limited hardware
- **Multi-Model Support**: Gemini, Qwen, and Ollama integration
- **Motivational Guidance**: Inspirational messages about technology freedom
- **Interactive API Setup**: Guided configuration for remote services
- **Task Orchestration**: Complex tasks broken down into manageable steps
- **Dual Interface**: Both CLI and GUI options available

## The Professional Senior Developer Workflow

When you use the hybrid mode for complex tasks, the tool follows this complete professional cycle:

1. **🏢 Senior Developer Phase**: 
   - Creates comprehensive architecture and specifications
   - Provides technology stack recommendations
   - Defines best practices and design patterns

2. **⌨️ Implementation Phase**: 
   - Professional developers (local AI) implement solutions
   - Uses specialized models based on task type
   - Maintains privacy and efficiency locally

3. **🧪 Automated Testing**: 
   - Runs comprehensive tests using Sprite MCP framework
   - Validates code quality and functionality
   - Identifies immediate issues

4. **🧐 Code Review Phase**: 
   - Senior developers conduct thorough code reviews
   - Identify issues, bugs, and improvement areas
   - Provide detailed, professional feedback

5. **🔧 Improvement Implementation**: 
   - Developers implement all suggested improvements
   - Produces final, production-ready code

6. **🏁 Final Validation**: 
   - Verifies improvements were successfully implemented
   - Ensures code meets professional standards

## Motivational Guidance

Throughout the development process, you'll receive inspirational messages about technology freedom and open source principles:

- **During Initial Analysis**: Thoughts on technology accessibility
- **Architecture Phase**: Ideas about innovation without boundaries
- **Implementation Phase**: Messages about knowledge sharing
- **Testing Phase**: Quotes about true technology empowerment
- **Review Phase**: Principles of open source collaboration
- **Improvement Phase**: Thoughts on human progress through technology
- **Completion**: Inspirational messages about the future of tech

These messages remind us that technology should be free, accessible, and empowering for all developers.

## Interactive API Key Setup

Setting up API keys for remote AI services is now easier than ever with our interactive setup:

```bash
hybrid-ai --setup
```

This command will guide you through:

1. **Gemini API Setup**:
   - Option to open https://aistudio.google.com/ in your browser
   - Step-by-step instructions for creating an API key
   - Secure terminal-based key entry

2. **Qwen API Setup**:
   - Option to open https://help.aliyun.com/product/148140.html in your browser
   - Guidance for creating an Alibaba Cloud account
   - Secure terminal-based key entry

3. **Configuration Management**:
   - Automatic .env file creation and management
   - Secure storage of API keys
   - Option to update existing keys

The setup process will automatically open the appropriate websites in your browser and guide you through the key creation process. You can also choose to enter keys manually if you prefer.

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- Git (for cloning the repository)
- Ollama (for local AI processing)
- Sprite MCP (for automated testing - optional but recommended)

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
   - Install Sprite MCP (for testing - optional)
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

4. Install Sprite MCP for testing (optional):
   ```bash
   # Check Sprite MCP documentation for installation instructions
   # https://github.com/sprite-mcp/sprite
   ```

5. Configure API keys using interactive setup:
   ```bash
   hybrid-ai --setup
   ```

   Or manually configure the tool:
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
# Basic usage (developer works independently)
hybrid-ai "What is a variable in JavaScript?"

# Complex task (complete professional development workflow)
hybrid-ai --complexity high "Create a complete React authentication system"

# Force senior developer consultation
hybrid-ai --remote "Design a microservices architecture for e-commerce"

# Force local implementation only
hybrid-ai --local "Generate a for loop in Python"

# Interactive API key setup
hybrid-ai --setup
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

## Roles in the System

### 🏢 Senior Developer (Remote AI - Gemini/Qwen)
- **Role**: Architect and reviewer
- **Responsibilities**:
  - Create comprehensive architecture and specifications
  - Provide technology stack recommendations
  - Conduct thorough code reviews
  - Share best practices and expert insights
  - Guide the development process

### ⌨️ Implementation Team (Local AI - Ollama)
- **Role**: Professional developers
- **Responsibilities**:
  - Implement solutions based on senior developer specifications
  - Use specialized models for different task types
  - Work locally to maintain privacy and efficiency
  - Apply improvements suggested by senior developers

### 🧪 Testing Framework (Sprite MCP)
- **Role**: Quality assurance
- **Responsibilities**:
  - Run comprehensive automated tests
  - Validate code quality and functionality
  - Identify bugs and performance issues
  - Provide detailed test reports

### 🌟 Motivational Guidance System
- **Role**: Inspiration and philosophical guidance
- **Responsibilities**:
  - Display inspirational messages about technology freedom
  - Provide context-appropriate motivational thoughts
  - Remind users of the importance of open technology
  - Encourage innovation without boundaries

### 🔐 API Key Management System
- **Role**: Secure configuration management
- **Responsibilities**:
  - Interactive setup for remote AI services
  - Browser automation for key creation
  - Secure terminal-based key entry
  - Configuration file management

### 🧠 Model Selection System
- **Role**: Optimization specialist
- **Responsibilities**:
  - Choose optimal local models based on task type
  - Select implementation models for coding tasks
  - Choose improvement models for code refinement
  - Balance performance and accuracy

## Models Used

### Senior Developers (Remote):
- Gemini (Google)
- Qwen (Alibaba Cloud)

### Implementation Team (Local):
- CodeLlama (7B) - For Flutter/Dart and complex coding tasks
- SmolLM2 (1.7B) - For JavaScript, PHP, and general tasks
- CodeGemma (2B) - For Python and code analysis tasks
- TinyLlama (1.1B) - For simple tasks and quick responses

## Configuration

The `.env` file contains all configuration options:

```env
# Senior Developer API Keys
GEMINI_API_KEY=your_gemini_api_key_here
QWEN_API_KEY=your_qwen_api_key_here

# Implementation Team Settings
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_IMPLEMENTATION_MODEL=smollm2:1.7b
DEFAULT_SENIOR_MODEL=gemini-pro

# Complexity Threshold (characters)
COMPLEXITY_THRESHOLD=100
```

## Example Workflow

When you ask the tool to "Create a React login form with validation":

1. **Senior Developer** creates architecture with component structure, validation logic, and best practices
2. **Implementation Team** builds the React component using specialized JavaScript models
3. **Sprite MCP** runs automated tests to validate functionality
4. **Senior Developer** reviews the code quality and provides professional feedback
5. **Implementation Team** implements all suggested improvements
6. **Final Validation** confirms all improvements were successfully applied

Throughout this process, you'll receive inspirational messages like:
- "Technology should be free and accessible to all, not locked behind paywalls"
- "The best innovations happen when minds are free to explore without boundaries"
- "Knowledge shared is knowledge multiplied"

The result includes all phases of the professional development workflow, giving you both expert architecture and production-ready implementation.

## Task Type Detection

The tool automatically detects task types and selects appropriate models:

- **Flutter/Dart**: Uses CodeLlama for UI components
- **JavaScript/React**: Uses SmolLM2 for frontend development
- **Python**: Uses CodeLlama for backend development
- **Java**: Uses CodeLlama for enterprise applications
- **PHP/Laravel**: Uses SmolLM2 for web development
- **General**: Uses balanced models for mixed tasks

## Troubleshooting

### Common Issues

1. **"Cannot connect to Ollama"**:
   - Make sure Ollama is installed and running
   - Start Ollama with: `ollama serve`

2. **"API key not configured"**:
   - Run `hybrid-ai --setup` for interactive configuration
   - Or manually add your API keys to the `.env` file

3. **"Command not found: hybrid-ai"**:
   - Make sure you ran `npm link` during installation

4. **"Sprite MCP not available"**:
   - Install Sprite MCP framework for comprehensive testing
   - Tool will work without it but with limited testing capabilities

### Getting Help

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact the maintainer

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT