import React from 'react';
import { Box, SimpleGrid, Heading, Text, Badge, Link, useColorModeValue, Spinner, Alert, AlertIcon, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Project, ErrorState, LoadingState } from '../types';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

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
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  if (loading.isLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text mt={6} fontSize="lg" color="gray.600">Loading amazing projects...</Text>
      </Box>
    );
  }

  if (error.hasError) {
    return (
      <Alert status="error" borderRadius="lg" mb={6}>
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  return (
    <Box as="section" py={20} id="projects">
      <VStack spacing={16}>
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
          bgClip="text"
          fontWeight="extrabold"
        >
          {title}
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {projects.map((project, index) => (
            <MotionBox
              key={project.name}
              bg={cardBg}
              p={8}
              borderRadius="2xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={cardBorder}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
              }}
              _hover={{
                _before: {
                  transform: 'scaleX(1)',
                },
                bg: hoverBg,
              }}
            >
              <VStack spacing={6} align="stretch">
                {/* Project Header */}
                <Box>
                  <Heading as="h3" size="lg" mb={3} color="blue.600">
                    <Link href={project.html_url} isExternal color="inherit" _hover={{ textDecoration: 'none' }}>
                      {project.name}
                    </Link>
                  </Heading>
                  <Text color="gray.600" lineHeight="1.6" fontSize="md">
                    {project.description}
                  </Text>
                </Box>

                {/* Technologies */}
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={3} fontWeight="semibold">
                    Technologies
                  </Text>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {project.topics.map((topic) => (
                      <Badge
                        key={topic}
                        colorScheme="blue"
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="medium"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </Box>
                </Box>

                {/* Project Stats */}
                <HStack spacing={4} color="gray.500" fontSize="sm">
                  {project.stargazers_count !== undefined && (
                    <HStack spacing={1}>
                      <FaStar />
                      <Text>{project.stargazers_count}</Text>
                    </HStack>
                  )}
                  {project.forks_count !== undefined && (
                    <HStack spacing={1}>
                      <FaCodeBranch />
                      <Text>{project.forks_count}</Text>
                    </HStack>
                  )}
                  {project.language && (
                    <HStack spacing={1}>
                      <FaCodeBranch />
                      <Text>{project.language}</Text>
                    </HStack>
                  )}
                </HStack>

                {/* README Preview */}
                {project.readme_content && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={2} fontWeight="semibold">
                      Description
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      noOfLines={3}
                      lineHeight="1.5"
                    >
                      {project.readme_content.replace(/[#*`]/g, '').substring(0, 150)}...
                    </Text>
                  </Box>
                )}

                {/* Action Buttons */}
                {/* Removed GitHub View Code button due to API denial */}
                {/* <HStack spacing={3} pt={2}>
                  <Button
                    as={Link}
                    href={project.html_url}
                    isExternal
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    leftIcon={<FaGithub />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'md',
                    }}
                    transition="all 0.2s"
                  >
                    View Code
                  </Button>
                </HStack> */}
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}; 