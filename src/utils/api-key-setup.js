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
    console.log(chalk.blue.bold('\n🔐 Remote AI Services API Key Setup\n'));
    console.log(chalk.gray('This setup will help you configure API keys for remote AI services.'));
    console.log(chalk.gray('You can skip any service and configure it later.\n'));
    
    // Get existing keys
    const existingKeys = this.keyManager.getAPIKeys();
    
    // Setup Gemini API key
    const geminiKey = await this.setupGeminiKey(existingKeys.gemini);
    
    // Setup Qwen API key
    const qwenKey = await this.setupQwenKey(existingKeys.qwen);
    
    // Save configuration
    const newKeys = {
      gemini: geminiKey || existingKeys.gemini,
      qwen: qwenKey || existingKeys.qwen
    };
    
    this.keyManager.saveKeysToLocalConfig(newKeys);
    
    console.log(chalk.green.bold('\n✅ API key setup completed!\n'));
    console.log(chalk.gray('Configuration saved to .env file'));
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
   * Check if API keys are configured
   */
  areKeysConfigured() {
    const keys = this.keyManager.getAPIKeys();
    const validity = this.keyManager.checkKeyValidity(keys);
    
    return {
      gemini: validity.gemini,
      qwen: validity.qwen
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