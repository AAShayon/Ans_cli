// Configuration module
require('dotenv').config();

const config = {
  // API Keys
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta'
  },
  
  qwen: {
    apiKey: process.env.QWEN_API_KEY || '',
    baseUrl: 'https://dashscope.aliyuncs.com/api/v1'
  },
  
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    baseUrl: 'https://openrouter.ai/api/v1'
  },
  
  // Local AI Settings
  local: {
    provider: process.env.LOCAL_AI_PROVIDER || 'ollama',
    baseUrl: process.env.LOCAL_AI_BASE_URL || 'http://localhost:11434',
    defaultModel: process.env.DEFAULT_LOCAL_MODEL || 'smollm2:1.7b'
  },
  
  // OpenRouter AI Settings
  openrouterAI: {
    provider: 'openrouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: process.env.DEFAULT_OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct-v0.2',
    availableModels: [
      'mistralai/mistral-7b-instruct-v0.2',
      'google/gemma-7b-it',
      'meta-llama/llama-2-13b-chat',
      'microsoft/phi-3-mini-128k-instruct',
      'mistralai/codestral-mamba',
      'codellama/codellama-70b-instruct',
      'meta-llama/llama-3-8b-instruct',
      // Free-tier models that are suitable for students
      'openchat/openchat-7b',
      'neversleep/noromaid-20b',
      'pygmalionai/mythalion-13b',
      'undi95/toppy-m-7b',
      'teknium/openhermes-2.5-mistral-7b'
    ]
  },
  
  // Remote AI Settings
  remote: {
    defaultModel: process.env.DEFAULT_REMOTE_MODEL || 'gemini-pro'
  },
  
  // Complexity Settings
  complexity: {
    threshold: parseInt(process.env.COMPLEXITY_THRESHOLD) || 100,
    levels: {
      low: { maxChars: 50, description: 'Simple queries and code snippets' },
      medium: { maxChars: 200, description: 'Moderate tasks requiring some reasoning' },
      high: { maxChars: Infinity, description: 'Complex tasks requiring deep analysis' }
    }
  }
};

module.exports = config;