const config = require('../config');
const APIKeyManager = require('../utils/api-key-manager');

/**
 * Make a decision on how to process a task using the professor-student model
 * @param {string} task - The task to process
 * @param {string} complexity - Complexity level
 * @param {object} options - CLI options
 * @returns {object} - Decision object with approach and model
 */
async function makeDecision(task, complexity, options) {
  // Check which AI services are configured
  const keyManager = new APIKeyManager();
  const keys = keyManager.getAPIKeys();
  const validity = keyManager.checkKeyValidity(keys);
  
  const hasLocal = process.env.LOCAL_AI_PROVIDER || config.local.provider;
  const hasOpenRouter = validity.openrouter;
  const hasRemote = validity.gemini || validity.qwen;
  
  // If forced student or professor, respect that
  if (options.local) {
    // Use OpenRouter if configured, otherwise fall back to local
    if (hasOpenRouter) {
      return {
        approach: 'openrouter',
        model: options.model || config.openrouterAI.defaultModel,
        reason: 'Using OpenRouter for task processing'
      };
    } else {
      return {
        approach: 'local',
        model: options.model || config.local.defaultModel,
        reason: 'Student working independently'
      };
    }
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
      // Use OpenRouter if configured, otherwise fall back to local
      if (hasOpenRouter) {
        return {
          approach: 'openrouter',
          model: options.model || config.openrouterAI.defaultModel,
          reason: 'Simple task - using OpenRouter for processing'
        };
      } else {
        return {
          approach: 'local',
          model: options.model || config.local.defaultModel,
          reason: 'Simple task - student can work independently'
        };
      }
      
    case 'guided':
      // Use remote (professors) for guidance
      if (hasRemote) {
        return {
          approach: 'hybrid',
          model: options.model || config.remote.defaultModel,
          localModel: hasOpenRouter ? config.openrouterAI.defaultModel : config.local.defaultModel,
          reason: 'Moderate task - professor provides guidance, student executes'
        };
      } else if (hasOpenRouter) {
        // If no remote keys but have OpenRouter, use OpenRouter for both
        return {
          approach: 'openrouter',
          model: options.model || config.openrouterAI.defaultModel,
          reason: 'Moderate task - using OpenRouter for processing'
        };
      } else {
        // Fall back to local
        return {
          approach: 'local',
          model: options.model || config.local.defaultModel,
          reason: 'Moderate task - student working independently'
        };
      }
      
    case 'direct-professor':
      if (hasRemote) {
        return {
          approach: 'remote',
          model: options.model || config.remote.defaultModel,
          reason: 'Complex task - requires direct professor consultation'
        };
      } else if (hasOpenRouter) {
        // If no remote keys but have OpenRouter, use OpenRouter for complex tasks
        return {
          approach: 'openrouter',
          model: options.model || config.openrouterAI.defaultModel,
          reason: 'Complex task - using OpenRouter for processing'
        };
      } else {
        // Fall back to local
        return {
          approach: 'local',
          model: options.model || config.local.defaultModel,
          reason: 'Complex task - student working independently (no remote access)'
        };
      }
      
    default:
      // Default to student working independently for simple tasks
      if (hasOpenRouter) {
        return {
          approach: 'openrouter',
          model: options.model || config.openrouterAI.defaultModel,
          reason: 'Defaulting to OpenRouter for task processing'
        };
      } else {
        return {
          approach: 'local',
          model: options.model || config.local.defaultModel,
          reason: 'Defaulting to student working independently'
        };
      }
  }
}

module.exports = { makeDecision };