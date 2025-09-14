# Hybrid AI CLI/GUI Tool - Professor-Student-Mentor Model

A sophisticated AI tool that implements a complete educational workflow:
- **Professor (Gemini/Qwen)**: Creates plans, provides expert instructions, and evaluates code quality
- **Student (Ollama)**: Implements solutions and applies improvements
- **Mentor (Gemini/Qwen)**: Tests code, identifies issues, and provides detailed feedback

This approach mimics a complete university learning cycle where students receive expert guidance, implement solutions, get evaluated, and then improve based on feedback.

Users can choose between:
- **CLI Mode**: Command-line interface for power users
- **GUI Mode**: Graphical interface for users who prefer visual tools

## Features

- **Complete Educational Workflow**: Plan → Implement → Test → Evaluate → Improve
- **Multi-AI Collaboration**: Three distinct AI roles working together
- **Automated Code Validation**: Built-in testing and validation
- **Privacy First**: Sensitive data stays local during implementation
- **Resource Efficient**: Works on limited hardware
- **Multi-Model Support**: Gemini, Qwen, and Ollama integration
- **Task Orchestration**: Complex tasks broken down into manageable steps
- **Dual Interface**: Both CLI and GUI options available

## The Professor-Student-Mentor Workflow

When you use the hybrid mode for complex tasks, the tool follows this complete cycle:

1. **🎓 Professor Phase**: 
   - Creates a comprehensive plan and detailed instructions
   - Provides expert-level guidance and best practices

2. **👨‍🎓 Student Phase**: 
   - Implements the solution based on the professor's instructions
   - Works locally to maintain privacy and efficiency

3. **🧪 Automated Testing**: 
   - Runs basic syntax and validation checks
   - Identifies immediate issues

4. **📊 Mentor Evaluation**: 
   - Conducts thorough code quality assessment
   - Identifies issues, bugs, and improvement areas

5. **🔍 Professor Feedback**: 
   - Analyzes evaluation results
   - Provides targeted improvement instructions

6. **🛠 Student Implementation**: 
   - Implements all suggested improvements
   - Produces final, high-quality code

7. **🏁 Final Validation**: 
   - Verifies improvements were successfully implemented

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

# Complex task (complete professor-student-mentor workflow)
hybrid-ai --complexity high "Create a complete React authentication system"

# Force direct professor consultation
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

## Roles in the System

### 🎓 Professor (Remote AI - Gemini/Qwen)
- **Role**: Expert instructor and planner
- **Responsibilities**:
  - Create comprehensive implementation plans
  - Provide detailed, step-by-step instructions
  - Share best practices and expert insights
  - Analyze code evaluations and provide improvement instructions
  - Guide the student through complex problem-solving

### 👨‍🎓 Student (Local AI - Ollama)
- **Role**: Implementation specialist
- **Responsibilities**:
  - Implement solutions based on professor's instructions
  - Apply improvements suggested by the professor
  - Work locally to maintain privacy and efficiency
  - Show work clearly with explanations

### 📊 Mentor (Remote AI - Gemini/Qwen)
- **Role**: Quality assurance and evaluator
- **Responsibilities**:
  - Conduct thorough code quality assessments
  - Identify bugs, issues, and improvement areas
  - Provide detailed, constructive feedback
  - Evaluate adherence to best practices

### 🧪 Automated Testing
- **Role**: Immediate quality checker
- **Responsibilities**:
  - Run basic syntax validation
  - Perform automated testing
  - Identify immediate issues
  - Provide quick feedback

## Models Used

- **Student**: Ollama with SmolLM2, CodeGemma, TinyLlama
- **Professor/Mentor**: Gemini (Google), Qwen (Alibaba Cloud)

## Configuration

The `.env` file contains all configuration options:

```env
# Professor/Mentor API Keys
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

## Example Workflow

When you ask the tool to "Create a React login form with validation":

1. **Professor** creates a detailed plan covering component structure, validation logic, and best practices
2. **Student** implements the React component based on the plan
3. **Automated Testing** checks for syntax errors
4. **Mentor** evaluates the code quality, identifying potential improvements
5. **Professor** provides specific feedback on how to improve the implementation
6. **Student** implements the suggested improvements
7. **Final Validation** confirms all improvements were successfully applied

The result includes all phases of the workflow, giving you both expert guidance and a high-quality implementation.

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