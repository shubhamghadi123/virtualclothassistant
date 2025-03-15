import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  useTheme,
  Chip,
  Fade,
  Zoom,
  Stack
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ResultBox = ({ resultImage, isLoading, error, apiStatus = 'idle', onDownload, onShare }) => {
  const theme = useTheme();
  const borderColor = theme.palette.primary.main;
  const [isHovered, setIsHovered] = useState(false);
  const boxRef = useRef(null);

  const handleDownload = () => {
    if (!resultImage) return;
    onDownload();
  };

  const handleShare = () => {
    if (!resultImage) return;
    onShare();
  };

  // Get status chip based on apiStatus
  const getStatusChip = () => {
    switch (apiStatus) {
      case 'loading':
        return (
          <Chip 
            label="Processing..." 
            color="primary" 
            size="small" 
            sx={{ position: 'absolute', top: 16, right: 16 }}
          />
        );
      case 'success':
        return (
          <Zoom in={true}>
            <Chip 
              icon={<CheckCircleIcon />} 
              label="Success" 
              color="success" 
              size="small" 
              sx={{ position: 'absolute', top: 16, right: 16 }}
            />
          </Zoom>
        );
      case 'error':
        return (
          <Zoom in={true}>
            <Chip 
              icon={<ErrorIcon />} 
              label="Error" 
              color="error" 
              size="small" 
              sx={{ position: 'absolute', top: 16, right: 16 }}
            />
          </Zoom>
        );
      default:
        return null;
    }
  };

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
      {getStatusChip()}
      
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
              width: isHovered || resultImage ? '100%' : '40px',
              height: '2px',
              backgroundColor: borderColor,
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }
          }}
        >
          Result Preview
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 1 }}
        >
          {resultImage ? 'Your virtual try-on result' : 'Your result will appear here'}
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          border: resultImage ? 'none' : '2px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          minHeight: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          mb: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: resultImage ? 'transparent' : `${borderColor}05`,
            borderColor: resultImage ? 'transparent' : borderColor,
            '& .result-icon': {
              transform: 'scale(1.1)',
              opacity: 0.9
            },
            '& .result-text': {
              color: borderColor
            }
          }
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Generating your virtual try-on...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="body1" color="error" gutterBottom>
              {error}
            </Typography>
          </Box>
        ) : resultImage ? (
          <img 
            src={resultImage} 
            alt="Try-on result" 
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
        ) : (
          <>
            <Box 
              className="result-icon"
              sx={{ 
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                fontSize: '3rem',
                color: borderColor,
                opacity: 0.7,
                filter: `drop-shadow(0 4px 6px ${borderColor}30)`,
                transition: 'all 0.3s ease',
              }}
            >
              🖼️
            </Box>
            
            <Typography 
              className="result-text"
              variant="body1" 
              sx={{
                color: 'text.hint',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: 1.6,
                transition: 'color 0.2s ease',
              }}
            >
              Upload model and clothing images,<br />
              then click "Generate"
            </Typography>
          </>
        )}
      </Box>
      
      <Fade in={Boolean(resultImage)}>
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center"
          sx={{ 
            visibility: resultImage ? 'visible' : 'hidden',
            height: resultImage ? 'auto' : 0,
            opacity: resultImage ? 1 : 0
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
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
            Download
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ShareIcon />}
            onClick={handleShare}
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
            Share
          </Button>
        </Stack>
      </Fade>
    </Paper>
  );
};

export default ResultBox; 