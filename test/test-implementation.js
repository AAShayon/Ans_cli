const TestSpriteMCP = require('../src/testing/testsprite-mcp');

async function testTestSpriteMCP() {
  console.log('Testing TestSpriteMCP implementation...');
  
  const testSprite = new TestSpriteMCP();
  
  // Test with JavaScript code
  const jsCode = `
function add(a, b) {
  return a + b;
}

console.log('Hello, world!');
`;
  
  const jsResult = await testSprite.runTests(jsCode, 'Create a function that adds two numbers', 'javascript');
  console.log('JavaScript Test Results:', JSON.stringify(jsResult, null, 2));
  
  // Test with Python code
  const pythonCode = `
def add(a, b):
    return a + b

print('Hello, world!')
`;
  
  const pythonResult = await testSprite.runTests(pythonCode, 'Create a function that adds two numbers', 'python');
  console.log('Python Test Results:', JSON.stringify(pythonResult, null, 2));
  
  console.log('TestSpriteMCP implementation test completed!');
}

testTestSpriteMCP().catch(console.error);