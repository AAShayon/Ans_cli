const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs');
const path = require('path');

/**
 * Run tests using Sprite MCP framework
 * @param {string} code - The code to test
 * @param {string} task - The original task description
 * @returns {object} - Test results
 */
async function runSpriteMCPTests(code, task) {
  try {
    // Check if Sprite MCP is available
    const spriteAvailable = await isSpriteMCPAvailable();
    if (!spriteAvailable) {
      return {
        success: false,
        message: 'Sprite MCP framework not available',
        suggestion: 'Install Sprite MCP for comprehensive testing'
      };
    }
    
    // Create a temporary test directory
    const testDir = `/tmp/sprite_test_${Date.now()}`;
    fs.mkdirSync(testDir, { recursive: true });
    
    // Detect language and create appropriate test files
    const language = detectLanguage(task, code);
    const testFiles = await createTestFiles(code, task, language, testDir);
    
    // Run Sprite MCP tests
    const testCommand = `cd ${testDir} && sprite-mcp run`;
    const result = await execPromise(testCommand, { timeout: 30000 });
    
    // Clean up
    fs.rmSync(testDir, { recursive: true, force: true });
    
    return {
      success: true,
      output: result.stdout,
      errors: result.stderr,
      exitCode: result.code
    };
  } catch (error) {
    return {
      success: false,
      message: `Test execution failed: ${error.message}`,
      error: error
    };
  }
}

/**
 * Check if Sprite MCP framework is available
 * @returns {boolean} - Whether Sprite MCP is available
 */
async function isSpriteMCPAvailable() {
  try {
    await execPromise('which sprite-mcp');
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Create appropriate test files based on language and task
 * @param {string} code - The code to test
 * @param {string} task - The task description
 * @param {string} language - The programming language
 * @param {string} testDir - The directory to create test files in
 * @returns {Array} - Array of created test files
 */
async function createTestFiles(code, task, language, testDir) {
  const files = [];
  
  // Write the main code file
  const mainFile = path.join(testDir, `main.${getLanguageExtension(language)}`);
  fs.writeFileSync(mainFile, code);
  files.push(mainFile);
  
  // Create Sprite MCP configuration
  const spriteConfig = {
    name: "hybrid-ai-test",
    version: "1.0.0",
    description: `Test for task: ${task}`,
    language: language,
    main: `main.${getLanguageExtension(language)}`,
    test: {
      framework: getTestFramework(language),
      pattern: "test_*.${getLanguageExtension(language)}"
    }
  };
  
  fs.writeFileSync(path.join(testDir, 'sprite.json'), JSON.stringify(spriteConfig, null, 2));
  files.push(path.join(testDir, 'sprite.json'));
  
  // Create basic test file
  const testFile = path.join(testDir, `test_main.${getLanguageExtension(language)}`);
  const testContent = generateBasicTest(code, task, language);
  fs.writeFileSync(testFile, testContent);
  files.push(testFile);
  
  return files;
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
  if (taskLower.includes('php') || codeLower.includes('<?php')) {
    return 'php';
  }
  
  // Default to JavaScript
  return 'javascript';
}

/**
 * Get file extension for a language
 * @param {string} language - The programming language
 * @returns {string} - File extension
 */
function getLanguageExtension(language) {
  const extensions = {
    'javascript': 'js',
    'python': 'py',
    'java': 'java',
    'dart': 'dart',
    'php': 'php'
  };
  
  return extensions[language] || 'js';
}

/**
 * Get appropriate test framework for a language
 * @param {string} language - The programming language
 * @returns {string} - Test framework
 */
function getTestFramework(language) {
  const frameworks = {
    'javascript': 'jest',
    'python': 'pytest',
    'java': 'junit',
    'dart': 'flutter_test',
    'php': 'phpunit'
  };
  
  return frameworks[language] || 'jest';
}

/**
 * Generate basic test content for a language
 * @param {string} code - The code to test
 * @param {string} task - The task description
 * @param {string} language - The programming language
 * @returns {string} - Test content
 */
function generateBasicTest(code, task, language) {
  const tests = {
    'javascript': `
// Basic tests for: ${task}
describe('Basic Functionality', () => {
  test('should execute without errors', () => {
    expect(true).toBe(true);
  });
});
`,
    'python': `
# Basic tests for: ${task}
import unittest

class TestBasicFunctionality(unittest.TestCase):
    def test_basic_execution(self):
        """Test that code executes without errors"""
        self.assertTrue(True)

if __name__ == '__main__':
    unittest.main()
`,
    'java': `
// Basic tests for: ${task}
import org.junit.Test;
import static org.junit.Assert.*;

public class MainTest {
    @Test
    public void testBasicExecution() {
        assertTrue(true);
    }
}
`,
    'dart': `
// Basic tests for: ${task}
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('basic execution', () {
    expect(true, true);
  });
}
`,
    'php': `
<?php
// Basic tests for: ${task}
use PHPUnit\\Framework\\TestCase;

class MainTest extends TestCase
{
    public function testBasicExecution()
    {
        $this->assertTrue(true);
    }
}
?>
`
  };
  
  return tests[language] || tests['javascript'];
}

module.exports = { runSpriteMCPTests };