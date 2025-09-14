const config = require('../config');

/**
 * Analyze the complexity of a task to determine if it needs professor guidance
 * @param {string} task - The task to analyze
 * @returns {string} - Complexity level: 'independent', 'guided', or 'direct-professor'
 */
async function analyzeComplexity(task) {
  const charCount = task.length;
  const questionWords = ['how', 'explain', 'what is', 'describe', 'define'];
  const hasQuestionWords = questionWords.some(word => 
    task.toLowerCase().includes(word));
  
  // Simple heuristic-based complexity analysis
  if (charCount <= config.complexity.levels.low.maxChars && !hasQuestionWords) {
    // Simple tasks that student can handle independently
    return 'independent';
  } else if (charCount <= config.complexity.levels.medium.maxChars) {
    // Moderate tasks that benefit from professor guidance
    return 'guided';
  } else {
    // Complex tasks that need direct professor consultation
    return 'direct-professor';
  }
}

/**
 * Get complexity description
 * @param {string} level - Complexity level
 * @returns {string} - Description of the complexity level
 */
function getComplexityDescription(level) {
  const descriptions = {
    'independent': 'Student can work independently',
    'guided': 'Student benefits from professor guidance',
    'direct-professor': 'Requires direct professor consultation'
  };
  return descriptions[level] || 'Unknown complexity';
}

module.exports = { analyzeComplexity, getComplexityDescription };