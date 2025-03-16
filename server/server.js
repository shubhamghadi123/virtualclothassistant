const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { runVirtualTryOn, saveBase64ImageToTemp } = require('./automationService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Endpoint for virtual try-on
app.post('/api/virtual-try-on', async (req, res) => {
  try {
    console.log('Received virtual try-on request');
    
    const { modelImage, clothImage } = req.body;
    
    if (!modelImage || !clothImage) {
      return res.status(400).json({ error: 'Both model and cloth images are required' });
    }
    
    // Save base64 images to temporary files
    console.log('Saving images to temporary files...');
    const modelImagePath = saveBase64ImageToTemp(modelImage);
    const clothImagePath = saveBase64ImageToTemp(clothImage);
    
    console.log('Starting virtual try-on process...');
    // Run the virtual try-on process
    const resultImage = await runVirtualTryOn(modelImagePath, clothImagePath);
    
    // Clean up temporary files
    console.log('Cleaning up temporary files...');
    fs.unlinkSync(modelImagePath);
    fs.unlinkSync(clothImagePath);
    
    // Return the result
    return res.json({ 
      success: true, 
      resultImage 
    });
  } catch (error) {
    console.error('Error processing virtual try-on:', error);
    return res.status(500).json({ 
      error: 'Failed to process virtual try-on', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Virtual try-on API available at http://localhost:${PORT}/api/virtual-try-on`);
});

module.exports = app; 