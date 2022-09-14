import React from 'react'
import './App.css';
import {
  Container,
  Box,
  Heading
} from '@chakra-ui/react'

const App = () => {
  return (
    <>
      <Container>
        <Box borderRadius='lg' bg='red' mb={6} p={3} align='center'>
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
      </Container>
    </>
  )
}

export default App
