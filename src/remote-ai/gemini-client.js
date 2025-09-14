const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

/**
 * Execute a task using Gemini AI
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @returns {string} - The result from Gemini
 */
async function executeGeminiTask(task, model) {
  if (!config.gemini.apiKey) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.');
  }
  
  try {
    const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    const geminiModel = genAI.getGenerativeModel({ model: model || 'gemini-pro' });
    
    const result = await geminiModel.generateContent(task);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

/**
 * Execute a task using Qwen AI
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @returns {string} - The result from Qwen
 */
async function executeQwenTask(task, model) {
  if (!config.qwen.apiKey) {
    throw new Error('Qwen API key is not configured. Please set QWEN_API_KEY in your .env file.');
  }
  
  try {
    const response = await axios.post(
      `${config.qwen.baseUrl}/services/aigc/text-generation/generation`,
      {
        model: model || 'qwen-turbo',
        input: {
          prompt: task
        },
        parameters: {
          max_tokens: 2000,
          temperature: 0.7
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.qwen.apiKey}`,
          'Content-Type': 'application/json',
          'X-DashScope-SSE': 'enable'
        }
      }
    );
    
    return response.data.output.text || 'No response from Qwen';
  } catch (error) {
    throw new Error(`Qwen API error: ${error.message}`);
  }
}

/**
 * Execute a task using a remote AI model
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @returns {string} - The result from the AI model
 */
async function executeRemoteTask(task, model) {
  // For now, default to Gemini
  // In a more advanced implementation, you could choose based on model name
  if (model.startsWith('qwen')) {
    return await executeQwenTask(task, model);
  } else {
    return await executeGeminiTask(task, model);
  }
}

module.exports = { executeRemoteTask, executeGeminiTask, executeQwenTask };