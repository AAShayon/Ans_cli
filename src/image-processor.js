const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { executeOpenRouterTask } = require('./openrouter-client');

/**
 * Process an image file and extract information using OpenRouter vision models
 * @param {string} imagePath - Path to the image file
 * @param {string} task - Task description
 * @returns {string} - Extracted information from the image
 */
async function processImage(imagePath, task) {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }
    
    // Read and encode the image
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Get the file extension to determine MIME type
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') {
      mimeType = 'image/png';
    } else if (ext === '.gif') {
      mimeType = 'image/gif';
    } else if (ext === '.webp') {
      mimeType = 'image/webp';
    }
    
    // Find a vision model
    const visionModel = config.openrouterAI.availableModels.find(model => 
      model.includes('vision') || model.includes('image') || model.includes('llava')
    ) || 'microsoft/phi-3-mini-128k-instruct';
    
    // Create the prompt with image
    const prompt = `Analyze this image and ${task}. Provide detailed information about what you see.`;
    
    // Call OpenRouter with the image
    const result = await executeOpenRouterTaskWithImage(prompt, visionModel, base64Image, mimeType);
    
    return result;
  } catch (error) {
    throw new Error(`Image processing error: ${error.message}`);
  }
}

/**
 * Execute a task using OpenRouter AI with image input
 * @param {string} task - The task to execute
 * @param {string} model - The model to use
 * @param {string} base64Image - Base64 encoded image
 * @param {string} mimeType - MIME type of the image
 * @returns {string} - The result from OpenRouter
 */
async function executeOpenRouterTaskWithImage(task, model, base64Image, mimeType) {
  try {
    const response = await axios.post(
      `${config.openrouter.baseUrl}/chat/completions`,
      {
        model: model,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: task
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${config.openrouter.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/AAShayon/Ans_cli',
          'X-Title': 'Hybrid AI CLI Tool'
        }
      }
    );
    
    return response.data.choices[0].message.content || 'No response from OpenRouter';
  } catch (error) {
    if (error.response) {
      throw new Error(`OpenRouter API error: ${error.response.data.error.message}`);
    } else {
      throw new Error(`OpenRouter API error: ${error.message}`);
    }
  }
}

/**
 * Check if any vision models are available
 * @returns {boolean} - Whether vision models are available
 */
async function areVisionModelsAvailable() {
  return config.openrouterAI.availableModels.some(model => 
    model.includes('vision') || model.includes('image') || model.includes('llava')
  );
}

module.exports = { processImage, areVisionModelsAvailable };