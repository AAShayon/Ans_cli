const axios = require('axios');
const config = require('../config');

/**
 * Execute a task using a local AI model via Ollama
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @returns {string} - The result from the AI model
 */
async function executeLocalTask(task, model) {
  try {
    const response = await axios.post(`${config.local.baseUrl}/api/generate`, {
      model: model,
      prompt: task,
      stream: false
    }, {
      timeout: 30000 // 30 second timeout
    });
    
    return response.data.response || response.data.generated_text || 'No response from local AI';
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to Ollama. Please make sure Ollama is running.');
    }
    throw new Error(`Local AI error: ${error.message}`);
  }
}

/**
 * Check if a local model is available
 * @param {string} model - The model to check
 * @returns {boolean} - Whether the model is available
 */
async function isModelAvailable(model) {
  try {
    const response = await axios.get(`${config.local.baseUrl}/api/tags`);
    return response.data.models.some(m => m.name === model);
  } catch (error) {
    return false;
  }
}

/**
 * Pull a model if it's not available
 * @param {string} model - The model to pull
 */
async function pullModel(model) {
  try {
    await axios.post(`${config.local.baseUrl}/api/pull`, {
      name: model,
      stream: false
    });
  } catch (error) {
    throw new Error(`Failed to pull model ${model}: ${error.message}`);
  }
}

module.exports = { executeLocalTask, isModelAvailable, pullModel };