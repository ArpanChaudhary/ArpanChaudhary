import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiTensorflow,
  SiPytorch,
  SiDocker,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiApachespark,
  SiJupyter,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiAwsamplify,
  SiGooglecloud,
} from 'react-icons/si';

const MotionBox = motion(Box);

interface SkillProps {
  name: string;
  icon: React.ElementType;
  level: number;
  color: string;
  category: string;
}

const Skill: React.FC<SkillProps> = ({ name, icon: Icon, level, color, category }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <MotionBox
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor={borderColor}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      textAlign="center"
    >
      <Box position="relative" width="100px" height="100px" mx="auto" mb={4}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={useColorModeValue('gray.200', 'gray.700')}
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon size={24} color={color} />
          </Box>
        </svg>
      </Box>
      <Text fontWeight="bold" mb={1}>
        {name}
      </Text>
      <Text color="gray.500" fontSize="sm" mb={2}>
        {level}%
      </Text>
      <Text fontSize="xs" color="gray.400">
        {category}
      </Text>
    </MotionBox>
  );
};

export const Skills: React.FC = () => {
  const skills = [
    // Python & Web Development
    { name: 'Python', icon: SiPython, level: 95, color: '#3776AB', category: 'Core Programming' },
    { name: 'Django', icon: SiDjango, level: 90, color: '#092E20', category: 'Web Framework' },
    { name: 'Flask', icon: SiFlask, level: 85, color: '#000000', category: 'Web Framework' },
    { name: 'FastAPI', icon: SiFastapi, level: 90, color: '#009688', category: 'Web Framework' },
    { name: 'React', icon: SiReact, level: 85, color: '#61DAFB', category: 'Frontend' },
    
    // Data Science & Analytics
    { name: 'Pandas', icon: SiPandas, level: 95, color: '#150458', category: 'Data Science' },
    { name: 'NumPy', icon: SiNumpy, level: 90, color: '#013243', category: 'Data Science' },
    { name: 'Scikit-learn', icon: SiScikitlearn, level: 90, color: '#F7931E', category: 'Machine Learning' },
    { name: 'Jupyter', icon: SiJupyter, level: 95, color: '#F37626', category: 'Data Science' },
    { name: 'Apache Spark', icon: SiApachespark, level: 85, color: '#E25A1C', category: 'Big Data' },
    
    // Machine Learning & Deep Learning
    { name: 'TensorFlow', icon: SiTensorflow, level: 90, color: '#FF6F00', category: 'Deep Learning' },
    { name: 'PyTorch', icon: SiPytorch, level: 85, color: '#EE4C2C', category: 'Deep Learning' },
    { name: 'ML Products', icon: SiTensorflow, level: 90, color: '#FF6F00', category: 'ML Development' },
    
    // Cloud & DevOps
    { name: 'AWS', icon: SiAwsamplify, level: 85, color: '#FF9900', category: 'Cloud' },
    { name: 'GCP', icon: SiGooglecloud, level: 80, color: '#4285F4', category: 'Cloud' },
    { name: 'Docker', icon: SiDocker, level: 85, color: '#2496ED', category: 'DevOps' },
    
    // Databases
    { name: 'MongoDB', icon: SiMongodb, level: 85, color: '#47A248', category: 'Database' },
    { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: '#336791', category: 'Database' },
    
    // Version Control
    { name: 'Git', icon: SiGit, level: 90, color: '#F05032', category: 'Version Control' },
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <Box as="section" py={20} id="skills" bg={useColorModeValue('white', 'gray.800')}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Technical Expertise
          </Heading>
          
          {categories.map((category, categoryIndex) => (
            <VStack key={category} spacing={8} width="full" align="stretch">
              <Heading size="md" color={useColorModeValue('gray.700', 'gray.300')}>
                {category}
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={8}>
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Skill
                        name={skill.name}
                        icon={skill.icon}
                        level={skill.level}
                        color={skill.color}
                        category={skill.category}
                      />
                    </MotionBox>
                  ))}
              </SimpleGrid>
            </VStack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}; 