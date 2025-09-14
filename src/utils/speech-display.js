const chalk = require('chalk');
const { getRandomSpeech } = require('./motivational-speeches');

/**
 * Display a motivational speech with styling
 * @param {string} context - The context for the speech
 */
function displayMotivationalSpeech(context = 'general') {
  const speech = getRandomSpeech(context);
  
  console.log('\n' + chalk.cyan.bold('💡 Motivational Thought:'));
  console.log(chalk.yellow(`"${speech.quote}"`));
  console.log(chalk.gray(`- ${speech.author}\n`));
}

/**
 * Start displaying motivational speeches periodically
 * @param {string} context - The context for speeches
 * @param {number} interval - Interval in milliseconds (default: 10 seconds)
 * @returns {object} - Interval object for stopping
 */
function startMotivationalSpeeches(context = 'general', interval = 10000) {
  // Display initial speech
  displayMotivationalSpeech(context);
  
  // Set up periodic display
  const speechInterval = setInterval(() => {
    displayMotivationalSpeech(context);
  }, interval);
  
  return speechInterval;
}

/**
 * Stop displaying motivational speeches
 * @param {object} interval - Interval object to stop
 */
function stopMotivationalSpeeches(interval) {
  if (interval) {
    clearInterval(interval);
  }
}

/**
 * Display a specific speech by index
 * @param {number} index - Index of the speech to display
 */
function displaySpecificSpeech(index) {
  const { motivationalSpeeches } = require('./motivational-speeches');
  
  if (index >= 0 && index < motivationalSpeeches.length) {
    const speech = motivationalSpeeches[index];
    console.log('\n' + chalk.cyan.bold('💡 Motivational Thought:'));
    console.log(chalk.yellow(`"${speech.quote}"`));
    console.log(chalk.gray(`- ${speech.author}\n`));
  } else {
    console.log(chalk.red('Invalid speech index'));
  }
}

module.exports = { 
  displayMotivationalSpeech, 
  startMotivationalSpeeches, 
  stopMotivationalSpeeches,
  displaySpecificSpeech
};