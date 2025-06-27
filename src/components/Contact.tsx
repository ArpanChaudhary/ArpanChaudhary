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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const MotionBox = motion(Box);

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => {
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Link href={href} isExternal>
      <HStack
        spacing={4}
        p={4}
        borderRadius="lg"
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'),
          transform: 'translateY(-2px)',
        }}
        transition="all 0.2s"
      >
        <Icon size={24} color={iconColor} />
        <Text>{label}</Text>
      </HStack>
    </Link>
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
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/',
      label: 'LinkedIn',
    },
    {
      icon: FaEnvelope,
      href: 'mailto:arpanchaudhary74882@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <Box as="section" py={20} id="contact">
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="xl"
          mb={12}
          textAlign="center"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Get in Touch
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <MotionBox
            bg={bgColor}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <VStack spacing={6} align="stretch">
              <Heading size="md">Connect with Me</Heading>
              <Text color="gray.600">
                Feel free to reach out to me through any of these platforms. I'm always
                open to discussing new projects, creative ideas, or opportunities to be
                part of your vision.
              </Text>
              <VStack spacing={4} align="stretch">
                {socialLinks.map((link, index) => (
                  <SocialLink
                    key={index}
                    icon={link.icon}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </VStack>
            </VStack>
          </MotionBox>
          <MotionBox
            bg={bgColor}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <VStack spacing={6} align="stretch">
              <Heading size="md">Location</Heading>
              <Text color="gray.600">
                Based in India, available for remote work and collaborations worldwide.
              </Text>
              <Heading size="md">Availability</Heading>
              <Text color="gray.600">
                Currently available for freelance projects and consulting work.
              </Text>
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}; 