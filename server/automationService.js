const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

// URL of the Hugging Face space
const HF_SPACE_URL = 'https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On';

/**
 * Uploads images to the Hugging Face space and retrieves the result
 * @param {string} modelImagePath - Path to the model image
 * @param {string} clothImagePath - Path to the cloth image
 * @returns {Promise<string>} - Base64 encoded result image
 */
async function runVirtualTryOn(modelImagePath, clothImagePath) {
  console.log('Starting browser automation...');
  console.log(`Model image: ${modelImagePath}`);
  console.log(`Cloth image: ${clothImagePath}`);

  // Launch browser in headless mode
  const browser = await chromium.launch({
    headless: true, // Set to false for debugging
  });

  try {
    // Create a new browser context
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    // Create a new page
    const page = await context.newPage();
    
    // Navigate to the Hugging Face space
    console.log('Navigating to Hugging Face space...');
    await page.goto(HF_SPACE_URL, { waitUntil: 'networkidle' });
    
    // Wait for the page to load completely
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for the file upload buttons to be available
    console.log('Waiting for file upload elements...');
    await page.waitForSelector('input[type="file"]', { state: 'attached', timeout: 30000 });
    
    // Get all file inputs
    const fileInputs = await page.$$('input[type="file"]');
    
    if (fileInputs.length < 2) {
      throw new Error('Could not find enough file upload inputs on the page');
    }
    
    // Upload model image to the first file input
    console.log('Uploading model image...');
    await fileInputs[0].setInputFiles(modelImagePath);
    
    // Upload cloth image to the second file input
    console.log('Uploading cloth image...');
    await fileInputs[1].setInputFiles(clothImagePath);
    
    // Find and click the submit/run button
    console.log('Clicking submit button...');
    
    // Look for buttons with text like "Run", "Submit", "Generate", etc.
    const submitButtonSelectors = [
      'button:has-text("Run")', 
      'button:has-text("Submit")', 
      'button:has-text("Generate")',
      'button.primary',
      'button[type="submit"]'
    ];
    
    let submitButton = null;
    for (const selector of submitButtonSelectors) {
      submitButton = await page.$(selector);
      if (submitButton) {
        console.log(`Found submit button with selector: ${selector}`);
        break;
      }
    }
    
    if (!submitButton) {
      throw new Error('Could not find submit button on the page');
    }
    
    await submitButton.click();
    
    // Wait for the result to be generated
    console.log('Waiting for result to be generated...');
    
    // Look for result image - this selector might need adjustment based on the actual page structure
    await page.waitForSelector('img.output-image, .output-container img, .result-container img', { 
      state: 'visible',
      timeout: 120000 // 2 minutes timeout for generation
    });
    
    // Get the result image
    console.log('Getting result image...');
    const resultImage = await page.$('img.output-image, .output-container img, .result-container img');
    
    if (!resultImage) {
      throw new Error('Could not find result image on the page');
    }
    
    // Take a screenshot of the result image
    const screenshotBuffer = await resultImage.screenshot();
    const base64Image = screenshotBuffer.toString('base64');
    
    console.log('Successfully retrieved result image');
    
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error during browser automation:', error);
    throw error;
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed');
  }
}

/**
 * Saves a base64 image to a temporary file
 * @param {string} base64Image - Base64 encoded image data
 * @returns {string} - Path to the saved file
 */
function saveBase64ImageToTemp(base64Image) {
  // Remove data URL prefix if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  
  // Create a buffer from the base64 data
  const imageBuffer = Buffer.from(base64Data, 'base64');
  
  // Create a temporary file path
  const tempFilePath = path.join(os.tmpdir(), `temp-${Date.now()}.png`);
  
  // Write the buffer to the file
  fs.writeFileSync(tempFilePath, imageBuffer);
  
  return tempFilePath;
}

module.exports = {
  runVirtualTryOn,
  saveBase64ImageToTemp
}; 