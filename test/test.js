const { exec } = require('child_process');
const path = require('path');

// Simple test to verify the CLI tool works
console.log('Running basic tests for hybrid-ai CLI...');

// Test 1: Check if the CLI tool is executable
exec('hybrid-ai --help', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing hybrid-ai --help: ${error}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    process.exit(1);
  }
  
  console.log('Test 1 passed: hybrid-ai --help executed successfully');
  console.log(stdout);
  
  // Test 2: Check version
  exec('hybrid-ai --version', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing hybrid-ai --version: ${error}`);
      process.exit(1);
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      process.exit(1);
    }
    
    console.log('Test 2 passed: hybrid-ai --version executed successfully');
    console.log(stdout);
    
    console.log('All tests passed!');
  });
});