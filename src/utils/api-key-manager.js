const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * API Key Manager - Handles multiple methods of API key collection
 */
class APIKeyManager {
  constructor() {
    this.configPath = path.join(process.cwd(), '.env');
    this.globalConfigPath = path.join(os.homedir(), '.hybrid-ai-config');
  }

  /**
   * Get API keys using multiple methods (in order of precedence)
   * 1. Command line arguments
   * 2. Environment variables
   * 3. Local .env file
   * 4. Global configuration file
   * @param {object} cliOptions - Command line options
   * @returns {object} - API keys object
   */
  getAPIKeys(cliOptions = {}) {
    // 1. Check command line arguments first
    if (cliOptions.geminiKey || cliOptions.qwenKey || cliOptions.openrouterKey) {
      return {
        gemini: cliOptions.geminiKey,
        qwen: cliOptions.qwenKey,
        openrouter: cliOptions.openrouterKey
      };
    }

    // 2. Check environment variables
    const envKeys = this.getKeysFromEnvironment();
    if (envKeys.gemini || envKeys.qwen || envKeys.openrouter) {
      return envKeys;
    }

    // 3. Check local .env file
    const localKeys = this.getKeysFromLocalConfig();
    if (localKeys.gemini || localKeys.qwen || localKeys.openrouter) {
      return localKeys;
    }

    // 4. Check global configuration file
    const globalKeys = this.getKeysFromGlobalConfig();
    if (globalKeys.gemini || globalKeys.qwen || globalKeys.openrouter) {
      return globalKeys;
    }

    // No keys found
    return { gemini: null, qwen: null, openrouter: null };
  }

  /**
   * Get API keys from environment variables
   * @returns {object} - API keys from environment
   */
  getKeysFromEnvironment() {
    return {
      gemini: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
      qwen: process.env.QWEN_API_KEY || process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
      openrouter: process.env.OPENROUTER_API_KEY
    };
  }

  /**
   * Get API keys from local .env file
   * @returns {object} - API keys from local config
   */
  getKeysFromLocalConfig() {
    if (!fs.existsSync(this.configPath)) {
      return { gemini: null, qwen: null, openrouter: null };
    }

    try {
      const envContent = fs.readFileSync(this.configPath, 'utf8');
      const config = this.parseEnvContent(envContent);
      
      return {
        gemini: config.GEMINI_API_KEY,
        qwen: config.QWEN_API_KEY,
        openrouter: config.OPENROUTER_API_KEY
      };
    } catch (error) {
      console.warn('Warning: Could not read local .env file');
      return { gemini: null, qwen: null, openrouter: null };
    }
  }

  /**
   * Get API keys from global configuration file
   * @returns {object} - API keys from global config
   */
  getKeysFromGlobalConfig() {
    if (!fs.existsSync(this.globalConfigPath)) {
      return { gemini: null, qwen: null, openrouter: null };
    }

    try {
      const configContent = fs.readFileSync(this.globalConfigPath, 'utf8');
      return JSON.parse(configContent);
    } catch (error) {
      console.warn('Warning: Could not read global config file');
      return { gemini: null, qwen: null, openrouter: null };
    }
  }

  /**
   * Parse .env file content
   * @param {string} content - .env file content
   * @returns {object} - Parsed configuration
   */
  parseEnvContent(content) {
    const config = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value !== undefined) {
          config[key.trim()] = value.trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
        }
      }
    });
    
    return config;
  }

  /**
   * Save API keys to local .env file
   * @param {object} keys - API keys to save
   */
  saveKeysToLocalConfig(keys) {
    let envContent = '';
    
    if (fs.existsSync(this.configPath)) {
      envContent = fs.readFileSync(this.configPath, 'utf8');
    } else {
      envContent = `# Hybrid AI CLI Configuration

# Gemini API Key (required for remote Gemini access)
GEMINI_API_KEY=your_gemini_api_key_here

# Qwen API Key (required for remote Qwen access)
QWEN_API_KEY=your_qwen_api_key_here

# OpenRouter API Key (for free cloud-based AI models)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Local AI Settings
LOCAL_AI_PROVIDER=ollama
LOCAL_AI_BASE_URL=http://localhost:11434

# Default Models
DEFAULT_LOCAL_MODEL=smollm2:1.7b
DEFAULT_REMOTE_MODEL=gemini-pro
DEFAULT_OPENROUTER_MODEL=mistralai/mistral-7b-instruct-v0.2

# Complexity Threshold (characters)
COMPLEXITY_THRESHOLD=100
`;
    }
    
    // Update Gemini key if provided
    if (keys.gemini) {
      if (envContent.includes('GEMINI_API_KEY=')) {
        envContent = envContent.replace(
          /GEMINI_API_KEY=.*/,
          `GEMINI_API_KEY=${keys.gemini}`
        );
      } else {
        envContent += `\nGEMINI_API_KEY=${keys.gemini}`;
      }
    }
    
    // Update Qwen key if provided
    if (keys.qwen) {
      if (envContent.includes('QWEN_API_KEY=')) {
        envContent = envContent.replace(
          /QWEN_API_KEY=.*/,
          `QWEN_API_KEY=${keys.qwen}`
        );
      } else {
        envContent += `\nQWEN_API_KEY=${keys.qwen}`;
      }
    }
    
    // Update OpenRouter key if provided
    if (keys.openrouter) {
      if (envContent.includes('OPENROUTER_API_KEY=')) {
        envContent = envContent.replace(
          /OPENROUTER_API_KEY=.*/,
          `OPENROUTER_API_KEY=${keys.openrouter}`
        );
      } else {
        envContent += `\nOPENROUTER_API_KEY=${keys.openrouter}`;
      }
    }
    
    fs.writeFileSync(this.configPath, envContent);
  }

  /**
   * Save API keys to global configuration file
   * @param {object} keys - API keys to save
   */
  saveKeysToGlobalConfig(keys) {
    fs.writeFileSync(this.globalConfigPath, JSON.stringify(keys, null, 2));
  }

  /**
   * Validate API key format
   * @param {string} key - API key to validate
   * @param {string} service - Service name (gemini, qwen, or openrouter)
   * @returns {boolean} - Whether key format is valid
   */
  validateKey(key, service) {
    if (!key) return false;
    
    // Basic validation - keys should be reasonably long
    if (key.length < 10) return false;
    
    // Service-specific validation
    switch (service) {
      case 'gemini':
        // Gemini keys are typically long strings
        return /^[A-Za-z0-9_-]+$/.test(key);
      case 'qwen':
        // Qwen/Alibaba keys can vary in format
        return /^[A-Za-z0-9]+$/.test(key) || key.length > 20;
      case 'openrouter':
        // OpenRouter keys are typically long strings
        return /^[A-Za-z0-9_-]+$/.test(key);
      default:
        return true;
    }
  }

  /**
   * Check which services have valid API keys
   * @param {object} keys - API keys to check
   * @returns {object} - Validation results
   */
  checkKeyValidity(keys) {
    return {
      gemini: this.validateKey(keys.gemini, 'gemini'),
      qwen: this.validateKey(keys.qwen, 'qwen'),
      openrouter: this.validateKey(keys.openrouter, 'openrouter')
    };
  }
}

module.exports = APIKeyManager;