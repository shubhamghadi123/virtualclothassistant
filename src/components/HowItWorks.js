import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Grid,
  useTheme,
  Divider,
  Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HowItWorks = ({ onClose, isModal = false, scale = 1 }) => {
  const theme = useTheme();
  const [hoveredItems, setHoveredItems] = useState({
    item1: false,
    item2: false,
    item3: false
  });
  
  // Calculate scaled font sizes
  const fontSizes = {
    h4: `${isModal ? 1.7 * scale : 1.8 * scale}rem`,
    h5: `${isModal ? 1.4 * scale : 1.5 * scale}rem`,
    h6: `${isModal ? 1.1 * scale : 1.2 * scale}rem`,
    body: `${isModal ? 0.85 * scale : 0.9 * scale}rem`,
  };
  const iconSize = isModal ? 55 * scale : 60 * scale;

  // Content descriptions
  const descriptions = isModal ? {
    model: "Upload a clear full-body photo with good lighting.",
    cloth: "Select a clothing item to try on virtually.",
    generate: "Our AI creates a realistic preview instantly."
  } : {
    model: "Upload a full-body photo of a person standing in a neutral pose. For best results, use a clear image with good lighting.",
    cloth: "Upload an image of the clothing item you want to try on. The image should show the entire garment clearly.",
    generate: "Click the \"Generate Try-On\" button and our AI will process your images. In seconds, you'll see a realistic preview."
  };

  // Common styles
  const paperStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[6],
    }
  };

  const iconBoxStyles = {
    width: iconSize, 
    height: iconSize, 
    borderRadius: '50%', 
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${1.6 * scale}rem`,
    fontWeight: 'bold',
    mb: isModal ? 1 : 1.5,
  };

  const titleStyles = {
    fontSize: fontSizes.h6,
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: `${2 * scale}px`,
      borderRadius: '2px',
      transition: 'width 0.3s ease',
    }
  };

  // Step item renderer
  const renderStep = (index, title, description, color, icon) => {
    const itemKey = `item${index}`;
    return (
      <Grid item xs={12} md={4}>
        <Paper 
          elevation={2} 
          onMouseEnter={() => setHoveredItems(prev => ({ ...prev, [itemKey]: true }))}
          onMouseLeave={() => setHoveredItems(prev => ({ ...prev, [itemKey]: false }))}
          sx={{ 
            ...paperStyles,
            p: { xs: isModal ? 1 : 1.5, md: isModal ? 1 : 2 },
            borderTop: `${isModal ? 3 * scale : 4 * scale}px solid ${color}`,
          }}
        >
          <Box 
            sx={{ 
              ...iconBoxStyles,
              bgcolor: color,
              boxShadow: `0 ${4 * scale}px ${12 * scale}px ${color}40`,
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              ...titleStyles,
              '&::after': {
                ...titleStyles['&::after'],
                width: hoveredItems[itemKey] ? '100%' : '0%',
                backgroundColor: color,
              }
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: fontSizes.body,
              lineHeight: isModal ? 1.3 : 1.5
            }}
          >
            {description}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters={isModal}
      sx={{ 
        my: isModal ? 0 : 5, 
        pt: isModal ? 0.5 : 0,
        px: isModal ? 0 : 2,
        transform: `scale(${scale})`,
        transformOrigin: 'center top',
        height: isModal ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: isModal ? 1.5 : 2, sm: isModal ? 1.5 : 2, md: isModal ? 1.5 : 3 }, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          flexGrow: isModal ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          background: isModal 
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%),
               radial-gradient(circle at top right, ${theme.palette.primary.light}20, transparent 70%),
               radial-gradient(circle at bottom left, ${theme.palette.secondary.light}20, transparent 70%)`
            : `radial-gradient(circle at top right, ${theme.palette.primary.light}10, transparent 60%),
               radial-gradient(circle at bottom left, ${theme.palette.secondary.light}10, transparent 60%)`,
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          align="center"
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: isModal ? 1 : 3,
            position: 'relative',
            fontSize: fontSizes.h4,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${isModal ? 80 * scale : 90 * scale}px`,
              height: `${isModal ? 2 * scale : 3 * scale}px`,
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              borderRadius: '3px',
            }
          }}
        >
          How It Works
        </Typography>
        
        {isModal && (
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ 
              mb: 2, 
              color: theme.palette.text.secondary,
              maxWidth: '90%',
              mx: 'auto',
              fontSize: fontSizes.body,
              lineHeight: 1.3
            }}
          >
            Experience clothes virtually before you buy with our AI technology
          </Typography>
        )}
        
        <Grid container spacing={{ xs: isModal ? 1 : 2, md: isModal ? 1.5 : 3 }} sx={{ mb: { xs: isModal ? 1 : 2, md: isModal ? 1.5 : 3 }, flexGrow: isModal ? 1 : 0 }}>
          {renderStep(1, "Upload Model Image", descriptions.model, theme.palette.primary.main, 
            <PersonIcon fontSize={isModal ? "medium" : "large"} />)}
          
          {renderStep(2, "Upload Clothing Item", descriptions.cloth, theme.palette.secondary.main, 
            <CheckroomIcon fontSize={isModal ? "medium" : "large"} />)}
          
          {renderStep(3, "Generate Try-On", descriptions.generate, theme.palette.primary.main, 
            <AutoAwesomeIcon fontSize={isModal ? "medium" : "large"} />)}
        </Grid>
        
        {!isModal && (
          <Paper 
            elevation={1} 
            sx={{ 
              p: { xs: 1.5, md: 2.5 }, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
              position: 'relative',
              borderLeft: `${4 * scale}px solid ${theme.palette.primary.main}`,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: theme.shadows[3],
              }
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              align="center"
              sx={{ 
                color: theme.palette.primary.main,
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: fontSizes.h5,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '100%',
                  height: `${2 * scale}px`,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }}
            >
              The Technology Behind It
            </Typography>
            <Typography variant="body1" align="center" sx={{ fontSize: fontSizes.body }}>
              Our Virtual Cloth Try-On uses advanced AI to analyze both model and clothing images. 
              The system identifies body posture and clothing characteristics to create a realistic 
              visualization of how the garment would fit on the person.
            </Typography>
          </Paper>
        )}
        
        {isModal && (
          <Box sx={{ mt: 'auto', pt: 1.5 }}>
            <Divider />
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mt: 1.5,
              gap: 1.5
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: fontSizes.body, 
                  color: theme.palette.text.primary,
                  fontWeight: 500
                }}
              >
                Ready to try on clothes virtually?
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={onClose}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  minWidth: '160px',
                  fontWeight: 600,
                  fontSize: fontSizes.body,
                  py: isModal ? 0.75 : 1
                }}
              >
                Get Started
              </Button>
            </Box>
            <Typography 
              variant="body2" 
              align="center" 
              sx={{ 
                fontSize: fontSizes.body, 
                mt: 1.5, 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}
            >
              No more guessing how clothes will look — see it before you buy it!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HowItWorks; 