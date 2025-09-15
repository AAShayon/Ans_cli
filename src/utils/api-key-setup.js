const prompts = require('prompts');
const open = require('open');
const chalk = require('chalk');
const APIKeyManager = require('./api-key-manager');

/**
 * Interactive API key setup for remote AI services
 */
class APIKeySetup {
  constructor() {
    this.keyManager = new APIKeyManager();
  }

  /**
   * Start the interactive API key setup process
   */
  async startSetup() {
    console.log(chalk.blue.bold('\n🔐 Hybrid AI Services Setup\n'));
    console.log(chalk.gray('This setup will help you configure AI services for the Hybrid AI tool.'));
    console.log(chalk.gray('You can skip any service and configure it later.\n'));
    
    // Ask user about their hardware setup
    const { hardware } = await prompts({
      type: 'select',
      name: 'hardware',
      message: 'What is your hardware setup?',
      choices: [
        { title: 'High-end PC with GPU (recommended for local models)', value: 'gpu' },
        { title: 'Low-end PC or no GPU (use cloud services)', value: 'no-gpu' },
        { title: 'Not sure - help me decide', value: 'help' }
      ],
      initial: 1
    });
    
    // Provide guidance based on hardware
    if (hardware === 'help') {
      console.log(chalk.blue('\nHardware Guidance:'));
      console.log(chalk.gray('• High-end PC with GPU: Install Ollama for fast local processing'));
      console.log(chalk.gray('• Low-end PC or no GPU: Use OpenRouter for free cloud processing'));
      console.log(chalk.gray('• You can always change this later\n'));
      
      const { hardwareChoice } = await prompts({
        type: 'select',
        name: 'hardwareChoice',
        message: 'Select your hardware setup:',
        choices: [
          { title: 'High-end PC with GPU', value: 'gpu' },
          { title: 'Low-end PC or no GPU', value: 'no-gpu' }
        ]
      });
      
      hardware = hardwareChoice;
    }
    
    // Ask user which AI service they want to use
    const choices = [
      { title: 'Senior Developer Guidance (Gemini/Qwen) - Required for complex tasks', value: 'senior' }
    ];
    
    if (hardware === 'gpu') {
      choices.unshift({ title: 'Local models (requires Ollama, best for privacy)', value: 'local' });
      choices.push({ title: 'Both local and senior guidance', value: 'both-local' });
    } else {
      choices.unshift({ title: 'OpenRouter API (completely free cloud service, no GPU required)', value: 'openrouter' });
      choices.push({ title: 'Both OpenRouter and senior guidance', value: 'both-openrouter' });
    }
    
    const { aiPreference } = await prompts({
      type: 'select',
      name: 'aiPreference',
      message: 'Which AI services would you like to use?',
      choices,
      initial: 0
    });
    
    // Save preference
    process.env.AI_PREFERENCE = aiPreference;
    
    // Get existing keys
    const existingKeys = this.keyManager.getAPIKeys();
    
    // Setup Gemini API key (if selected)
    let geminiKey = existingKeys.gemini;
    if (aiPreference === 'senior' || aiPreference === 'both-local' || aiPreference === 'both-openrouter') {
      geminiKey = await this.setupGeminiKey(existingKeys.gemini);
    }
    
    // Setup Qwen API key (if selected)
    let qwenKey = existingKeys.qwen;
    if (aiPreference === 'senior' || aiPreference === 'both-local' || aiPreference === 'both-openrouter') {
      qwenKey = await this.setupQwenKey(existingKeys.qwen);
    }
    
    // Setup OpenRouter API key (if selected)
    let openrouterKey = existingKeys.openrouter;
    if (aiPreference === 'openrouter' || aiPreference === 'both-openrouter') {
      openrouterKey = await this.setupOpenRouterKey(existingKeys.openrouter);
    }
    
    // Save configuration
    const newKeys = {
      gemini: geminiKey || existingKeys.gemini,
      qwen: qwenKey || existingKeys.qwen,
      openrouter: openrouterKey || existingKeys.openrouter
    };
    
    this.keyManager.saveKeysToLocalConfig(newKeys);
    
    // Provide next steps
    console.log(chalk.green.bold('\n✅ Setup completed successfully!\n'));
    console.log(chalk.gray('Configuration saved to .env file'));
    
    if (hardware === 'gpu' && (aiPreference === 'local' || aiPreference === 'both-local')) {
      console.log(chalk.blue('\nNext steps:'));
      console.log(chalk.gray('1. Install Ollama from https://ollama.com/'));
      console.log(chalk.gray('2. Pull required models: ollama pull smollm2:1.7b'));
      console.log(chalk.gray('3. Run: hybrid-ai "Your task here"'));
    } else if (aiPreference === 'openrouter' || aiPreference === 'both-openrouter') {
      console.log(chalk.blue('\nNext steps:'));
      console.log(chalk.gray('1. Run: hybrid-ai "Your task here"'));
      console.log(chalk.gray('2. For image processing: hybrid-ai -i "path/to/image.png" "Describe this image"'));
    } else {
      console.log(chalk.blue('\nNext steps:'));
      console.log(chalk.gray('1. Run: hybrid-ai "Your task here"'));
    }
  }

  /**
   * Setup Gemini API key
   */
  async setupGeminiKey(existingKey) {
    console.log(chalk.cyan('\n🔮 Google Gemini API Setup'));
    console.log(chalk.gray('=========================='));
    
    if (existingKey && existingKey !== 'your_gemini_api_key_here') {
      console.log(chalk.green(`✓ Already configured: ${existingKey.substring(0, 8)}...`));
      const { change } = await prompts({
        type: 'confirm',
        name: 'change',
        message: 'Do you want to change the existing Gemini API key?',
        initial: false
      });
      
      if (!change) return existingKey;
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
          console.log(chalk.green('✅ Gemini API key saved!'));
          return apiKey;
        }
        break;
      case 'skip':
        console.log(chalk.yellow('Skipped Gemini API setup.'));
        break;
    }
    
    return existingKey;
  }

  /**
   * Setup Qwen API key
   */
  async setupQwenKey(existingKey) {
    console.log(chalk.cyan('\n🐉 Alibaba Qwen API Setup'));
    console.log(chalk.gray('========================='));
    
    if (existingKey && existingKey !== 'your_qwen_api_key_here') {
      console.log(chalk.green(`✓ Already configured: ${existingKey.substring(0, 8)}...`));
      const { change } = await prompts({
        type: 'confirm',
        name: 'change',
        message: 'Do you want to change the existing Qwen API key?',
        initial: false
      });
      
      if (!change) return existingKey;
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
          console.log(chalk.green('✅ Qwen API key saved!'));
          return apiKey;
        }
        break;
      case 'skip':
        console.log(chalk.yellow('Skipped Qwen API setup.'));
        break;
    }
    
    return existingKey;
  }

  /**
   * Setup OpenRouter API key
   */
  async setupOpenRouterKey(existingKey) {
    console.log(chalk.cyan('\n🌐 OpenRouter API Setup'));
    console.log(chalk.gray('======================='));
    
    if (existingKey && existingKey !== 'your_openrouter_api_key_here') {
      console.log(chalk.green(`✓ Already configured: ${existingKey.substring(0, 8)}...`));
      const { change } = await prompts({
        type: 'confirm',
        name: 'change',
        message: 'Do you want to change the existing OpenRouter API key?',
        initial: false
      });
      
      if (!change) return existingKey;
    }
    
    console.log(chalk.gray('\nTo get an OpenRouter API key:'));
    console.log(chalk.gray('1. Visit: https://openrouter.ai/keys'));
    console.log(chalk.gray('2. Sign up for an account'));
    console.log(chalk.gray('3. Create a new API key'));
    
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: 'How would you like to proceed?',
      choices: [
        { title: 'Open OpenRouter website in browser', value: 'open' },
        { title: 'Enter API key manually', value: 'manual' },
        { title: 'Skip for now', value: 'skip' }
      ],
      initial: 0
    });
    
    switch (action) {
      case 'open':
        console.log(chalk.yellow('\nOpening OpenRouter API setup page...'));
        try {
          await open('https://openrouter.ai/keys');
          console.log(chalk.green('✅ Browser opened successfully!'));
          console.log(chalk.gray('Please create an API key and paste it below:'));
        } catch (error) {
          console.log(chalk.red('Failed to open browser. Please visit https://openrouter.ai/keys manually.'));
        }
        // Fall through to manual entry
      case 'manual':
        const { apiKey } = await prompts({
          type: 'password',
          name: 'apiKey',
          message: 'Enter your OpenRouter API key:',
          validate: value => value.length > 10 ? true : 'Please enter a valid API key'
        });
        
        if (apiKey) {
          console.log(chalk.green('✅ OpenRouter API key saved!'));
          return apiKey;
        }
        break;
      case 'skip':
        console.log(chalk.yellow('Skipped OpenRouter API setup.'));
        break;
    }
    
    return existingKey;
  }

  /**
   * Check if API keys are configured
   */
  areKeysConfigured() {
    const keys = this.keyManager.getAPIKeys();
    const validity = this.keyManager.checkKeyValidity(keys);
    
    return {
      gemini: validity.gemini,
      qwen: validity.qwen,
      openrouter: validity.openrouter
    };
  }
  
  /**
   * Get configured API keys
   */
  getKeys() {
    return this.keyManager.getAPIKeys();
  }
}

module.exports = APIKeySetup;