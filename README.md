# Hybrid AI CLI/GUI Tool - Professional Senior Developer Workflow

A sophisticated AI tool that implements a complete professional software development workflow:
- **Senior Developers (Gemini/Qwen)**: Create architecture, specifications, and conduct code reviews
- **Implementation Team (Multiple AI Options)**: Implement solutions using specialized models for each task type
- **Testing Framework (Sprite MCP/TestSprite MCP)**: Automatically test code quality and functionality
- **Continuous Improvement**: Iterative refinement based on professional feedback
- **Motivational Guidance**: Inspirational messages about technology freedom throughout the process
- **Interactive API Setup**: Guided setup for remote AI services
- **Image Processing**: Analyze UI designs and documentation images

This approach mimics a complete professional software development process with specialized roles, automated testing, inspirational guidance, and easy API configuration.

Built with students and developers in mind - **completely free to use** with OpenRouter's free tier models!
- No credit card required
- No time limits
- Access to powerful AI models including Llama, Mistral, and more
- Generous rate limits for personal use

Users can choose between:
- **CLI Mode**: Command-line interface for power users
- **GUI Mode**: Graphical interface for users who prefer visual tools

## Features

- **Professional Development Workflow**: Architecture → Implementation → Testing → Review → Improvement
- **Role-Based AI Processing**: Specialized AI for each development role
- **Dynamic Model Selection**: Chooses optimal models based on task type and hardware
- **Automated Testing**: Integration with Sprite MCP testing framework
- **Privacy First**: Sensitive data stays local during implementation
- **Resource Efficient**: Works on limited hardware with multiple processing options
- **Multi-Model Support**: Gemini, Qwen, Ollama, and OpenRouter integration
- **Motivational Guidance**: Inspirational messages about technology freedom
- **Interactive API Setup**: Guided configuration for remote services
- **Task Orchestration**: Complex tasks broken down into manageable steps
- **Dual Interface**: Both CLI and GUI options available
- **Image Processing**: Analyze UI designs and documentation with vision models
- **Cross-Platform**: Works on Windows, Mac, and Linux

## The Professional Senior Developer Workflow

When you use the hybrid mode for complex tasks, the tool follows this complete professional cycle:

1. **🏢 Senior Developer Phase**: 
   - Creates comprehensive architecture and specifications
   - Provides technology stack recommendations
   - Defines best practices and design patterns

2. **⌨️ Implementation Phase**: 
   - Professional developers (local/cloud AI) implement solutions
   - Uses specialized models based on task type
   - Maintains privacy and efficiency locally or leverages cloud when needed

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

This command will guide you through hardware-specific setup:

1. **Hardware Detection**:
   - Identifies if you have a GPU or not
   - Recommends appropriate AI services based on your hardware

2. **Service Configuration**:
   - Option to use local models (Ollama) for GPU users
   - Option to use OpenRouter cloud API for users without GPU (completely free!)
   - Option to use Senior Developer services (Gemini/Qwen) for complex tasks

3. **Gemini API Setup**:
   - Option to open https://aistudio.google.com/ in your browser
   - Step-by-step instructions for creating an API key
   - Secure terminal-based key entry

4. **Qwen API Setup**:
   - Option to open https://help.aliyun.com/product/148140.html in your browser
   - Guidance for creating an Alibaba Cloud account
   - Secure terminal-based key entry

5. **OpenRouter API Setup**:
   - Option to open https://openrouter.ai/keys in your browser
   - Guidance for creating a **free** API key
   - Secure terminal-based key entry

6. **Configuration Management**:
   - Automatic .env file creation and management
   - Secure storage of API keys
   - Option to update existing keys

The setup process will automatically open the appropriate websites in your browser and guide you through the key creation process. You can also choose to enter keys manually if you prefer.

**Note**: OpenRouter provides completely free access to powerful AI models, making this tool accessible to all students and developers regardless of their budget or hardware setup.

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- Git (for cloning the repository)
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
   - Choose your preferred AI processing (local, cloud, or both)
   - Install Ollama (for local AI processing, if selected)
   - Install Sprite MCP (for testing - optional)
   - Get API keys for selected services
   - Configure the tool

**Note**: For completely free usage, select "Cloud models (OpenRouter API, free service, no GPU required)" when prompted.
No credit card is required to use OpenRouter's free tier models!

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

3. Choose your AI processing option:

   For local AI processing (requires GPU for best performance):
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

   For cloud AI processing (no GPU required):
   - No additional installation needed

4. Install required local models (if using local processing):
   ```bash
   ollama pull smollm2:1.7b
   ollama pull codellama:7b-instruct
   ollama pull codegemma:2b
   ollama pull tinyllama:1.1b
   ```

5. Install Sprite MCP for testing (optional):
   ```bash
   # Check Sprite MCP documentation for installation instructions
   # https://github.com/sprite-mcp/sprite
   ```

6. Configure API keys using interactive setup:
   ```bash
   hybrid-ai --setup
   ```

   Or manually configure the tool:
   ```bash
   cp .env.example .env
   nano .env  # Add your API keys here
   ```

7. Link the CLI tool:
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

# Process an image (UI design, documentation, etc.)
hybrid-ai -i "path/to/design.png" "Convert this UI design to a React component"

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

## AI Service Options

The tool supports multiple AI processing options based on your hardware and preferences:

### Local Processing (with GPU)
Best for privacy and performance:
```bash
# Uses local models via Ollama
hybrid-ai --local "Create a Python script to process CSV data"
```

### Cloud Processing (no GPU required)
Completely free service via OpenRouter API:
```bash
# Uses cloud models when local processing is not available
hybrid-ai "Create a Flutter app for task management"
```

OpenRouter provides access to powerful AI models completely free of charge, making this tool accessible to all students and developers regardless of their hardware setup.

### Senior Developer Guidance
For complex tasks requiring expert input:
```bash
# Uses Gemini or Qwen for architecture and code reviews
hybrid-ai --complexity high "Design a scalable web application with React and Node.js"
```

### Image Processing
Analyze UI designs and documentation:
```bash
# Process UI designs
hybrid-ai -i "design.png" "Convert this UI design to a responsive HTML/CSS template"

# Analyze documentation diagrams
hybrid-ai -i "architecture.png" "Explain this system architecture diagram"

# Extract information from screenshots
hybrid-ai -i "code-screenshot.png" "Convert this code screenshot to actual code"
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

### ⌨️ Implementation Team (Multiple AI Options)
- **Role**: Professional developers
- **Responsibilities**:
  - Implement solutions based on senior developer specifications
  - Use specialized models for different task types
  - Work locally or via cloud services based on configuration
  - Apply improvements suggested by senior developers

### 🧪 Testing Framework (Sprite MCP/TestSprite MCP)
- **Role**: Quality assurance
- **Responsibilities**:
  - Run comprehensive automated tests with Sprite MCP (if available)
  - Fallback to TestSprite MCP for basic testing
  - Validate code quality and functionality
  - Identify bugs and performance issues
  - Provide detailed test reports

TestSprite MCP is a built-in testing framework that provides basic testing capabilities for students and developers who don't have Sprite MCP installed.

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
  - Choose optimal models based on task type and hardware
  - Select implementation models for coding tasks
  - Choose improvement models for code refinement
  - Balance performance and accuracy

## Models Used

### Senior Developers (Remote):
- Gemini (Google)
- Qwen (Alibaba Cloud)

### Implementation Team (Local - Ollama):
- CodeLlama (7B) - For Flutter/Dart and complex coding tasks
- SmolLM2 (1.7B) - For JavaScript, PHP, and general tasks
- CodeGemma (2B) - For Python and code analysis tasks
- TinyLlama (1.1B) - For simple tasks and quick responses

### Implementation Team (Cloud - OpenRouter):
All models available through OpenRouter's free tier:
- Mistral 7B - For general coding tasks
- Gemma 7B - For code analysis tasks
- Llama 2 13B - For complex reasoning tasks
- Phi-3 Mini - For efficient processing
- CodeLlama 70B - For complex coding tasks
- Llama 3 8B - For balanced performance
- OpenChat 7B - For conversational tasks
- Noromaid 20B - For creative tasks
- Vision Models - For image processing tasks

These models are completely free to use with a generous rate limit for students and developers.

## Configuration

The `.env` file contains all configuration options:

```env
# Senior Developer API Keys
GEMINI_API_KEY=your_gemini_api_key_here
QWEN_API_KEY=your_qwen_api_key_here

# Cloud Implementation Team Settings (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Local Implementation Team Settings (Ollama)
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_LOCAL_MODEL=smollm2:1.7b
DEFAULT_REMOTE_MODEL=gemini-pro
DEFAULT_OPENROUTER_MODEL=mistralai/mistral-7b-instruct-v0.2

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
- **Image/UI Design**: Uses vision models for processing images
- **General**: Uses balanced models for mixed tasks

## Image Processing Capabilities

The tool can process images for various purposes:

- **UI Design Analysis**: Convert UI mockups to code implementations
- **Documentation Processing**: Extract information from diagrams and charts
- **Code Screenshot Conversion**: Convert code screenshots to actual code
- **Visual Problem Solving**: Analyze visual problems and provide solutions

Supported image formats:
- JPEG
- PNG
- GIF
- WebP

To use image processing:
```bash
hybrid-ai -i "path/to/image.png" "Describe what you see in this image"
```

The tool automatically selects the best vision model available from your configured services.

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
   - TestSprite MCP will be used as a fallback for basic testing

5. **"No vision models available"**:
   - Ensure you have configured OpenRouter API key for image processing
   - Or install local vision models if available

### Getting Help

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact the maintainer

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT