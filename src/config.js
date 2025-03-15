// Configuration file for environment variables
const config = {
  // API configuration
  api: {
    key: process.env.REACT_APP_API_KEY || '',
    url: process.env.REACT_APP_API_URL || 'https://api.segmind.com/v1/try-on-diffusion',
    fallbackEnabled: true,
    debug: process.env.NODE_ENV === 'development',
  },
  
  // Environment
  environment: process.env.REACT_APP_ENV || 'development',
  
  // Feature flags
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  }
};

// Log configuration in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Config loaded:', {
    environment: config.environment,
    apiConfigured: !!config.api.key,
    apiUrl: config.api.url,
  });
}

export default config; 