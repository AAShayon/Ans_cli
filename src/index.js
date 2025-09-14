#!/usr/bin/env node

require('dotenv').config();
const { program } = require('commander');
const chalk = require('chalk');
const { executeHybridTask } = require('./cli');
const { spawn } = require('child_process');
const path = require('path');
const APIKeySetup = require('./utils/api-key-setup');
const { processImage } = require('./image-processor');

// CLI Program Definition
program
  .name('hybrid-ai')
  .description('A hybrid AI CLI/GUI tool that combines local and remote AI models')
  .version('1.0.0')
  .argument('[task]', 'The task you want the AI to help with')
  .option('-c, --complexity <level>', 'Task complexity: low, medium, high', 'auto')
  .option('-r, --remote', 'Force remote processing')
  .option('-l, --local', 'Force local processing')
  .option('-m, --model <model>', 'Specify model to use')
  .option('-g, --gui', 'Start the GUI interface')
  .option('-s, --setup', 'Setup API keys for remote services')
  .option('-i, --image <path>', 'Process an image file')
  .option('--gemini-key <key>', 'Specify Gemini API key directly')
  .option('--qwen-key <key>', 'Specify Qwen API key directly')
  .option('--openrouter-key <key>', 'Specify OpenRouter API key directly')
  .action(async (task, options) => {
    // If setup option is selected, start the API key setup
    if (options.setup) {
      console.log(chalk.blue('Starting API Key Setup...'));
      const setup = new APIKeySetup();
      await setup.startSetup();
      return;
    }
    
    // If GUI option is selected, start the GUI
    if (options.gui) {
      console.log(chalk.blue('Starting Hybrid AI GUI...'));
      console.log(chalk.gray('Opening browser at http://localhost:3000'));
      
      const guiProcess = spawn('node', [path.join(__dirname, 'gui.js')], {
        stdio: 'inherit'
      });
      
      guiProcess.on('error', (error) => {
        console.error(chalk.red('Error starting GUI:'), error.message);
        process.exit(1);
      });
      
      return;
    }
    
    // If image option is selected, process the image
    if (options.image) {
      if (!task) {
        console.error(chalk.red('Error: Please provide a task description for image processing'));
        process.exit(1);
      }
      
      try {
        console.log(chalk.blue('Hybrid AI CLI - Processing your image...'));
        const result = await processImage(options.image, task);
        
        console.log(chalk.green('\n✅ Image processing completed successfully!\n'));
        console.log('\n' + chalk.bold('Result:'));
        console.log(chalk.cyan('======='));
        console.log(result);
        console.log(chalk.cyan('=======\n'));
      } catch (error) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
      return;
    }
    
    // If no task is provided and GUI is not selected, show help
    if (!task) {
      program.help();
      return;
    }
    
    try {
      console.log(chalk.blue('Hybrid AI CLI - Processing your request...'));
      await executeHybridTask(task, options);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();