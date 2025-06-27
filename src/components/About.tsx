import React from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaBrain, FaBook, FaAward } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface TimelineItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  year: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon: Icon, title, description, year }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <HStack spacing={8} align="start" position="relative">
      <Box
        position="absolute"
        left="24px"
        top="0"
        bottom="0"
        width="2px"
        bg={borderColor}
        zIndex="0"
      />
      <Box
        position="relative"
        zIndex="1"
        bg={bgColor}
        p={2}
        borderRadius="full"
        border="2px solid"
        borderColor={borderColor}
      >
        <Icon as={Icon} w={6} h={6} color={iconColor} />
      </Box>
      <MotionBox
        flex="1"
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="md"
        border="1px solid"
        borderColor={borderColor}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Text fontSize="sm" color="gray.500" mb={2}>
          {year}
        </Text>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text color="gray.600">{description}</Text>
      </MotionBox>
    </HStack>
  );
};

export const About: React.FC = () => {
  const timelineItems = [
    {
      icon: FaGraduationCap,
      title: 'Assistant Professor',
      description: 'Teaching and researching in the field of Machine Learning and Data Science',
      year: '2023 - Present',
    },
    {
      icon: FaCode,
      title: 'Full Stack Developer',
      description: 'Building modern web applications with React, TypeScript, and Python',
      year: '2022 - Present',
    },
    {
      icon: FaBrain,
      title: 'ML Researcher',
      description: 'Developing innovative solutions using Deep Learning and AI',
      year: '2021 - Present',
    },
    {
      icon: FaBook,
      title: 'Technical Writer',
      description: 'Creating educational content and tutorials for the tech community',
      year: '2020 - Present',
    },
    {
      icon: FaAward,
      title: 'Awards & Recognition',
      description: 'Received multiple awards for research and teaching excellence',
      year: '2019 - Present',
    },
  ];

  return (
    <Box as="section" py={20} id="about" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            My Journey
          </Heading>
          <MotionVStack
            spacing={8}
            align="stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {timelineItems.map((item, index) => (
              <MotionBox
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <TimelineItem
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  year={item.year}
                />
              </MotionBox>
            ))}
          </MotionVStack>
        </VStack>
      </Container>
    </Box>
  );
}; 