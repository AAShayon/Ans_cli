const { executeLocalTask } = require('../local-ai/ollama-client');
const { executeRemoteTask } = require('../remote-ai/gemini-client');
const { validateCode } = require('../utils/code-validator');

/**
 * Execute a task using the advanced professor-student-mentor workflow
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
      // Direct consultation with professor for theoretical questions
      return await executeRemoteTask(task, decision.model);
      
    case 'hybrid':
      // Advanced professor-student-mentor workflow:
      // 1. Professor creates detailed plan and instructions
      // 2. Student implements the code
      // 3. Automated testing and validation
      // 4. Mentor evaluates code quality
      // 5. Professor provides targeted feedback
      // 6. Student implements improvements
      
      console.log("🎓 Professor is creating a detailed plan...");
      
      // Step 1: Professor creates plan and instructions
      const professorsPlan = await executeRemoteTask(
        `As an expert professor, create a comprehensive plan for this task:
         
         Task: ${task}
         
         Provide:
         1. Implementation approach and architecture
         2. Detailed step-by-step coding instructions
         3. Best practices and design patterns to follow
         4. Common pitfalls and how to avoid them
         5. Expected outcomes and success criteria
         
         Be extremely thorough and specific, as if you're mentoring a student through the entire process.`,
        decision.model
      );
      
      console.log("👨‍🎓 Student is implementing the solution...");
      
      // Step 2: Student implements the code based on professor's instructions
      const studentsImplementation = await executeLocalTask(
        `You are a diligent student following your professor's comprehensive plan. 
         Implement this solution step by step:
         
         Professor's Plan: ${professorsPlan}
         
         Original Task: ${task}
         
         Write clean, well-structured code that follows the professor's guidance exactly.
         Include comments explaining your implementation decisions.`,
        decision.localModel
      );
      
      console.log("🧪 Running automated tests...");
      
      // Step 3: Automated testing and validation
      // Extract language from task or implementation
      const language = detectLanguage(task, studentsImplementation);
      const validationResults = await validateCode(studentsImplementation, language);
      
      console.log("📊 Mentor is evaluating the code...");
      
      // Step 4: Mentor evaluates the code quality
      const codeEvaluation = await executeRemoteTask(
        `As a code mentor, conduct a thorough evaluation of this implementation:
         
         Original Task: ${task}
         Professor's Plan: ${professorsPlan}
         Student's Implementation: ${studentsImplementation}
         Automated Validation Results: ${JSON.stringify(validationResults)}
         
         Provide a comprehensive evaluation covering:
         1. Code correctness and functionality
         2. Adherence to best practices and design patterns
         3. Code readability and maintainability
         4. Performance considerations
         5. Security implications
         6. Areas for improvement
         7. Potential bugs or issues
         8. Overall quality score (1-10)
         
         Be specific, constructive, and detailed in your feedback.`,
        decision.model
      );
      
      console.log("🔍 Professor is analyzing results and providing feedback...");
      
      // Step 5: Professor analyzes evaluation and provides improvement instructions
      const improvementInstructions = await executeRemoteTask(
        `As an expert professor, analyze this code evaluation and provide targeted improvement instructions:
         
         Student's Implementation: ${studentsImplementation}
         Automated Validation Results: ${JSON.stringify(validationResults)}
         Mentor's Evaluation: ${codeEvaluation}
         
         Provide detailed, actionable instructions on how to:
         1. Fix identified issues and bugs
         2. Improve code quality and maintainability
         3. Optimize performance
         4. Enhance security
         5. Follow better practices and patterns
         6. Meet the original task requirements more effectively
         
         Prioritize the most critical improvements first.
         Be extremely specific about what changes to make, where to make them, and why.`,
        decision.model
      );
      
      console.log("🛠 Student is implementing improvements...");
      
      // Step 6: Student implements improvements based on professor's feedback
      const improvedImplementation = await executeLocalTask(
        `You are a student improving your code based on detailed feedback from your professor.
         
         Original Implementation: ${studentsImplementation}
         Automated Validation Results: ${JSON.stringify(validationResults)}
         Mentor's Evaluation: ${codeEvaluation}
         Professor's Improvement Instructions: ${improvementInstructions}
         
         Implement all the suggested improvements precisely.
         Show both the original code and your improvements clearly.
         Explain your reasoning for each change.`,
        decision.localModel
      );
      
      // Step 7: Final validation of improved code
      const finalValidation = await validateCode(improvedImplementation, language);
      
      return `🎓 Professor's Comprehensive Plan:\\n${professorsPlan}\\n\\n\\n              👨‍🎓 Student's Initial Implementation:\\n${studentsImplementation}\\n\\n\\n              🧪 Automated Validation Results:\\n${JSON.stringify(validationResults, null, 2)}\\n\\n\\n              📊 Mentor's Detailed Evaluation:\\n${codeEvaluation}\\n\\n\\n              🔍 Professor's Targeted Improvement Instructions:\\n${improvementInstructions}\\n\\n\\n              ✅ Student's Final Improved Implementation:\\n${improvedImplementation}\\n\\n\\n              🏁 Final Validation:\\n${JSON.stringify(finalValidation, null, 2)}`;
      
    default:
      throw new Error(`Unknown approach: ${decision.approach}`);
  }
}

/**
 * Detect programming language from task or code
 * @param {string} task - The task description
 * @param {string} code - The code implementation
 * @returns {string} - Detected programming language
 */
function detectLanguage(task, code) {
  const taskLower = task.toLowerCase();
  const codeLower = code.toLowerCase();
  
  // Check task for language hints
  if (taskLower.includes('javascript') || taskLower.includes('js') || codeLower.includes('function')) {
    return 'javascript';
  }
  if (taskLower.includes('python') || taskLower.includes('py') || codeLower.includes('def ')) {
    return 'python';
  }
  if (taskLower.includes('java') || codeLower.includes('public class')) {
    return 'java';
  }
  if (taskLower.includes('flutter') || taskLower.includes('dart') || codeLower.includes('widget')) {
    return 'dart';
  }
  
  // Default to JavaScript
  return 'javascript';
}

module.exports = { executeTask };