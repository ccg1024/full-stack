import React, { Component } from 'react'
import {
  Container,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import MarkdownExample from './markdown_example'
import MarkdownContentService from '../services/MarkdownContentService'

const MarkdownBanner = () => {
  return (
    <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
      <Heading as="h5" fontSize={20}>Show markdown container</Heading>
    </Box>
  )
}

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

class ShowMarkdown extends Component {

  state = {
    file_name: ""
  }

  componentDidMount() {
    let { id } = this.props.params
    MarkdownContentService.getInfo(id).then((res) => {
      this.setState({ file_name: res.data })
    }).catch(() => {

    })
  }

  render() {
    return (
      <>
        <Container>
          <MarkdownBanner />
          <MarkdownExample file_name={this.state.file_name} />
        </Container>
      </>
    )
  }

}


export default withParams(ShowMarkdown)
