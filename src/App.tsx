import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, useToast } from '@chakra-ui/react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Project, ErrorState, LoadingState } from './types';
import profileImage from '/profile.jpg';

const App: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredLearningModules, setFilteredLearningModules] = useState<Project[]>([]);
  const [error, setError] = useState<ErrorState>({ hasError: false, message: '' });
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const toast = useToast();

  const fetchProjects = async () => {
    try {
      setLoading({ isLoading: true });
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

      // Fetch README content for projects in parallel
      const projectsWithDetails = await Promise.all(
        filteredProjs.map(async (project: Project) => {
          try {
            const readmeResponse = await axios.get(
              `https://raw.githubusercontent.com/ArpanChaudhary/${project.name}/main/README.md`
            );
            return { ...project, readme_content: readmeResponse.data };
          } catch (error) {
            console.warn(`Could not fetch README for ${project.name}`);
            return project;
          }
        })
      );

      setFilteredProjects(projectsWithDetails);
      setFilteredLearningModules(filteredModules);
      setError({ hasError: false, message: '' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching projects';
      setError({ hasError: true, message: errorMessage });
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading({ isLoading: false });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box bg="gray.50" minH="100vh">
      <Hero profileImage={profileImage} />
      <Container maxW="container.xl" py={10}>
        <Projects
          projects={filteredProjects}
          error={error}
          loading={loading}
          title="Featured Projects"
        />
        <Projects
          projects={filteredLearningModules}
          error={error}
          loading={loading}
          title="Learning Modules"
        />
      </Container>
    </Box>
  );
};

export default App; 
