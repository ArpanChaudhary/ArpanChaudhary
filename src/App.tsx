import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, useToast, useColorModeValue } from '@chakra-ui/react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { Project, ErrorState, LoadingState } from './types';
import profileImage from '/profile.jpg';

// Custom project for rangrezdecor.in
const rangrezDecorProject: Project = {
  name: 'Rangrez Decor',
  description: 'A modern e-commerce website for home decoration and interior design products. Features a responsive design, product catalog, shopping cart functionality, and secure payment integration.',
  html_url: 'https://rangrezdecor.in',
  language: 'React/TypeScript',
  topics: ['React', 'TypeScript', 'E-commerce', 'Responsive Design', 'Payment Integration', 'UI/UX'],
  stargazers_count: 0,
  forks_count: 0,
  readme_content: 'A comprehensive e-commerce platform built with modern web technologies, offering a seamless shopping experience for home decoration products.'
};

const App: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [error, setError] = useState<ErrorState>({ hasError: false, message: '' });
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

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
      
      const filteredProjs = response.data.filter((project: Project) => 
        selectedProjects.includes(project.name)
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

      // Combine GitHub projects with custom projects
      const allProjects = [rangrezDecorProject, ...projectsWithDetails];
      setFilteredProjects(allProjects);
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
    <Box bg={bgColor} minH="100vh">
      <Navbar />
      <Hero profileImage={profileImage} />
      <Container maxW="container.xl" py={10}>
        <About />
        <Skills />
        <Projects
          projects={filteredProjects}
          error={error}
          loading={loading}
          title="Featured Projects"
        />
        <Contact />
      </Container>
    </Box>
  );
};

export default App; 
