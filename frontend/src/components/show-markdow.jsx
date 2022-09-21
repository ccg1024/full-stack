import {
  Container,
  Heading,
  Box,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

const ShowMarkdown = () => {
  return (
    <>
      <Container>
        <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
          <Heading as="h5" fontSize={20}>Show markdown container</Heading>
        </Box>
        <Box>
          <Text>This is the container</Text>
        </Box>
      </Container>
    </>
  )
}

export default ShowMarkdown
