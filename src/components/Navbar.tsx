import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Links = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <MotionBox
      bg={bgColor}
      px={6}
      position="fixed"
      w="100%"
      zIndex={1000}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      bg={useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)')}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        />
        <HStack spacing={8} alignItems={'center'}>
          <MotionBox
            fontWeight="bold"
            fontSize="2xl"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            AC
          </MotionBox>
          <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                <MotionBox
                  px={4}
                  py={2}
                  rounded={'lg'}
                  fontWeight="medium"
                  color={textColor}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('blue.50', 'blue.900'),
                    color: 'blue.500',
                    transform: 'translateY(-2px)',
                  }}
                  cursor="pointer"
                  transition="all 0.2s"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </MotionBox>
              </ScrollLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr={4}
            variant="ghost"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            transition="all 0.2s"
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <MotionBox
          pb={4}
          display={{ md: 'none' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                <ChakraLink
                  px={4}
                  py={2}
                  rounded={'lg'}
                  fontWeight="medium"
                  color={textColor}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('blue.50', 'blue.900'),
                    color: 'blue.500',
                  }}
                  cursor="pointer"
                  transition="all 0.2s"
                >
                  {link.name}
                </ChakraLink>
              </ScrollLink>
            ))}
          </Stack>
        </MotionBox>
      ) : null}
    </MotionBox>
  );
}; 