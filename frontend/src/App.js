import React from 'react'
import './css/App.css';
import {
  Container,
  Box,
  Heading,
  Link,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import Section from './libs/sections';
import Paragraph from './libs/paragraph';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BioSection, BioYear } from './libs/bio';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion'
import VoxelDog from './components/voxel-dog';


const App = () => {
  return (
    <>
      <Navbar path="/" />
      <VoxelDog />
      <Container>
        <AnimatePresence
          exitBeforeEnter
          initial={true}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
              This is a full stack project, using React and Spring boot.
            </Box>

            <Box display={{ md: 'flex' }}>
              <Box flexGrow={1} >
                <Heading>
                  William Home
                </Heading>
                <p>a small descript information.</p>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            This is a paragraph information for some work.
            This is a paragraph information for some work.
            This is a paragraph information for some work.
            This is a Link for some {' '}
            <Link href="www.baidu.com">info</Link>.
          </Paragraph>
          <Box align='center' my={4}>
            <Link href='/' style={{ textDecoration: 'none' }}>
              <Button rightIcon={<ChevronRightIcon />} colorScheme='teal'>
                My protfile
              </Button>
            </Link>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2019</BioYear>
            Discover the new coronavirus
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            ...
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I love
          </Heading>
          <Paragraph>
            Some thing like...
          </Paragraph>
        </Section>
      </Container>
    </>
  )
}

export default App
