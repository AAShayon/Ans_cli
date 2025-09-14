const chalk = require('chalk');
const { executeLocalTask } = require('../local-ai/ollama-client');
const { executeRemoteTask } = require('../remote-ai/gemini-client');
const { executeOpenRouterTask } = require('../openrouter-client');
const { selectOptimalModel } = require('../local-ai/model-selector');
const { runSpriteMCPTests } = require('../testing/sprite-mcp');
const { startMotivationalSpeeches, stopMotivationalSpeeches } = require('../utils/speech-display');

/**
 * Execute a task using the professional senior developer workflow
 * @param {string} task - The task to execute
 * @param {object} decision - The decision on how to process the task
 * @returns {string} - The result of the task execution
 */
async function executeTask(task, decision) {
  let speechInterval;
  
  try {
    switch (decision.approach) {
      case 'local':
        // Senior developer working independently on simple tasks
        console.log(chalk.blue.bold('\n🚀 Starting Local Processing...\n'));
        speechInterval = startMotivationalSpeeches('general', 8000);
        
        const localModel = selectOptimalModel(task, 'local');
        const localResult = await executeLocalTask(task, localModel);
        
        stopMotivationalSpeeches(speechInterval);
        return localResult;
        
      case 'openrouter':
        // Using OpenRouter for task processing
        console.log(chalk.blue.bold('\n☁️  Using OpenRouter Cloud Processing...\n'));
        speechInterval = startMotivationalSpeeches('general', 8000);
        
        const openRouterResult = await executeOpenRouterTask(task, decision.model);
        
        stopMotivationalSpeeches(speechInterval);
        return openRouterResult;
        
      case 'remote':
        // Consulting with senior architect for complex design decisions
        console.log(chalk.blue.bold('\n🌍 Consulting Senior Architect...\n'));
        speechInterval = startMotivationalSpeeches('general', 10000);
        
        const remoteResult = await executeRemoteTask(task, decision.model);
        
        stopMotivationalSpeeches(speechInterval);
        return remoteResult;
        
      case 'hybrid':
        // Professional development workflow with motivational speeches
        return await executeProfessionalWorkflow(task, decision);
        
      default:
        throw new Error(`Unknown approach: ${decision.approach}`);
    }
  } catch (error) {
    if (speechInterval) {
      stopMotivationalSpeeches(speechInterval);
    }
    throw error;
  }
}

/**
 * Execute the complete professional workflow
 * @param {string} task - The task to execute
 * @param {object} decision - The decision on how to process the task
 * @returns {string} - The result of the workflow execution
 */
async function executeProfessionalWorkflow(task, decision) {
  let speechInterval;
  
  try {
    console.log(chalk.blue.bold('\n🏢 Professional Development Workflow Initiated...\n'));
    
    // Step 1: Senior Developer creates architecture and specifications
    console.log(chalk.green.bold(' Phase 1: Architecture & Specifications'));
    console.log(chalk.gray('=====================================\n'));
    speechInterval = startMotivationalSpeeches('planning', 12000);
    
    const architectureSpec = await executeRemoteTask(
      `As a senior software architect, create a comprehensive architecture and specifications for this task:
       
       Task: ${task}
       
       Provide:
       1. System architecture overview
       2. Technology stack recommendations
       3. Detailed implementation specifications
       4. Code structure and organization
       5. Best practices and design patterns to apply
       6. Security considerations
       7. Performance requirements
       8. Testing strategies
       
       Be thorough and professional, as this will guide the implementation.`, 
      decision.model
    );
    
    stopMotivationalSpeeches(speechInterval);
    
    // Step 2: Code Implementation by local models or OpenRouter
    console.log(chalk.green.bold('\n Phase 2: Code Implementation'));
    console.log(chalk.gray('==========================\n'));
    speechInterval = startMotivationalSpeeches('implementation', 10000);
    
    const implementationModel = selectOptimalModel(task, 'implementation');
    
    // Use OpenRouter if it's the configured approach, otherwise use local
    let initialImplementation;
    if (decision.localModel && decision.localModel.includes('openrouter')) {
      initialImplementation = await executeOpenRouterTask(
        `You are a professional developer implementing a solution based on senior architect specifications.
         
         Architecture Specifications: ${architectureSpec}
         
         Original Task: ${task}
         
         Implement a professional, production-ready solution that follows all specifications.
         Write clean, well-documented, and maintainable code.`, 
        implementationModel
      );
    } else {
      initialImplementation = await executeLocalTask(
        `You are a professional developer implementing a solution based on senior architect specifications.
         
         Architecture Specifications: ${architectureSpec}
         
         Original Task: ${task}
         
         Implement a professional, production-ready solution that follows all specifications.
         Write clean, well-documented, and maintainable code.`, 
        implementationModel
      );
    }
    
    stopMotivationalSpeeches(speechInterval);
    
    // Step 3: Automated testing with Sprite MCP
    console.log(chalk.green.bold('\n Phase 3: Automated Testing'));
    console.log(chalk.gray('========================\n'));
    speechInterval = startMotivationalSpeeches('testing', 8000);
    
    const testResults = await runSpriteMCPTests(initialImplementation, task);
    
    stopMotivationalSpeeches(speechInterval);
    
    // Step 4: Senior Developer reviews and provides feedback
    console.log(chalk.green.bold('\n Phase 4: Code Review'));
    console.log(chalk.gray('==================\n'));
    speechInterval = startMotivationalSpeeches('review', 12000);
    
    const codeReview = await executeRemoteTask(
      `As a senior code reviewer, conduct a thorough review of this implementation:
       
       Original Task: ${task}
       Architecture Specifications: ${architectureSpec}
       Implementation: ${initialImplementation}
       Test Results: ${JSON.stringify(testResults)}
       
       Provide a professional code review covering:
       1. Code quality and maintainability
       2. Adherence to specifications
       3. Best practices and design patterns
       4. Performance optimizations
       5. Security considerations
       6. Areas for improvement
       7. Potential bugs or issues
       8. Overall quality score (1-10)
       
       Be detailed and constructive in your feedback.`, 
      decision.model
    );
    
    stopMotivationalSpeeches(speechInterval);
    
    // Step 5: Implementation improvements
    console.log(chalk.green.bold('\n Phase 5: Implementation Improvements'));
    console.log(chalk.gray('==================================\n'));
    speechInterval = startMotivationalSpeeches('improvement', 10000);
    
    const improvementModel = selectOptimalModel(task, 'improvement');
    
    // Use OpenRouter if it's the configured approach, otherwise use local
    let improvedImplementation;
    if (decision.localModel && decision.localModel.includes('openrouter')) {
      improvedImplementation = await executeOpenRouterTask(
        `You are a professional developer improving your code based on senior reviewer feedback.
         
         Original Implementation: ${initialImplementation}
         Test Results: ${JSON.stringify(testResults)}
         Code Review: ${codeReview}
         
         Implement all suggested improvements professionally.
         Show both the original code and your improvements clearly.`, 
        improvementModel
      );
    } else {
      improvedImplementation = await executeLocalTask(
        `You are a professional developer improving your code based on senior reviewer feedback.
         
         Original Implementation: ${initialImplementation}
         Test Results: ${JSON.stringify(testResults)}
         Code Review: ${codeReview}
         
         Implement all suggested improvements professionally.
         Show both the original code and your improvements clearly.`, 
        improvementModel
      );
    }
    
    stopMotivationalSpeeches(speechInterval);
    
    // Step 6: Final testing and validation
    console.log(chalk.green.bold('\n Phase 6: Final Validation'));
    console.log(chalk.gray('=======================\n'));
    speechInterval = startMotivationalSpeeches('validation', 8000);
    
    const finalTestResults = await runSpriteMCPTests(improvedImplementation, task);
    
    stopMotivationalSpeeches(speechInterval);
    
    // Completion message
    console.log(chalk.green.bold('\n✅ Professional Workflow Completed Successfully!\n'));
    speechInterval = startMotivationalSpeeches('completion', 5000);
    
    // Brief pause to show completion speech
    await new Promise(resolve => setTimeout(resolve, 6000));
    stopMotivationalSpeeches(speechInterval);
    
    return `🏢 Senior Developer Architecture & Specifications:\n${architectureSpec}\n\n\n
            ⌨️  Professional Implementation:\n${initialImplementation}\n\n\n
            🧪 Initial Test Results:\n${JSON.stringify(testResults, null, 2)}\n\n\n
            🧐 Senior Developer Code Review:\n${codeReview}\n\n\n
            ✅ Improved Implementation:\n${improvedImplementation}\n\n\n
            🏁 Final Test Results:\n${JSON.stringify(finalTestResults, null, 2)}`;
            
  } catch (error) {
    if (speechInterval) {
      stopMotivationalSpeeches(speechInterval);
    }
    throw error;
  }
}

module.exports = { executeTask };