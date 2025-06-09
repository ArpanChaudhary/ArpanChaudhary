import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Container, Button, Flex, Stack, Link, HStack, Badge, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import { RepeatIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import profileImage from '/profile.jpg';

interface Project {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  readme_content?: string;
  image_url?: string;
  homepage?: string;
}

const HERO_BG = (
  <svg width="100%" height="400" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: 0, left: 0, zIndex: 0}}>
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

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const linkHover = {
  initial: { y: 0 },
  hover: { 
    y: -2,
    transition: { duration: 0.2 }
  }
};

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionLink = motion(Link);
const MotionButton = motion(Button);

const App: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredLearningModules, setFilteredLearningModules] = useState<Project[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/ArpanChaudhary/repos');
      const selectedProjects = [
        'ThinkML_v1',
        'ThinkML_v2',
        'ThinkMLApp_v1',
        'CARDIOPREDICT'
      ];

      const learningModules = [
        'Numpy',
        'Pandas',
        'Python',
        'Visualization'
      ];
      
      const filteredProjs = response.data.filter((project: Project) => 
        selectedProjects.includes(project.name)
      );

      const filteredModules = response.data.filter((project: Project) => 
        learningModules.includes(project.name)
      );

      const projectsWithDetails = await Promise.all(
        filteredProjs.map(async (project: Project) => {
          try {
            const readmeResponse = await axios.get(
              `https://raw.githubusercontent.com/ArpanChaudhary/${project.name}/main/README.md`
            );
            project.readme_content = readmeResponse.data;
          } catch (error) {
            console.warn(`Could not fetch README for ${project.name}`);
          }
          return project;
        })
      );

      setFilteredProjects(projectsWithDetails);
      setFilteredLearningModules(filteredModules);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const gradientText = {
    background: 'linear-gradient(45deg, #6EE7B7, #3B82F6, #8B5CF6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <MotionBox
        as="section"
        position="relative"
        overflow="hidden"
        pb={24}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        transition={{ duration: 0.5 }}
      >
        {HERO_BG}
        <Container maxW="container.xl" position="relative" zIndex={1} pt={24} pb={16}>
          <MotionFlex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            textAlign={{ base: 'center', md: 'left' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            pt={32}
            gap={12}
          >
            {/* Left: Name and Info */}
            <Box flex="1">
              <Heading as="h1" size="3xl" fontWeight="extrabold" style={gradientText}>
                Arpan Chaudhary
              </Heading>
              <Text fontSize="2xl" color="blue.600" mt={4} fontWeight="bold">
                Assistant Professor | ML Researcher | Data Scientist | Full Stack Developer
              </Text>
              <Text fontSize="lg" color="gray.600" mt={4}>
                Building intelligent solutions with Python, ML, and Deep Learning
              </Text>
              <HStack mt={8} spacing={6} justify={{ base: 'center', md: 'flex-start' }}>
                <Button 
                  as={Link} 
                  href="https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/" 
                  isExternal 
                  colorScheme="blue"
                  size="lg"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  LinkedIn <ExternalLinkIcon mx="2px" />
                </Button>
                <Button 
                  as={Link} 
                  href="https://github.com/ArpanChaudhary" 
                  isExternal
                  colorScheme="purple"
                  size="lg"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  GitHub <ExternalLinkIcon mx="2px" />
                </Button>
              </HStack>
            </Box>
            {/* Right: Profile Image */}
            <Box flexShrink={0} mt={{ base: 8, md: 0 }}>
              <Box
                as="img"
                src={profileImage}
                alt="Arpan Chaudhary profile"
                borderRadius="full"
                boxSize={{ base: '180px', md: '240px' }}
                objectFit="cover"
                boxShadow="2xl"
                border="6px solid white"
                bg="gray.200"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.src = 'https://via.placeholder.com/240';
                }}
              />
            </Box>
          </MotionFlex>
        </Container>
      </MotionBox>

      <Container maxW="container.xl" py={10}>
        <Stack direction="column" spacing={12}>
          {/* About Section */}
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading as="h2" size="xl" mb={6} style={gradientText}>About Me</Heading>
            <Box 
              p={8} 
              bg={cardBg} 
              borderRadius="xl" 
              boxShadow="xl" 
              borderWidth="1px" 
              borderColor={cardBorder}
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s"
            >
              <Stack spacing={6}>
                <Text fontSize="lg">
                  Passionate ML engineer and full-stack developer building intelligent tools that create real-world impact. From ThinkML — my custom ML framework — to deploying Flask/React apps, I turn AI concepts into working solutions. I love sharing knowledge and crafting open-source innovations.
                </Text>
                <Text fontSize="lg">
                  With expertise in Python, TensorFlow, and PyTorch, I've built and deployed various ML models across different domains. My approach combines technical excellence with a deep understanding of business needs, ensuring that every solution I develop is both technically sound and practically valuable.
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  Key achievements and expertise:
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Box p={4} bg="blue.50" borderRadius="lg" _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }} transition="all 0.2s">
                    <Text fontWeight="bold" color="blue.600">Healthcare ML</Text>
                    <Text>Developed and deployed ML models achieving 95%+ accuracy in healthcare predictions, helping medical professionals make data-driven decisions for better patient outcomes.</Text>
                  </Box>
                  <Box p={4} bg="purple.50" borderRadius="lg" _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }} transition="all 0.2s">
                    <Text fontWeight="bold" color="purple.600">ThinkML Framework</Text>
                    <Text>Created ThinkML framework for streamlined machine learning workflows, making ML development more accessible and efficient for teams of all sizes.</Text>
                  </Box>
                  <Box p={4} bg="teal.50" borderRadius="lg" _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }} transition="all 0.2s">
                    <Text fontWeight="bold" color="teal.600">Data Visualization</Text>
                    <Text>Built intuitive data visualization tools for complex ML model analysis, enabling better understanding and interpretation of model behavior and results.</Text>
                  </Box>
                </SimpleGrid>
                <Text fontSize="lg" mt={4}>
                  I'm constantly learning and exploring new technologies in the AI space. When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or mentoring aspiring data scientists. I believe in sharing knowledge and building a stronger AI community together.
                </Text>
              </Stack>
            </Box>
          </MotionBox>

          {/* Projects Section */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HStack justify="space-between" align="center" mb={6}>
              <Heading as="h2" size="xl" style={gradientText}>Projects</Heading>
              <HStack>
                <Text fontSize="sm" color="gray.500">Last updated: {lastUpdated}</Text>
                <MotionButton 
                  aria-label="Refresh projects" 
                  onClick={fetchProjects}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <RepeatIcon />
                </MotionButton>
              </HStack>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {filteredProjects.map((project) => {
                // Custom descriptions for each project
                let customDescription = '';
                if (project.name === 'CARDIOPREDICT') {
                  customDescription = 'A machine learning-based heart disease prediction system that analyzes clinical inputs such as age, blood pressure, cholesterol, and BMI to assess cardiovascular risk.\nTech Stack: Python, Flask, Scikit-learn, SQLite, HTML/CSS';
                } else if (project.name === 'ThinkMLApp') {
                  customDescription = 'An interactive ML learning platform that allows users to upload datasets, train machine learning models, and view live visualizations and evaluation metrics.\nTech Stack: Python, Flask, Scikit-learn, Tailwind CSS, Plotly';
                } else if (project.name === 'ThinkML_v1') {
                  customDescription = 'Initial prototype of the ThinkML framework focused on model training and evaluation for supervised tasks using a modular Python API.\nTech Stack: Python, NumPy, Pandas, Scikit-learn';
                } else if (project.name === 'ThinkML_v2') {
                  customDescription = 'Enhanced version of ThinkML with added support for preprocessing, chunk-based EDA, model comparison, and better visualization support.\nTech Stack: Python, Scikit-learn, Plotly, Matplotlib, Custom Modules';
                } else {
                  customDescription = project.description || 'No description available.';
                }
                return (
                  <MotionBox
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    p={6}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="xl"
                    borderWidth="1px"
                    borderColor={cardBorder}
                  >
                    <Stack spacing={4}>
                      <HStack justify="space-between" align="start">
                        <Stack spacing={1}>
                          <Heading as="h3" size="lg" style={gradientText}>{project.name}</Heading>
                          <Text fontSize="sm" color="gray.500">
                            {project.name.includes('ThinkML') ? 'Machine Learning Framework' :
                              project.name.includes('CARDIOPREDICT') ? 'Healthcare ML Project' :
                              'ML Project'}
                          </Text>
                        </Stack>
                        <MotionLink 
                          href={project.html_url} 
                          isExternal
                          whileHover="hover"
                          initial="initial"
                          variants={linkHover}
                        >
                          <Button 
                            size="sm" 
                            rightIcon={<ExternalLinkIcon />}
                            colorScheme={project.name.includes('ThinkML') ? 'purple' : 'blue'}
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            transition="all 0.2s"
                          >
                            GitHub
                          </Button>
                        </MotionLink>
                      </HStack>
                      {/* Custom Description */}
                      <Box>
                        {customDescription.split('\n').map((line, idx) => (
                          <Text key={idx} fontSize={idx === 0 ? 'md' : 'sm'} color={idx === 0 ? 'gray.700' : 'gray.500'} fontWeight={idx === 0 ? 'normal' : 'bold'} mt={idx === 0 ? 0 : 2}>
                            {line}
                          </Text>
                        ))}
                      </Box>
                      <HStack wrap="wrap" spacing={2}>
                        {project.topics.map((topic) => (
                          <Badge 
                            key={topic} 
                            colorScheme={
                              project.name.includes('ThinkML') ? 'purple' :
                              topic.toLowerCase().includes('ml') || topic.toLowerCase().includes('ai') ? 'purple' :
                              topic.toLowerCase().includes('python') ? 'green' :
                              topic.toLowerCase().includes('data') ? 'blue' :
                              'gray'
                            } 
                            variant="subtle" 
                            px={2} 
                            py={1} 
                            borderRadius="full"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </HStack>
                    </Stack>
                  </MotionBox>
                );
              })}
            </SimpleGrid>
          </MotionBox>

          {/* Learning Modules Section */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Heading as="h2" size="xl" mb={6} style={gradientText}>Learning Modules</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {filteredLearningModules.map((module) => (
                <MotionBox
                  key={module.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  p={6}
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="xl"
                  borderWidth="1px"
                  borderColor={cardBorder}
                >
                  <Stack spacing={4}>
                    <HStack justify="space-between" align="start">
                      <Stack spacing={1}>
                        <Heading as="h3" size="lg" style={gradientText}>{module.name}</Heading>
                        <Text fontSize="sm" color="gray.500">
                          {module.name === 'Numpy' ? 'Numerical Computing' :
                           module.name === 'Pandas' ? 'Data Analysis' :
                           module.name === 'Python' ? 'Programming Language' :
                           'Data Visualization'}
                        </Text>
                      </Stack>
                      <Link href={module.html_url} isExternal>
                        <Button 
                          size="sm" 
                          rightIcon={<ExternalLinkIcon />}
                          colorScheme="teal"
                          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                          transition="all 0.2s"
                        >
                          GitHub
                        </Button>
                      </Link>
                    </HStack>
                    <Text>{module.description || 'No description available.'}</Text>
                    <HStack wrap="wrap" spacing={2}>
                      {module.topics.map((topic) => (
                        <Badge 
                          key={topic} 
                          colorScheme="teal"
                          variant="subtle" 
                          px={2} 
                          py={1} 
                          borderRadius="full"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </HStack>
                  </Stack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Contact Section */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Heading as="h2" size="xl" mb={6} style={gradientText}>Contact</Heading>
            <MotionBox 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              p={8} 
              bg={cardBg} 
              borderRadius="xl" 
              boxShadow="xl" 
              borderWidth="1px" 
              borderColor={cardBorder}
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s"
            >
              <Stack spacing={6} align="center">
                <Text fontSize="xl" fontWeight="bold">Let's connect and build something amazing together!</Text>
                <HStack spacing={6}>
                  <MotionButton 
                    as={Link} 
                    href="mailto:arpanchaudhary74882@gmail.com" 
                    colorScheme="blue"
                    size="lg"
                    leftIcon={<ExternalLinkIcon />}
                    whileHover={{ y: -2, boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    Email
                  </MotionButton>
                  <MotionButton 
                    as={Link} 
                    href="https://github.com/ArpanChaudhary" 
                    isExternal
                    colorScheme="purple"
                    size="lg"
                    leftIcon={<ExternalLinkIcon />}
                    whileHover={{ y: -2, boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    GitHub
                  </MotionButton>
                  <MotionButton 
                    as={Link} 
                    href="https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/" 
                    isExternal
                    colorScheme="teal"
                    size="lg"
                    leftIcon={<ExternalLinkIcon />}
                    whileHover={{ y: -2, boxShadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    LinkedIn
                  </MotionButton>
                </HStack>
              </Stack>
            </MotionBox>
          </MotionBox>
        </Stack>
      </Container>

      {/* Footer */}
      <Box 
        as="footer" 
        py={8} 
        bg={cardBg} 
        borderTopWidth="1px" 
        borderColor={cardBorder}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="100%"
          bg="linear-gradient(45deg, #6EE7B7, #3B82F6, #8B5CF6)"
          opacity="0.1"
          zIndex="0"
        />
        <Container maxW="container.xl" position="relative" zIndex="1">
          <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Text>© 2025 Arpan Chaudhary. All rights reserved.</Text>
            <HStack spacing={6}>
              <Link 
                href="mailto:arpanchaudhary74882@gmail.com" 
                color="blue.500"
                _hover={{ color: 'blue.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Email
              </Link>
              <Link 
                href="https://github.com/ArpanChaudhary" 
                isExternal
                color="purple.500"
                _hover={{ color: 'purple.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                GitHub
              </Link>
              <Link 
                href="https://www.linkedin.com/in/arpan-chaudhary-4a0b9b272/" 
                isExternal
                color="teal.500"
                _hover={{ color: 'teal.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                LinkedIn
              </Link>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default App; 
