const config = require('../config');

/**
 * Make a decision on how to process a task using the professor-student model
 * @param {string} task - The task to process
 * @param {string} complexity - Complexity level
 * @param {object} options - CLI options
 * @returns {object} - Decision object with approach and model
 */
async function makeDecision(task, complexity, options) {
  // If forced student or professor, respect that
  if (options.local) {
    return {
      approach: 'local',
      model: options.model || config.local.defaultModel,
      reason: 'Student working independently'
    };
  }
  
  if (options.remote) {
    return {
      approach: 'remote',
      model: options.model || config.remote.defaultModel,
      reason: 'Direct professor consultation'
    };
  }
  
  // Otherwise, decide based on complexity using professor-student approach
  switch (complexity) {
    case 'independent':
      return {
        approach: 'local',
        model: options.model || config.local.defaultModel,
        reason: 'Simple task - student can work independently'
      };
      
    case 'guided':
      return {
        approach: 'hybrid',
        model: options.model || config.remote.defaultModel,
        localModel: config.local.defaultModel,
        reason: 'Moderate task - professor provides guidance, student executes'
      };
      
    case 'direct-professor':
      return {
        approach: 'remote',
        model: options.model || config.remote.defaultModel,
        reason: 'Complex task - requires direct professor consultation'
      };
      
    default:
      // Default to student working independently for simple tasks
      return {
        approach: 'local',
        model: options.model || config.local.defaultModel,
        reason: 'Defaulting to student working independently'
      };
  }
}

module.exports = { makeDecision };