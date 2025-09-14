const config = require('../config');

/**
 * Make a decision on how to process a task
 * @param {string} task - The task to process
 * @param {string} complexity - Complexity level
 * @param {object} options - CLI options
 * @returns {object} - Decision object with approach and model
 */
async function makeDecision(task, complexity, options) {
  // If forced local or remote, respect that
  if (options.local) {
    return {
      approach: 'local',
      model: options.model || config.local.defaultModel,
      reason: 'Forced local processing'
    };
  }
  
  if (options.remote) {
    return {
      approach: 'remote',
      model: options.model || config.remote.defaultModel,
      reason: 'Forced remote processing'
    };
  }
  
  // Otherwise, decide based on complexity and other factors
  switch (complexity) {
    case 'low':
      return {
        approach: 'local',
        model: options.model || config.local.defaultModel,
        reason: 'Low complexity task - processing locally for speed'
      };
      
    case 'medium':
      return {
        approach: 'hybrid',
        model: options.model || config.remote.defaultModel,
        localModel: config.local.defaultModel,
        reason: 'Medium complexity task - using remote guidance with local execution'
      };
      
    case 'high':
      return {
        approach: 'remote',
        model: options.model || config.remote.defaultModel,
        reason: 'High complexity task - processing remotely for best results'
      };
      
    default:
      // Default to local for simple tasks
      return {
        approach: 'local',
        model: options.model || config.local.defaultModel,
        reason: 'Defaulting to local processing'
      };
  }
}

module.exports = { makeDecision };