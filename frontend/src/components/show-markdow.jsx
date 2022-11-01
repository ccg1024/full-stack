import React, { Component } from 'react'
import {
  Container,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import MarkdownExample from './markdown_example'
// import MarkdownContentService from '../services/MarkdownContentService'

const MarkdownBanner = () => {
  return (
    <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
      <Heading as="h5" fontSize={20}>Show markdown container</Heading>
    </Box>
  )
}


class ShowMarkdown extends Component {

  state = {
    markdown_file: "test1.md"
  }

  componentDidMount() {
    // MarkdownContentService.getInfo().then((res) => {
    //   this.setState({ markdown_content: res.data })
    // })

    // this.setState({ markdown_content: require("../sources/markdown/test.json") })
  }

  render() {
    return (
      <>
        <Container>
          <MarkdownBanner />
          <MarkdownExample file_name={this.state.markdown_file}/>
        </Container>
      </>
    )
  }
}

export default ShowMarkdown
