import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  Container,
} from '@mui/material';
import ImageUploadBox from './ImageUploadBox';
import ResultBox from './ResultBox';
import HowItWorks from './HowItWorks';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// API configuration for Segmind
const API_KEY = 'SG_9be9068dab0742d3';
const API_URL = 'https://api.segmind.com/v1/try-on-diffusion';

// Create a fallback image function outside of component
const createFallbackImage = () => {
  return `https://placehold.co/600x800/e2e8f0/1e293b?text=Example+try+on`;
};

const VirtualTryOn = () => {
  const [modelImage, setModelImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleImageUpload = (image, type) => {
    if (type === 'model') {
      setModelImage(image);
    } else if (type === 'cloth') {
      setClothImage(image);
    }
    
    // Reset result when a new image is uploaded
    setResultImage(null);
    setError(null);
    setApiStatus('idle');
  };

  // Function to generate a mock response when API fails
  const generateMockResponse = () => {
    return createFallbackImage();
  };

  const handleGenerateResult = async () => {
    if (!modelImage || !clothImage) {
      setError('Please upload both model and cloth images.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setApiStatus('loading');
    
    try {
      setSnackbarMessage('Generating virtual try-on...');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      
      // Extract base64 data from the data URLs
      const modelBase64 = modelImage.split(',')[1];
      const clothBase64 = clothImage.split(',')[1];
      
      // Prepare the request payload
      const requestData = {
        model_image: modelBase64,
        cloth_image: clothBase64,
        num_inference_steps: 35,
        guidance_scale: 2,
        seed: Math.floor(Math.random() * 1000000),
        base64: true
      };
      
      console.log('Sending request to API...');
      
      // Make the API request
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(requestData)
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      // Handle JSON response
      const data = await response.json();
      console.log('API response data:', data);
      
      let resultImageData;
      if (data && data.output) {
        resultImageData = `data:image/jpeg;base64,${data.output}`;
      } else if (data && data.image) {
        resultImageData = `data:image/jpeg;base64,${data.image}`;
      } else if (data && data.images && data.images.length > 0) {
        resultImageData = `data:image/jpeg;base64,${data.images[0]}`;
      } else {
        throw new Error('Invalid response format from API');
      }
      
      setResultImage(resultImageData);
      setSnackbarMessage('Virtual try-on generated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setApiStatus('success');
      setIsLoading(false);
      
    } catch (err) {
      console.error('API Error:', err);
      setSnackbarMessage('API error. Using example image.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      
      const mockImageUrl = generateMockResponse();
      
      try {
        if (mockImageUrl.startsWith('data:')) {
          setResultImage(mockImageUrl);
        } else {
          fetch(mockImageUrl)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                setResultImage(reader.result);
                setIsLoading(false);
                setApiStatus('success');
              };
              reader.readAsDataURL(blob);
            });
        }
      } catch (mockError) {
        console.error('Mock image generation failed:', mockError);
        setError('Unable to generate any result. Please try again later.');
        setApiStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDownloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'virtual-tryon-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShareResult = () => {
    if (resultImage && navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'My Virtual Try-On Result',
        text: 'Check out my virtual try-on result!',
        url: resultImage,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported in your browser. You can download the image instead.');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: isMobile ? '2rem' : '2.5rem'
          }}
        >
          Virtual Cloth Try-On
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
          Upload a model image and a cloth image to see how the clothing would look on the model.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
      </Box>
      
      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ImageUploadBox 
            title="Upload Model Image"
            description="Upload a full-body image of a person standing in a neutral pose."
            onImageUpload={(image) => handleImageUpload(image, 'model')}
            boxType="model"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ImageUploadBox 
            title="Upload Cloth Image"
            description="Upload an image of the clothing item you want to try on."
            onImageUpload={(image) => handleImageUpload(image, 'cloth')}
            boxType="cloth"
          />
        </Grid>
        
        <Grid item xs={12} md={4} lg={4}>
          <ResultBox 
            resultImage={resultImage} 
            isLoading={isLoading}
            error={error}
            apiStatus={apiStatus}
            onDownload={handleDownloadResult}
            onShare={handleShareResult}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!modelImage || !clothImage || isLoading}
          onClick={handleGenerateResult}
          startIcon={<AutoAwesomeIcon />}
          sx={{ 
            py: 2, 
            px: 6,
            fontSize: '1.2rem',
            borderRadius: 2,
            minWidth: 250
          }}
        >
          Generate Try-On
        </Button>
      </Box>
      
      <Box sx={{ mt: 4 }} id="how-it-works">
        <HowItWorks onClose={() => {}} />
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VirtualTryOn; 