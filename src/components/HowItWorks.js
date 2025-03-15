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

/**
 * HowItWorks Component
 * 
 * Displays a consistent explanation of the virtual try-on process
 * Can be displayed in two modes:
 * 1. As a section in the main application (isModal=false)
 * 2. As a modal popup on the login page (isModal=true)
 * 
 * @param {function} onClose - Function to call when closing the modal
 * @param {boolean} isModal - Whether the component is displayed in a modal
 * @param {number} scale - Scale factor for sizing (default: 1)
 */
const HowItWorks = ({ onClose, isModal = false, scale = 1 }) => {
  const theme = useTheme();
  
  // Track hover state for each step item
  const [hoveredItems, setHoveredItems] = useState({
    item1: false,
    item2: false,
    item3: false
  });
  
  // ===== STYLING CONSTANTS =====
  
  // Font sizes - standardized for consistency
  const fontSizes = {
    h4: `${1.8 * scale}rem`,
    h5: `${1.5 * scale}rem`,
    h6: `${1.2 * scale}rem`,
    body: `${0.9 * scale}rem`,
  };
  
  // Icon size - consistent across all steps
  const iconSize = 60 * scale;

  // ===== CONTENT =====
  
  // Step descriptions
  const descriptions = {
    model: "Upload a full-body photo of a person standing in a neutral pose. For best results, use a clear image with good lighting.",
    cloth: "Upload an image of the clothing item you want to try on. The image should show the entire garment clearly.",
    generate: "Click the \"Generate Try-On\" button and our AI will process your images. In seconds, you'll see a realistic preview."
  };

  // Step configuration - centralizes all step data
  const steps = [
    {
      id: 'item1',
      title: "Upload Model Image",
      description: descriptions.model,
      color: theme.palette.primary.main,
      icon: <PersonIcon fontSize="large" />
    },
    {
      id: 'item2',
      title: "Upload Clothing Item",
      description: descriptions.cloth,
      color: theme.palette.secondary.main,
      icon: <CheckroomIcon fontSize="large" />
    },
    {
      id: 'item3',
      title: "Generate Try-On",
      description: descriptions.generate,
      color: theme.palette.primary.main,
      icon: <AutoAwesomeIcon fontSize="large" />
    }
  ];

  // ===== STYLE OBJECTS =====
  
  // Paper component styles
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

  // Icon box styles
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
    mb: 1.5,
  };

  // Title styles with underline effect
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

  // Main container styles
  const containerStyles = {
    my: isModal ? 0 : 5, 
    pt: isModal ? 0.5 : 0,
    px: isModal ? 0 : 2,
    transform: `scale(${scale})`,
    transformOrigin: 'center top',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
  };

  // Main paper styles
  const mainPaperStyles = {
    p: { xs: 2, sm: 2, md: 3 }, 
    borderRadius: 2,
    position: 'relative',
    overflow: 'visible',
    flexGrow: isModal ? 1 : 0,
    display: 'flex',
    flexDirection: 'column',
    background: isModal 
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%),
         radial-gradient(circle at top right, ${theme.palette.primary.light}20, transparent 70%),
         radial-gradient(circle at bottom left, ${theme.palette.secondary.light}20, transparent 70%)`
      : `radial-gradient(circle at top right, ${theme.palette.primary.light}10, transparent 60%),
         radial-gradient(circle at bottom left, ${theme.palette.secondary.light}10, transparent 60%)`,
  };

  // ===== COMPONENT RENDERERS =====
  
  /**
   * Renders a single step item
   * @param {Object} step - Step configuration object
   * @param {number} index - Step index (1-based)
   * @returns {JSX.Element} - Grid item with step content
   */
  const renderStep = (step, index) => {
    const { id, title, description, color, icon } = step;
    
    return (
      <Grid item xs={12} md={4} key={id}>
        <Paper 
          elevation={2} 
          onMouseEnter={() => setHoveredItems(prev => ({ ...prev, [id]: true }))}
          onMouseLeave={() => setHoveredItems(prev => ({ ...prev, [id]: false }))}
          sx={{ 
            ...paperStyles,
            p: { xs: 1.5, md: 2 },
            borderTop: `${4 * scale}px solid ${color}`,
          }}
        >
          {/* Step icon */}
          <Box 
            sx={{ 
              ...iconBoxStyles,
              bgcolor: color,
              boxShadow: `0 ${4 * scale}px ${12 * scale}px ${color}40`,
            }}
          >
            {icon}
          </Box>
          
          {/* Step title with hover effect */}
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              ...titleStyles,
              '&::after': {
                ...titleStyles['&::after'],
                width: hoveredItems[id] ? '100%' : '0%',
                backgroundColor: color,
              }
            }}
          >
            {title}
          </Typography>
          
          {/* Step description */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: fontSizes.body,
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  /**
   * Renders the technology section
   * @returns {JSX.Element} - Paper component with technology description
   */
  const renderTechnologySection = () => (
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
        },
        display: 'block'
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
  );

  /**
   * Renders the call-to-action section (only in modal mode)
   * @returns {JSX.Element} - Box with CTA content
   */
  const renderCallToAction = () => (
    <Box sx={{ mt: 'auto', pt: 1.5, display: isModal ? 'block' : 'none' }}>
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
            py: 1
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
  );

  // ===== MAIN COMPONENT RENDER =====
  return (
    <Container 
      maxWidth={false} 
      disableGutters={isModal}
      sx={{ 
        ...containerStyles,
        // Adjust for the parent container's scale increase
        transform: `scale(${scale})`,
        width: '100%',
        px: { xs: 1, sm: 2 }, // Add some padding on smaller screens
      }}
    >
      <Paper elevation={3} sx={mainPaperStyles}>
        {/* Main title */}
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          align="center"
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 3,
            position: 'relative',
            fontSize: fontSizes.h4,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${90 * scale}px`,
              height: `${3 * scale}px`,
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              borderRadius: '3px',
            }
          }}
        >
          How It Works
        </Typography>
        
        {/* Subtitle */}
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ 
            mb: 2, 
            color: theme.palette.text.secondary,
            maxWidth: '90%',
            mx: 'auto',
            fontSize: fontSizes.body,
            lineHeight: 1.3,
            display: 'block'
          }}
        >
          Experience clothes virtually before you buy with our AI technology
        </Typography>
        
        {/* Steps grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 2, md: 3 }, flexGrow: isModal ? 1 : 0 }}>
          {steps.map((step, index) => renderStep(step, index + 1))}
        </Grid>
        
        {/* Technology section */}
        {renderTechnologySection()}
        
        {/* Call to action (modal only) */}
        {renderCallToAction()}
      </Paper>
    </Container>
  );
};

export default HowItWorks; 