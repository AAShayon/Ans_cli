const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const open = require('open');
const chalk = require('chalk');

/**
 * Interactive API key setup for remote AI services
 */
class APIKeySetup {
  constructor() {
    this.configPath = path.join(process.cwd(), '.env');
  }

  /**
   * Start the interactive API key setup process
   */
  async startSetup() {
    console.log(chalk.blue.bold('\n🔐 Remote AI Services API Key Setup\n'));
    console.log(chalk.gray('This setup will help you configure API keys for remote AI services.'));
    console.log(chalk.gray('You can skip any service and configure it later.\n'));
    
    // Check if .env file exists
    const envExists = fs.existsSync(this.configPath);
    if (!envExists) {
      this.createEnvFile();
    }
    
    // Load existing config
    const config = this.loadConfig();
    
    // Setup Gemini API key
    await this.setupGeminiKey(config);
    
    // Setup Qwen API key
    await this.setupQwenKey(config);
    
    // Save configuration
    this.saveConfig(config);
    
    console.log(chalk.green.bold('\n✅ API key setup completed!\n'));
    console.log(chalk.gray('Configuration saved to .env file'));
  }

  /**
   * Setup Gemini API key
   */
  async setupGeminiKey(config) {
    console.log(chalk.cyan('\n🔮 Google Gemini API Setup'));
    console.log(chalk.gray('=========================='));
    
    if (config.GEMINI_API_KEY && config.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      console.log(chalk.green(`✓ Already configured: ${config.GEMINI_API_KEY.substring(0, 8)}...`));
      const { change } = await prompts({
        type: 'confirm',
        name: 'change',
        message: 'Do you want to change the existing Gemini API key?',
        initial: false
      });
      
      if (!change) return;
    }
    
    console.log(chalk.gray('\nTo get a Gemini API key:'));
    console.log(chalk.gray('1. Visit: https://aistudio.google.com/'));
    console.log(chalk.gray('2. Sign in with your Google account'));
    console.log(chalk.gray('3. Create a new API key in the API Keys section'));
    
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: 'How would you like to proceed?',
      choices: [
        { title: 'Open Gemini website in browser', value: 'open' },
        { title: 'Enter API key manually', value: 'manual' },
        { title: 'Skip for now', value: 'skip' }
      ],
      initial: 0
    });
    
    switch (action) {
      case 'open':
        console.log(chalk.yellow('\nOpening Gemini API setup page...'));
        try {
          await open('https://aistudio.google.com/');
          console.log(chalk.green('✅ Browser opened successfully!'));
          console.log(chalk.gray('Please create an API key and paste it below:'));
        } catch (error) {
          console.log(chalk.red('Failed to open browser. Please visit https://aistudio.google.com/ manually.'));
        }
        // Fall through to manual entry
      case 'manual':
        const { apiKey } = await prompts({
          type: 'password',
          name: 'apiKey',
          message: 'Enter your Gemini API key:',
          validate: value => value.length > 10 ? true : 'Please enter a valid API key'
        });
        
        if (apiKey) {
          config.GEMINI_API_KEY = apiKey;
          console.log(chalk.green('✅ Gemini API key saved!'));
        }
        break;
      case 'skip':
        console.log(chalk.yellow('Skipped Gemini API setup.'));
        break;
    }
  }

  /**
   * Setup Qwen API key
   */
  async setupQwenKey(config) {
    console.log(chalk.cyan('\n🐉 Alibaba Qwen API Setup'));
    console.log(chalk.gray('========================='));
    
    if (config.QWEN_API_KEY && config.QWEN_API_KEY !== 'your_qwen_api_key_here') {
      console.log(chalk.green(`✓ Already configured: ${config.QWEN_API_KEY.substring(0, 8)}...`));
      const { change } = await prompts({
        type: 'confirm',
        name: 'change',
        message: 'Do you want to change the existing Qwen API key?',
        initial: false
      });
      
      if (!change) return;
    }
    
    console.log(chalk.gray('\nTo get a Qwen API key:'));
    console.log(chalk.gray('1. Visit: https://help.aliyun.com/product/148140.html'));
    console.log(chalk.gray('2. Sign up for an Alibaba Cloud account'));
    console.log(chalk.gray('3. Navigate to DashScope and create an API key'));
    
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: 'How would you like to proceed?',
      choices: [
        { title: 'Open Qwen website in browser', value: 'open' },
        { title: 'Enter API key manually', value: 'manual' },
        { title: 'Skip for now', value: 'skip' }
      ],
      initial: 0
    });
    
    switch (action) {
      case 'open':
        console.log(chalk.yellow('\nOpening Qwen API setup page...'));
        try {
          await open('https://help.aliyun.com/product/148140.html');
          console.log(chalk.green('✅ Browser opened successfully!'));
          console.log(chalk.gray('Please create an API key and paste it below:'));
        } catch (error) {
          console.log(chalk.red('Failed to open browser. Please visit https://help.aliyun.com/product/148140.html manually.'));
        }
        // Fall through to manual entry
      case 'manual':
        const { apiKey } = await prompts({
          type: 'password',
          name: 'apiKey',
          message: 'Enter your Qwen API key:',
          validate: value => value.length > 10 ? true : 'Please enter a valid API key'
        });
        
        if (apiKey) {
          config.QWEN_API_KEY = apiKey;
          console.log(chalk.green('✅ Qwen API key saved!'));
        }
        break;
      case 'skip':
        console.log(chalk.yellow('Skipped Qwen API setup.'));
        break;
    }
  }

  /**
   * Create a new .env file
   */
  createEnvFile() {
    const envContent = `# Hybrid AI CLI Configuration

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
`;
    
    fs.writeFileSync(this.configPath, envContent);
    console.log(chalk.green('✅ Created new .env configuration file'));
  }

  /**
   * Load configuration from .env file
   */
  loadConfig() {
    const config = {};
    
    if (fs.existsSync(this.configPath)) {
      const envContent = fs.readFileSync(this.configPath, 'utf8');
      const lines = envContent.split('\n');
      
      lines.forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key && value !== undefined) {
            config[key.trim()] = value.trim();
          }
        }
      });
    }
    
    return config;
  }

  /**
   * Save configuration to .env file
   */
  saveConfig(config) {
    let envContent = `# Hybrid AI CLI Configuration

# Gemini API Key (required for remote Gemini access)
GEMINI_API_KEY=${config.GEMINI_API_KEY || 'your_gemini_api_key_here'}

# Qwen API Key (required for remote Qwen access)
QWEN_API_KEY=${config.QWEN_API_KEY || 'your_qwen_api_key_here'}

# Local AI Settings
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_LOCAL_MODEL=smollm2:1.7b
DEFAULT_REMOTE_MODEL=gemini-pro

# Complexity Threshold (characters)
COMPLEXITY_THRESHOLD=100
`;
    
    fs.writeFileSync(this.configPath, envContent);
  }

  /**
   * Check if API keys are configured
   */
  areKeysConfigured() {
    const config = this.loadConfig();
    return {
      gemini: !!(config.GEMINI_API_KEY && config.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
      qwen: !!(config.QWEN_API_KEY && config.QWEN_API_KEY !== 'your_qwen_api_key_here')
    };
  }
}

module.exports = APIKeySetup;