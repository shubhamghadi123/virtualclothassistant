import axios from 'axios';

// Base URL for the automation server
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Service for communicating with the automation server
 */
const automationService = {
  /**
   * Sends model and cloth images to the automation server for virtual try-on
   * @param {string} modelImage - Base64 encoded model image
   * @param {string} clothImage - Base64 encoded cloth image
   * @returns {Promise<string>} - Base64 encoded result image
   */
  async virtualTryOn(modelImage, clothImage) {
    try {
      console.log('Sending virtual try-on request to automation server...');
      
      const response = await axios.post(`${API_BASE_URL}/virtual-try-on`, {
        modelImage,
        clothImage
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 300000 // 5 minutes timeout
      });
      
      if (response.data && response.data.success && response.data.resultImage) {
        console.log('Received successful response from automation server');
        return response.data.resultImage;
      } else {
        console.error('Invalid response from automation server:', response.data);
        throw new Error('Invalid response from automation server');
      }
    } catch (error) {
      console.error('Error during virtual try-on request:', error);
      throw error;
    }
  },
  
  /**
   * Checks if the automation server is running
   * @returns {Promise<boolean>} - True if the server is running
   */
  async isServerRunning() {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: 5000 // 5 seconds timeout
      });
      
      return response.data && response.data.status === 'ok';
    } catch (error) {
      console.error('Automation server is not running:', error);
      return false;
    }
  }
};

export default automationService; 