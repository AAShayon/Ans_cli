const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Validate code using various methods
 * @param {string} code - The code to validate
 * @param {string} language - The programming language
 * @returns {object} - Validation results
 */
async function validateCode(code, language) {
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
        return await validateJavaScript(code);
      case 'python':
        return await validatePython(code);
      case 'java':
        return await validateJava(code);
      default:
        return {
          valid: true,
          message: 'Language validation not implemented',
          suggestions: []
        };
    }
  } catch (error) {
    return {
      valid: false,
      message: `Validation error: ${error.message}`,
      suggestions: ['Check syntax and formatting']
    };
  }
}

/**
 * Validate JavaScript code
 * @param {string} code - JavaScript code to validate
 * @returns {object} - Validation results
 */
async function validateJavaScript(code) {
  try {
    // Basic syntax check using Node.js
    const tempFile = `/tmp/validation_${Date.now()}.js`;
    require('fs').writeFileSync(tempFile, code);
    
    // Try to parse the code
    const result = await execPromise(`node -c ${tempFile}`);
    
    // Clean up
    require('fs').unlinkSync(tempFile);
    
    return {
      valid: true,
      message: 'JavaScript syntax is valid',
      suggestions: []
    };
  } catch (error) {
    return {
      valid: false,
      message: `JavaScript syntax error: ${error.message}`,
      suggestions: ['Check syntax and formatting']
    };
  }
}

/**
 * Validate Python code
 * @param {string} code - Python code to validate
 * @returns {object} - Validation results
 */
async function validatePython(code) {
  try {
    // Basic syntax check using Python
    const tempFile = `/tmp/validation_${Date.now()}.py`;
    require('fs').writeFileSync(tempFile, code);
    
    // Try to compile the code
    const result = await execPromise(`python3 -m py_compile ${tempFile}`);
    
    // Clean up
    require('fs').unlinkSync(tempFile);
    
    return {
      valid: true,
      message: 'Python syntax is valid',
      suggestions: []
    };
  } catch (error) {
    return {
      valid: false,
      message: `Python syntax error: ${error.message}`,
      suggestions: ['Check syntax and formatting']
    };
  }
}

/**
 * Validate Java code
 * @param {string} code - Java code to validate
 * @returns {object} - Validation results
 */
async function validateJava(code) {
  try {
    // Basic syntax check using Java compiler
    const tempFile = `/tmp/Validation_${Date.now()}.java`;
    require('fs').writeFileSync(tempFile, code);
    
    // Try to compile the code
    const result = await execPromise(`javac ${tempFile}`);
    
    // Clean up
    require('fs').unlinkSync(tempFile);
    
    return {
      valid: true,
      message: 'Java syntax is valid',
      suggestions: []
    };
  } catch (error) {
    return {
      valid: false,
      message: `Java syntax error: ${error.message}`,
      suggestions: ['Check syntax and formatting']
    };
  }
}

module.exports = { validateCode };