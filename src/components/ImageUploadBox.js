import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  useTheme,
  Fade,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploadBox = ({ title, description, onImageUpload, boxType }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const boxRef = useRef(null);
  const theme = useTheme();

  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setIsLoading(true);
      
      const file = acceptedFiles[0];
      try {
        const imageDataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });

        setImage(imageDataUrl);
        onImageUpload(imageDataUrl, boxType);
      } catch (error) {
        console.error('Image processing error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onImageUpload, boxType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleRemoveImage = () => {
    setImage(null);
    onImageUpload(null, boxType);
  };

  const borderColor = boxType === 'model' ? theme.palette.primary.main : theme.palette.secondary.main;

  return (
    <Paper 
      ref={boxRef}
      elevation={3} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        p: 3, 
        borderTop: `4px solid ${borderColor}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-5px)',
          borderColor: boxType === 'model' ? theme.palette.primary.dark : theme.palette.secondary.dark
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '5px',
          background: borderColor,
          transform: 'scaleX(0.97)',
          transition: 'transform 0.3s ease',
        },
        '&:hover::before': {
          transform: 'scaleX(1)',
        }
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: borderColor,
            position: 'relative',
            display: 'inline-block',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: isHovered || image ? '100%' : '40px',
              height: '2px',
              backgroundColor: borderColor,
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 1 }}
        >
          {description}
        </Typography>
      </Box>
      
      {!image ? (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? borderColor : 'divider',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            minHeight: 350,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: isDragActive ? `${borderColor}10` : 'transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: `${borderColor}05`,
              borderColor: borderColor,
              '& .upload-icon': {
                transform: 'scale(1.05) rotate(5deg)',
                boxShadow: `0 6px 20px ${borderColor}30`,
              },
              '& .upload-title': {
                color: borderColor
              }
            }
          }}
        >
          <input {...getInputProps()} />
          
          <Box 
            className="upload-icon"
            sx={{ 
              width: 70,
              height: 70,
              backgroundColor: `${borderColor}10`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              color: borderColor,
              transition: 'all 0.2s ease',
              boxShadow: `0 4px 15px ${borderColor}20`,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 40 }} />
          </Box>
          
          <Typography 
            className="upload-title"
            variant="body1" 
            gutterBottom
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              transition: 'color 0.2s ease',
            }}
          >
            Drag & drop an image here, or click to select
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{
              color: 'text.secondary',
              backgroundColor: 'background.default',
              padding: '4px 8px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '0.85rem'
            }}
          >
            Supports: JPG, PNG, WEBP (max 10MB)
          </Typography>
          
          {isDragActive && (
            <Typography variant="body2" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
              Drop the image here...
            </Typography>
          )}
        </Box>
      ) : (
        <Box 
          sx={{ 
            position: 'relative', 
            minHeight: 350,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mb: image ? 2 : 0
          }}
        >
          <img 
            src={image} 
            alt={`Uploaded ${boxType}`} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '350px',
              objectFit: 'contain',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }} 
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          />
        </Box>
      )}
      
      <Fade in={Boolean(image)}>
        <Stack 
          direction="row" 
          spacing={1} 
          justifyContent="center"
          sx={{ 
            visibility: image ? 'visible' : 'hidden',
            height: image ? 'auto' : 0,
            opacity: image ? 1 : 0
          }}
        >
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveImage}
            sx={{
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }
            }}
          >
            Remove
          </Button>
        </Stack>
      </Fade>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Processing image...
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ImageUploadBox; 