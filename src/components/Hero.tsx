import React from 'react';
import { Box, Heading, Text, Container, Button, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/variants';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImg = motion.img;

const HERO_BG = (
  <svg 
    width="100%" 
    height="600" 
    viewBox="0 0 1440 600" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    style={{position: 'absolute', top: 0, left: 0, zIndex: 0}}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="heroGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="50%" stopColor="#764ba2" />
        <stop offset="100%" stopColor="#f093fb" />
      </linearGradient>
      <linearGradient id="heroGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path fill="url(#heroGrad1)" fillOpacity="0.1" d="M0,200L60,220C120,240,240,280,360,280C480,280,600,240,720,220C840,200,960,200,1080,220C1200,240,1320,280,1380,300L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
    <circle cx="300" cy="300" r="150" fill="url(#heroGrad2)" fillOpacity="0.2" filter="url(#blur)" />
    <circle cx="1100" cy="200" r="200" fill="url(#heroGrad1)" fillOpacity="0.15" filter="url(#blur)" />
    <circle cx="800" cy="400" r="100" fill="url(#heroGrad2)" fillOpacity="0.1" filter="url(#blur)" />
  </svg>
);

interface HeroProps {
  profileImage: string;
}

export const Hero: React.FC<HeroProps> = ({ profileImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');

  const gradientText = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <MotionBox
      as="section"
      position="relative"
      overflow="hidden"
      pb={32}
      id="hero"
      initial="hidden"
      animate="visible"
      minH="100vh"
      display="flex"
      alignItems="center"
    >
      {HERO_BG}
      <Container maxW="container.xl" position="relative" zIndex={1} pt={24}>
        <MotionFlex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          textAlign={{ base: 'center', lg: 'left' }}
          variants={fadeInUp}
          gap={16}
        >
          <Box flex="1" maxW={{ base: '100%', lg: '600px' }}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Text 
                fontSize="lg" 
                color="blue.500" 
                fontWeight="semibold"
                mb={4}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Welcome to my portfolio
              </Text>
              <Heading 
                as="h1" 
                size="4xl" 
                fontWeight="extrabold" 
                style={gradientText}
                aria-label="Arpan Chaudhary"
                lineHeight="1.1"
                mb={6}
              >
                Arpan Chaudhary
              </Heading>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Text 
                fontSize="2xl" 
                color="blue.600" 
                mt={4} 
                fontWeight="bold"
                aria-label="Professional Title"
                mb={4}
              >
                Assistant Professor | ML Researcher | Data Scientist | Full Stack Developer
              </Text>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                mt={4}
                aria-label="Professional Description"
                lineHeight="1.6"
                mb={8}
              >
                Building intelligent solutions with Python, ML, and Deep Learning. 
                Passionate about creating innovative technology that makes a difference.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <HStack 
                mt={8} 
                spacing={6} 
                justify={{ base: 'center', lg: 'flex-start' }}
                role="navigation"
                aria-label="Social Links"
                flexWrap="wrap"
              >
                <Button 
                  as={Link} 
                  href="https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/" 
                  isExternal 
                  colorScheme="blue"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ 
                    transform: 'translateY(-3px)', 
                    boxShadow: 'xl',
                    bg: 'blue.600'
                  }}
                  transition="all 0.3s ease"
                  aria-label="Visit LinkedIn Profile"
                  borderRadius="full"
                >
                  LinkedIn <ExternalLinkIcon mx="2px" aria-hidden="true" />
                </Button>
                <Button 
                  as={Link} 
                  href="https://github.com/ArpanChaudhary" 
                  isExternal
                  colorScheme="purple"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ 
                    transform: 'translateY(-3px)', 
                    boxShadow: 'xl',
                    bg: 'purple.600'
                  }}
                  transition="all 0.3s ease"
                  aria-label="Visit GitHub Profile"
                  borderRadius="full"
                >
                  GitHub <ExternalLinkIcon mx="2px" aria-hidden="true" />
                </Button>
              </HStack>
            </MotionBox>
          </Box>
          
          <MotionBox 
            flexShrink={0} 
            mt={{ base: 12, lg: 0 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 1, 
              delay: 0.8,
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Box
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.3,
                filter: 'blur(20px)',
              }}
            >
              <MotionImg
                src={imageError ? '/fallback-profile.jpg' : profileImage}
                alt="Arpan Chaudhary profile"
                style={{
                  borderRadius: '50%',
                  width: '280px',
                  height: '280px',
                  objectFit: 'cover',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  border: '8px solid white',
                  background: 'gray.200',
                }}
                onError={() => setImageError(true)}
                aria-label="Profile Picture"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.2 }}
              />
            </Box>
          </MotionBox>
        </MotionFlex>
      </Container>
    </MotionBox>
  );
}; 