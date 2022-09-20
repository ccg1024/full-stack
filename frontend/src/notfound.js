import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  Link
} from "@chakra-ui/react"


const NotFound = () => {
  return (
    <>
      <Container>
        <Heading as="h1">Not Found</Heading>
        <Text>The page you&apos;re lokking for was not found.</Text>
        <Divider my={6} />

        <Box my={6} align="center">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal">Return to Home</Button>
          </Link>
        </Box>
      </Container>
    </>
  )
}

export default NotFound
