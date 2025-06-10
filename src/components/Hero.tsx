import React from 'react';
import { Box, Heading, Text, Container, Button, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/variants';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HERO_BG = (
  <svg 
    width="100%" 
    height="400" 
    viewBox="0 0 1440 400" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    style={{position: 'absolute', top: 0, left: 0, zIndex: 0}}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
      </filter>
    </defs>
    <path fill="url(#grad1)" fillOpacity="0.8" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
    <circle cx="200" cy="200" r="100" fill="url(#grad1)" fillOpacity="0.3" filter="url(#blur)" />
    <circle cx="1200" cy="150" r="150" fill="url(#grad1)" fillOpacity="0.2" filter="url(#blur)" />
  </svg>
);

interface HeroProps {
  profileImage: string;
}

export const Hero: React.FC<HeroProps> = ({ profileImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');

  const gradientText = {
    background: 'linear-gradient(45deg, #6EE7B7, #3B82F6, #8B5CF6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <MotionBox
      as="section"
      position="relative"
      overflow="hidden"
      pb={24}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {HERO_BG}
      <Container maxW="container.xl" position="relative" zIndex={1} pt={24} pb={16}>
        <MotionFlex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          textAlign={{ base: 'center', md: 'left' }}
          variants={fadeInUp}
          pt={32}
          gap={12}
        >
          <Box flex="1">
            <Heading 
              as="h1" 
              size="3xl" 
              fontWeight="extrabold" 
              style={gradientText}
              aria-label="Arpan Chaudhary"
            >
              Arpan Chaudhary
            </Heading>
            <Text 
              fontSize="2xl" 
              color="blue.600" 
              mt={4} 
              fontWeight="bold"
              aria-label="Professional Title"
            >
              Assistant Professor | ML Researcher | Data Scientist | Full Stack Developer
            </Text>
            <Text 
              fontSize="lg" 
              color="gray.600" 
              mt={4}
              aria-label="Professional Description"
            >
              Building intelligent solutions with Python, ML, and Deep Learning
            </Text>
            <HStack 
              mt={8} 
              spacing={6} 
              justify={{ base: 'center', md: 'flex-start' }}
              role="navigation"
              aria-label="Social Links"
            >
              <Button 
                as={Link} 
                href="https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/" 
                isExternal 
                colorScheme="blue"
                size="lg"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
                aria-label="Visit LinkedIn Profile"
              >
                LinkedIn <ExternalLinkIcon mx="2px" aria-hidden="true" />
              </Button>
              <Button 
                as={Link} 
                href="https://github.com/ArpanChaudhary" 
                isExternal
                colorScheme="purple"
                size="lg"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
                aria-label="Visit GitHub Profile"
              >
                GitHub <ExternalLinkIcon mx="2px" aria-hidden="true" />
              </Button>
            </HStack>
          </Box>
          <Box flexShrink={0} mt={{ base: 8, md: 0 }}>
            <Box
              as="img"
              src={imageError ? '/fallback-profile.jpg' : profileImage}
              alt="Arpan Chaudhary profile"
              borderRadius="full"
              boxSize={{ base: '180px', md: '240px' }}
              objectFit="cover"
              boxShadow="2xl"
              border="6px solid white"
              bg="gray.200"
              onError={() => setImageError(true)}
              aria-label="Profile Picture"
            />
          </Box>
        </MotionFlex>
      </Container>
    </MotionBox>
  );
}; 