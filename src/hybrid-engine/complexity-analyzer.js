const config = require('../config');

/**
 * Analyze the complexity of a task
 * @param {string} task - The task to analyze
 * @returns {string} - Complexity level: 'low', 'medium', or 'high'
 */
async function analyzeComplexity(task) {
  const charCount = task.length;
  
  // Simple heuristic-based complexity analysis
  if (charCount <= config.complexity.levels.low.maxChars) {
    return 'low';
  } else if (charCount <= config.complexity.levels.medium.maxChars) {
    return 'medium';
  } else {
    return 'high';
  }
}

/**
 * Get complexity description
 * @param {string} level - Complexity level
 * @returns {string} - Description of the complexity level
 */
function getComplexityDescription(level) {
  return config.complexity.levels[level]?.description || 'Unknown complexity';
}

module.exports = { analyzeComplexity, getComplexityDescription };