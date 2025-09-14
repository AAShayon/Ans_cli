const { executeLocalTask } = require('../local-ai/ollama-client');
const { executeRemoteTask } = require('../remote-ai/gemini-client');
const { selectOptimalModel } = require('../local-ai/model-selector');
const { runSpriteMCPTests } = require('../testing/sprite-mcp');

/**
 * Execute a task using the professional senior developer workflow
 * @param {string} task - The task to execute
 * @param {object} decision - The decision on how to process the task
 * @returns {string} - The result of the task execution
 */
async function executeTask(task, decision) {
  switch (decision.approach) {
    case 'local':
      // Senior developer working independently on simple tasks
      const localModel = selectOptimalModel(task, 'local');
      return await executeLocalTask(task, localModel);
      
    case 'remote':
      // Consulting with senior architect for complex design decisions
      return await executeRemoteTask(task, decision.model);
      
    case 'hybrid':
      // Professional development workflow:
      // 1. Senior Developer (Gemini/Qwen) creates architecture and specifications
      // 2. Code Implementation by local models (selected based on task)
      // 3. Automated testing with Sprite MCP
      // 4. Senior Developer reviews and provides feedback
      // 5. Implementation improvements
      // 6. Final testing and validation
      
      console.log("👨‍💻 Senior Developer is creating architecture and specifications...");
      
      // Step 1: Senior Developer creates architecture and specifications
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
      
      console.log("⌨️  Code Implementation in progress...");
      
      // Step 2: Code Implementation by local models (selected based on task)
      const implementationModel = selectOptimalModel(task, 'implementation');
      const initialImplementation = await executeLocalTask(
        `You are a professional developer implementing a solution based on senior architect specifications.
         
         Architecture Specifications: ${architectureSpec}
         
         Original Task: ${task}
         
         Implement a professional, production-ready solution that follows all specifications.
         Write clean, well-documented, and maintainable code.`, 
        implementationModel
      );
      
      console.log("🧪 Running automated tests with Sprite MCP...");
      
      // Step 3: Automated testing with Sprite MCP
      const testResults = await runSpriteMCPTests(initialImplementation, task);
      
      console.log("🧐 Senior Developer is reviewing code and test results...");
      
      // Step 4: Senior Developer reviews and provides feedback
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
      
      console.log("🔧 Implementing improvements based on review...");
      
      // Step 5: Implementation improvements
      const improvementModel = selectOptimalModel(task, 'improvement');
      const improvedImplementation = await executeLocalTask(
        `You are a professional developer improving your code based on senior reviewer feedback.
         
         Original Implementation: ${initialImplementation}
         Test Results: ${JSON.stringify(testResults)}
         Code Review: ${codeReview}
         
         Implement all suggested improvements professionally.
         Show both the original code and your improvements clearly.`, 
        improvementModel
      );
      
      console.log("🏁 Final testing and validation...");
      
      // Step 6: Final testing and validation
      const finalTestResults = await runSpriteMCPTests(improvedImplementation, task);
      
      return `🏢 Senior Developer Architecture & Specifications:
${architectureSpec}

              
              ⌨️  Professional Implementation:
${initialImplementation}

              
              🧪 Initial Test Results:
${JSON.stringify(testResults, null, 2)}

              
              🧐 Senior Developer Code Review:
${codeReview}

              
              ✅ Improved Implementation:
${improvedImplementation}

              
              🏁 Final Test Results:
${JSON.stringify(finalTestResults, null, 2)}`;
      
    default:
      throw new Error(\`Unknown approach: \${decision.approach}\`);
  }
}

module.exports = { executeTask };