// Configuration file for environment variables
const config = {
  // API configuration
  api: {
    key: process.env.REACT_APP_API_KEY || '',
    url: process.env.REACT_APP_API_URL || '',
  },
  
  // Environment
  environment: process.env.REACT_APP_ENV || 'development',
  
  // Feature flags
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  }
};

export default config; 