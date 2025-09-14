const chalk = require('chalk');
const ora = require('ora');
const { analyzeComplexity } = require('./hybrid-engine/complexity-analyzer');
const { makeDecision } = require('./hybrid-engine/decision-engine');
const { executeTask } = require('./hybrid-engine/task-orchestrator');
const { displayMotivationalSpeech } = require('./utils/speech-display');

async function executeHybridTask(task, options) {
  // Display initial motivational message
  console.log(chalk.blue.bold('\n🌟 Empowering Developers with AI Technology 🌟\n'));
  displayMotivationalSpeech('general');
  
  const spinner = ora({
    text: 'Analyzing task complexity...',
    spinner: 'clock'
  }).start();

  try {
    // Step 1: Analyze task complexity
    const complexity = options.complexity !== 'auto' 
      ? options.complexity 
      : await analyzeComplexity(task);
    
    spinner.text = `Task complexity: ${complexity}`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Make decision on processing approach
    spinner.text = 'Determining processing approach...';
    const decision = await makeDecision(task, complexity, options);
    
    spinner.text = `Approach: ${decision.approach} (${decision.model})`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Execute task
    spinner.text = 'Executing task...';
    const result = await executeTask(task, decision);
    
    spinner.succeed(chalk.green('Task completed successfully!'));
    
    // Display completion motivational message
    console.log(chalk.blue.bold('\n🎉 Technology Empowerment Complete! 🎉\n'));
    displayMotivationalSpeech('completion');
    
    // Display result
    console.log('\n' + chalk.bold('Result:'));
    console.log(chalk.cyan('======='));
    console.log(result);
    console.log(chalk.cyan('=======\n'));
    
  } catch (error) {
    spinner.fail(chalk.red('Task execution failed'));
    throw error;
  }
}

module.exports = { executeHybridTask };