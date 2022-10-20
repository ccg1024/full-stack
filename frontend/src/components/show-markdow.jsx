import React, { Component } from 'react'
import {
  Container,
  Heading,
  Box,
  Text,
  useColorModeValue,
  Link,
  Image
} from '@chakra-ui/react'
import MarkdownContentService from '../services/MarkdownContentService'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another

const MarkdownBanner = () => {
  return (
    <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
      <Heading as="h5" fontSize={20}>Show markdown container</Heading>
    </Box>
  )
}

const QuoteContent = ({props, children}) => {
  const key = props
  return (
    <Box borderRadius='sm' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} key={key} mt={2} mb={2} pt={2} pb={2}>
      <Text key={key}>{children}</Text>
    </Box>
  )
}

const MyCodeArea = () => {
  const [code, setCode] = React.useState(`function add(a, b) {\n  return a + b;\n}`)
  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      />
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
              } else if (item.tag === 'link') {
                return <Link href={item.href} key={index}>{ item.content }</Link>
              } else if (item.tag === 'img') {
                return <Image src={item.src} alt={item.alt} key={index}/>
              } else if (item.tag === 'quote') {
                return <QuoteContent key={index}>{ item.content }</QuoteContent>
              } else if (item.tag === 'code-area') {
                return <MyCodeArea/>
              }
              return <Text key={index}> The tag { item.tag } is not implement.</Text>
            })
          }
          </Box>
        </Container>
      </>
    )
  }
}

export default ShowMarkdown
