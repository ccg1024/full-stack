import React from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <>
      <Container maxW="container.lg">
        <AnimatePresence mode="wait" initial={true}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading as="h1">Not Found</Heading>
            <Text>The page you&apos;re lokking for was not found.</Text>
            <Divider my={6} />

            <Box my={6} align="center">
              <Link to="/">
                <Button colorScheme="teal">Return to Home</Button>
              </Link>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </>
  )
}

export default NotFound
