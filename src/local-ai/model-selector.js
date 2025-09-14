const config = require('../config');

/**
 * Select the optimal model based on task type and purpose
 * @param {string} task - The task to analyze
 * @param {string} purpose - The purpose of the model (local, implementation, improvement)
 * @returns {string} - The optimal model name
 */
function selectOptimalModel(task, purpose) {
  const taskLower = task.toLowerCase();
  
  // Determine task type
  let taskType = 'general';
  if (taskLower.includes('flutter') || taskLower.includes('dart') || taskLower.includes('widget')) {
    taskType = 'flutter';
  } else if (taskLower.includes('react') || taskLower.includes('javascript') || taskLower.includes('js')) {
    taskType = 'javascript';
  } else if (taskLower.includes('python') || taskLower.includes('py')) {
    taskType = 'python';
  } else if (taskLower.includes('java')) {
    taskType = 'java';
  } else if (taskLower.includes('php')) {
    taskType = 'php';
  } else if (taskLower.includes('laravel')) {
    taskType = 'php';
  } else if (taskLower.includes('node') || taskLower.includes('express')) {
    taskType = 'javascript';
  } else if (taskLower.includes('image') || taskLower.includes('design') || taskLower.includes('ui')) {
    taskType = 'image';
  }
  
  // Select model based on purpose and task type
  switch (purpose) {
    case 'local':
      // For simple local tasks, use lightweight model
      return 'tinyllama:1.1b';
      
    case 'implementation':
      // For implementation, choose model based on task type
      switch (taskType) {
        case 'flutter':
          return 'codellama:7b-instruct';
        case 'javascript':
          return 'smollm2:1.7b';
        case 'python':
          return 'codellama:7b-instruct';
        case 'java':
          return 'codellama:7b-instruct';
        case 'php':
          return 'smollm2:1.7b';
        case 'image':
          // For image/UI tasks, use a model with vision capabilities
          return config.openrouterAI.availableModels.find(model => model.includes('vision')) || 
                 'microsoft/phi-3-mini-128k-instruct';
        default:
          return 'smollm2:1.7b';
      }
      
    case 'improvement':
      // For improvements, use a model good at code analysis
      switch (taskType) {
        case 'flutter':
          return 'codellama:7b-instruct';
        case 'javascript':
          return 'codegemma:2b';
        case 'python':
          return 'codellama:7b-instruct';
        case 'java':
          return 'codellama:7b-instruct';
        case 'php':
          return 'codegemma:2b';
        case 'image':
          // For image/UI tasks, use a model with vision capabilities
          return config.openrouterAI.availableModels.find(model => model.includes('vision')) || 
                 'microsoft/phi-3-mini-128k-instruct';
        default:
          return 'codegemma:2b';
      }
      
    default:
      // Default to a balanced model
      return 'smollm2:1.7b';
  }
}

/**
 * Get available models for a specific task type
 * @param {string} taskType - The type of task
 * @returns {Array} - Array of available models
 */
function getAvailableModels(taskType) {
  const modelMap = {
    'flutter': ['codellama:7b-instruct', 'smollm2:1.7b', 'codegemma:2b'],
    'javascript': ['smollm2:1.7b', 'codegemma:2b', 'tinyllama:1.1b'],
    'python': ['codellama:7b-instruct', 'smollm2:1.7b', 'codegemma:2b'],
    'java': ['codellama:7b-instruct', 'smollm2:1.7b'],
    'php': ['smollm2:1.7b', 'codegemma:2b'],
    'image': config.openrouterAI.availableModels.filter(model => model.includes('vision')).length > 0 ? 
             config.openrouterAI.availableModels.filter(model => model.includes('vision')) : 
             ['microsoft/phi-3-mini-128k-instruct', 'meta-llama/llama-3-8b-instruct'],
    'general': ['smollm2:1.7b', 'tinyllama:1.1b', 'codegemma:2b']
  };
  
  return modelMap[taskType] || modelMap['general'];
}

module.exports = { selectOptimalModel, getAvailableModels };