import React, { Component } from 'react'
import {
  Container,
  Heading,
  Box,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import MarkdownContentService from '../services/MarkdownContentService'

const MarkdownBanner = () => {
  return (
    <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
      <Heading as="h5" fontSize={20}>Show markdown container</Heading>
    </Box>
  )
}

class ShowMarkdown extends Component {

  state = {
    markdown_content: []
  }

  componentDidMount() {
    MarkdownContentService.getInfo().then((res) => {
      this.setState({ markdown_content: res.data })
    })
  }

  render() {
    return (
      <>
        <Container>
          <MarkdownBanner />
          <Box>
            <Text>This is the container</Text>
          </Box>
          <p>{this.state.markdown_content}</p>
        </Container>
      </>
    )
  }
}

export default ShowMarkdown
