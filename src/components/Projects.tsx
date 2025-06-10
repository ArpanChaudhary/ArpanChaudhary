import React from 'react';
import { Box, SimpleGrid, Heading, Text, Badge, Link, useColorModeValue, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Project, ErrorState, LoadingState } from '../types';
import { fadeInUp } from '../animations/variants';

const MotionBox = motion(Box);

interface ProjectsProps {
  projects: Project[];
  error: ErrorState;
  loading: LoadingState;
  title: string;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, error, loading, title }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');

  if (loading.isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Loading projects...</Text>
      </Box>
    );
  }

  if (error.hasError) {
    return (
      <Alert status="error" borderRadius="md" mb={4}>
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  return (
    <Box as="section" py={10}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projects.map((project) => (
          <MotionBox
            key={project.name}
            bg={cardBg}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            border="1px solid"
            borderColor={cardBorder}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Heading as="h3" size="md" mb={2}>
              <Link href={project.html_url} isExternal color="blue.500">
                {project.name}
              </Link>
            </Heading>
            <Text color="gray.600" mb={4}>
              {project.description}
            </Text>
            <Box mb={4}>
              {project.topics.map((topic) => (
                <Badge
                  key={topic}
                  colorScheme="blue"
                  mr={2}
                  mb={2}
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {topic}
                </Badge>
              ))}
            </Box>
            {project.readme_content && (
              <Text
                fontSize="sm"
                color="gray.500"
                noOfLines={3}
                dangerouslySetInnerHTML={{ __html: project.readme_content }}
              />
            )}
            {project.language && (
              <Text fontSize="sm" color="gray.500" mt={2}>
                Language: {project.language}
              </Text>
            )}
            <Box mt={4} display="flex" gap={4}>
              {project.stargazers_count !== undefined && (
                <Text fontSize="sm" color="gray.500">
                  ⭐ {project.stargazers_count}
                </Text>
              )}
              {project.forks_count !== undefined && (
                <Text fontSize="sm" color="gray.500">
                  🔄 {project.forks_count}
                </Text>
              )}
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}; 