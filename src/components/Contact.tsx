import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Link,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const MotionBox = motion(Box);

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label, color }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <MotionBox
      whileHover={{ 
        y: -4, 
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
    >
      <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>
        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          _hover={{
            bg: hoverBg,
            borderColor: color,
            transform: 'translateY(-2px)',
          }}
          transition="all 0.3s ease"
          textAlign="center"
        >
          <Icon as={Icon} size={32} color={color} mb={3} />
          <Text fontWeight="semibold" color="gray.700">
            {label}
          </Text>
        </Box>
      </Link>
    </MotionBox>
  );
};

export const Contact: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/ArpanChaudhary',
      label: 'GitHub',
      color: '#333',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/',
      label: 'LinkedIn',
      color: '#0077B5',
    },
    {
      icon: FaEnvelope,
      href: 'mailto:arpanchaudhary74882@gmail.com',
      label: 'Email',
      color: '#EA4335',
    },
  ];

  return (
    <Box as="section" py={20} id="contact" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <Heading
            as="h2"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Get in Touch
          </Heading>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="full">
            <MotionBox
              bg={bgColor}
              p={10}
              borderRadius="2xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                  <Heading size="lg" mb={4} color="blue.600">
                    Let's Connect
                  </Heading>
                  <Text color="gray.600" lineHeight="1.6">
                    Feel free to reach out to me through any of these platforms. I'm always
                    open to discussing new projects, creative ideas, or opportunities to be
                    part of your vision.
                  </Text>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {socialLinks.map((link, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <SocialLink
                        icon={link.icon}
                        href={link.href}
                        label={link.label}
                        color={link.color}
                      />
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </VStack>
            </MotionBox>
            
            <MotionBox
              bg={bgColor}
              p={10}
              borderRadius="2xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                  <Heading size="lg" mb={4} color="purple.600">
                    About Me
                  </Heading>
                </Box>
                
                <VStack spacing={6} align="stretch">
                  <HStack spacing={4} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <Icon as={FaMapMarkerAlt} color="blue.500" boxSize={5} />
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">
                        Location
                      </Text>
                      <Text color="gray.600">
                        Based in India, available for remote work and collaborations worldwide.
                      </Text>
                    </Box>
                  </HStack>
                  
                  <HStack spacing={4} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <Icon as={FaClock} color="green.500" boxSize={5} />
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">
                        Availability
                      </Text>
                      <Text color="gray.600">
                        Currently available for freelance projects and consulting work.
                      </Text>
                    </Box>
                  </HStack>
                  
                  <HStack spacing={4} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <Icon as={FaEnvelope} color="red.500" boxSize={5} />
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">
                        Email
                      </Text>
                      <Text color="gray.600">
                        arpanchaudhary74882@gmail.com
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}; 