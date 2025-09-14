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
      // Student working independently on simple tasks
      return await executeLocalTask(task, decision.model);
      
    case 'remote':
      // Consulting the professor directly for complex questions
      return await executeRemoteTask(task, decision.model);
      
    case 'hybrid':
      // Professor-student collaboration model:
      // 1. Professor provides detailed instructions (remote AI creates precise plan)
      // 2. Student executes the plan (local AI implements the instructions)
      
      // Step 1: Ask the professor for expert guidance
      const professorsInstructions = await executeRemoteTask(
        `As an expert professor, provide precise, step-by-step instructions to accomplish this task. 
         Be extremely specific and detailed, as if you're teaching a student exactly what to do. 
         Task: ${task}
         
         Format your response as a clear, actionable plan with specific steps.`,
        decision.model
      );
      
      // Step 2: Student executes the professor's instructions
      const studentsWork = await executeLocalTask(
        `You are a diligent student following your professor's expert instructions. 
         Execute this precise plan step by step:
         
         Professor's Instructions: ${professorsInstructions}
         
         Original Task: ${task}
         
         Show your work clearly and follow the professor's guidance exactly.`,
        decision.localModel
      );
      
      return `Professor's Guidance:
${professorsInstructions}

Student's Execution:
${studentsWork}`;
      
    default:
      throw new Error(`Unknown approach: ${decision.approach}`);
  }
}

module.exports = { executeTask };