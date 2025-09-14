const chalk = require('chalk');
const ora = require('ora');
const { analyzeComplexity } = require('./hybrid-engine/complexity-analyzer');
const { makeDecision } = require('./hybrid-engine/decision-engine');
const { executeTask } = require('./hybrid-engine/task-orchestrator');
const APIKeySetup = require('./utils/api-key-setup');

async function executeHybridTask(task, options) {
  // Check if API keys are needed for this task
  const setup = new APIKeySetup();
  const keysConfigured = setup.areKeysConfigured();
  
  // Display initial motivational message
  console.log(chalk.blue.bold('\n🌟 Empowering Developers with AI Technology 🌟\n'));
  
  // If this is a remote or hybrid task, check for API keys
  if (!options.local && (options.remote || options.complexity === 'high' || task.length > 100)) {
    if (!keysConfigured.gemini && !keysConfigured.qwen && !keysConfigured.openrouter) {
      console.log(chalk.yellow('⚠️  API keys not configured for remote AI services'));
      console.log(chalk.gray('Remote processing requires API keys for Gemini, Qwen, or OpenRouter\n'));
      
      const { setupKeys } = await require('prompts')({
        type: 'confirm',
        name: 'setupKeys',
        message: 'Would you like to setup API keys now?',
        initial: true
      });
      
      if (setupKeys) {
        await setup.startSetup();
        // Reload configuration
        Object.assign(keysConfigured, setup.areKeysConfigured());
      } else {
        console.log(chalk.gray('Continuing with local/OpenRouter processing only...'));
        options.local = true;
      }
    }
  }
  
  require('./utils/speech-display').displayMotivationalSpeech('general');
  
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
    require('./utils/speech-display').displayMotivationalSpeech('completion');
    
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