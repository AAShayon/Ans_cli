const { executeLocalTask } = require('../local-ai/ollama-client');
const { executeRemoteTask } = require('../remote-ai/gemini-client');

/**
 * Execute a task based on the decision
 * @param {string} task - The task to execute
 * @param {object} decision - The decision on how to process the task
 * @returns {string} - The result of the task execution
 */
async function executeTask(task, decision) {
  switch (decision.approach) {
    case 'local':
      return await executeLocalTask(task, decision.model);
      
    case 'remote':
      return await executeRemoteTask(task, decision.model);
      
    case 'hybrid':
      // For hybrid approach:
      // 1. Get plan from remote AI
      // 2. Execute plan locally
      const plan = await executeRemoteTask(
        `Create a detailed step-by-step plan to accomplish this task: ${task}. Provide only the plan without implementation.`, 
        decision.model
      );
      
      // 2. Execute the plan locally
      const result = await executeLocalTask(
        `Follow this plan to accomplish the original task. Plan: ${plan}. Original task: ${task}`, 
        decision.localModel
      );
      
      return result;
      
    default:
      throw new Error(`Unknown approach: ${decision.approach}`);
  }
}

module.exports = { executeTask };