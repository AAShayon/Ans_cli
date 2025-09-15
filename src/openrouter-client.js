const axios = require('axios');
const config = require('./config');
const APIKeyManager = require('./utils/api-key-manager');

/**
 * Execute a task using OpenRouter AI
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @returns {string} - The result from OpenRouter
 * 
 * OpenRouter provides access to many powerful AI models completely free of charge.
 * This makes the Hybrid AI CLI/GUI tool accessible to all students and developers,
 * regardless of their budget or hardware setup.
 */
async function executeOpenRouterTask(task, model) {
  // Get API key using the manager
  const keyManager = new APIKeyManager();
  const keys = keyManager.getAPIKeys();
  
  const apiKey = keys.openrouter || config.openrouter.apiKey;
  
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    throw new Error('OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in your .env file or use --openrouter-key option.');
  }
  
  try {
    const response = await axios.post(
      `${config.openrouter.baseUrl}/chat/completions`,
      {
        model: model || config.openrouterAI.defaultModel,
        messages: [
          {
            role: "user",
            content: task
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/AAShayon/Ans_cli',
          'X-Title': 'Hybrid AI CLI Tool'
        }
      }
    );
    
    return response.data.choices[0].message.content || 'No response from OpenRouter';
  } catch (error) {
    if (error.response) {
      throw new Error(`OpenRouter API error: ${error.response.data.error.message}`);
    } else {
      throw new Error(`OpenRouter API error: ${error.message}`);
    }
  }
}

/**
 * Check if a model is available on OpenRouter
 * @param {string} model - The model to check
 * @returns {boolean} - Whether the model is available
 */
async function isOpenRouterModelAvailable(model) {
  try {
    // Check if model is in our predefined list
    return config.openrouterAI.availableModels.includes(model);
  } catch (error) {
    return false;
  }
}

/**
 * Get available models from OpenRouter
 * @returns {Array} - Array of available models
 */
async function getAvailableOpenRouterModels() {
  return config.openrouterAI.availableModels;
}

module.exports = { executeOpenRouterTask, isOpenRouterModelAvailable, getAvailableOpenRouterModels };