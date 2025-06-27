import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  SiPython,
  SiReact,
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
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <MotionBox
      bg={bgColor}
      p={8}
      borderRadius="2xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
      textAlign="center"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        transform: 'scaleX(0)',
        transition: 'transform 0.3s ease',
      }}
      _hover={{
        _before: {
          transform: 'scaleX(1)',
        },
      }}
    >
      <Box position="relative" width="120px" height="120px" mx="auto" mb={6}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={useColorModeValue('gray.200', 'gray.700')}
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon size={32} color={color} />
          </Box>
        </svg>
      </Box>
      <Text fontWeight="bold" mb={2} fontSize="lg" color="gray.800">
        {name}
      </Text>
      <Badge
        colorScheme="blue"
        variant="subtle"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="sm"
        fontWeight="medium"
        mb={2}
      >
        {level}%
      </Badge>
      <Text fontSize="xs" color="gray.500" fontWeight="medium">
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
    <Box as="section" py={20} id="skills" bg={useColorModeValue('gray.50', 'gray.900')}>
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
            Technical Expertise
          </Heading>
          
          {categories.map((category, categoryIndex) => (
            <VStack key={category} spacing={12} width="full" align="stretch">
              <Box textAlign="center">
                <Heading 
                  size="lg" 
                  color={useColorModeValue('gray.700', 'gray.300')}
                  mb={2}
                >
                  {category}
                </Heading>
                <Box 
                  w="60px" 
                  h="3px" 
                  bg="linear-gradient(90deg, #667eea, #764ba2, #f093fb)"
                  mx="auto"
                  borderRadius="full"
                />
              </Box>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={8}>
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
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