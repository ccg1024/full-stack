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
    // MarkdownContentService.getInfo().then((res) => {
    //   this.setState({ markdown_content: res.data })
    // })

    this.setState({ markdown_content: require("../sources/markdown/test.json") })
  }

  render() {
    return (
      <>
        <Container>
          <MarkdownBanner />
          <Box as='div' pb={5}>
          {
            this.state.markdown_content.map((item, index) => {
              if (item.tag === 'h1') {
                return <Heading as='h1' key={index} fontSize={60}>{ item.content }</Heading>
              } else if (item.tag === 'h2') {
                return <Heading as='h2' key={index} fontSize={50}>{ item.content }</Heading>
              } else if (item.tag === 'h3') {
                return <Heading as='h3' key={index} fontSize={40}>{ item.content }</Heading>
              } else if (item.tag === 'h4') {
                return <Heading as='h4' key={index} fontSize={30}>{ item.content }</Heading>
              } else if (item.tag === 'h5') {
                return <Heading as='h5' key={index} fontSize={20}>{ item.content }</Heading>
              } else if (item.tag === 'h6') {
                return <Heading as='h6' key={index} fontSize={10}>{ item.content }</Heading>
              }
            })
          }
          </Box>
        </Container>
      </>
    )
  }
}

export default ShowMarkdown
