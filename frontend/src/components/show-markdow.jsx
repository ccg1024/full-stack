import axios from 'axios'
import { Global } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import {
  Container,
  Heading,
  Box,
  useColorModeValue,
  Spinner,
  Link,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Th,
  Td,
  Code
} from '@chakra-ui/react'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import 'katex/dist/katex.min.css'

const MarkdownBanner = () => {
  return (
    <Box
      borderRadius="lg"
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      mb={6}
      p={3}
      align="center"
    >
      <Heading as="h5" fontSize={20}>
        Show markdown container
      </Heading>
    </Box>
  )
}

const DetailContent = ({ children, colors }) => {
  return (
    <>
      <Global
        styles={{
          '.preview-style': {
            h1: {
              fontSize: '2rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h1:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            },
            h2: {
              fontSize: '1.8rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h2:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            },
            h3: {
              fontSize: '1.6rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h3:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            },
            h4: {
              fontSize: '1.4rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h4:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            },
            h5: {
              fontSize: '1.2rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h5:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            },
            h6: {
              fontSize: '1rem',
              background:
                'linear-gradient(to right, #3D7AED, #FF63C3) no-repeat right bottom',
              backgroundSize: '0px 2px',
              transition: 'background-size 500ms'
            },
            'h6:hover': {
              backgroundPositionX: 'left',
              backgroundSize: '100% 2px'
            }
          }
        }}
      />
      <ReactMarkdown
        className="preview-style"
        children={children}
        components={{
          blockquote: ({ node, ...props }) => {
            return (
              <Box
                borderRadius="5px"
                bg={colors.quote}
                pl={2}
                pr={2}
                mt={2}
                mb={2}
                pt="1px"
                pb="1px"
                boxShadow="lg"
                {...props}
              />
            )
          },
          a: ({ node, ...props }) => {
            return <Link textAlign="justify" {...props} />
          },
          ul: ({ node, ...props }) => {
            props.ordered = 'false'
            return <UnorderedList p={0} {...props} />
          },
          ol: ({ node, ...props }) => {
            props.ordered = 'true'
            return <OrderedList p={0} marginInlineStart="2em" {...props} />
          },
          li: ({ node, ...props }) => {
            props.ordered = props.ordered.toString()
            return <ListItem textAlign="justify" {...props} />
          },
          p: ({ node, ...props }) => {
            return <Text {...props} />
          },
          table: ({ node, ...props }) => {
            return (
              <TableContainer mb={2} mt={2} {...props}>
                <Table variant="simple" textAlign="left" {...props} />
              </TableContainer>
            )
          },
          thead: ({ node, ...props }) => {
            return <Thead {...props} />
          },
          tbody: ({ node, ...props }) => {
            return <Tbody {...props} />
          },
          tr: ({ node, ...props }) => {
            delete props.isHeader
            return <Tr {...props} />
          },
          td: ({ node, ...props }) => {
            delete props.isHeader
            return <Td {...props} />
          },
          th: ({ node, ...props }) => {
            delete props.isHeader
            return <Th fontSize="1em" {...props} />
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={docco}
                language={match[1]}
                showLineNumbers="true"
                PreTag="div"
                customStyle={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px'
                }}
                {...props}
              />
            ) : (
              <Code
                fontWeight="bold"
                color={colors.code}
                className={className}
                fontSize="1em"
                {...props}
              >
                {children}
              </Code>
            )
          }
        }}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        sourcePos={true}
      />
    </>
  )
}

const ShowDetail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [noteContent, setNoteContent] = useState('')

  const colors = {
    quote: useColorModeValue('whiteAlpha.500', 'blackAlpha.500'),
    code: useColorModeValue('#3D7AED', '#FF63C3')
  }

  useEffect(() => {
    // according axios to get note content
    console.log(id)
    if (id === '-1') {
      setLoading(false)
      fetch('http://localhost:3000/default.md')
        .then(r => r.text())
        .then(text => setNoteContent(text))
    }
    axios
      .get()
      .then(response => {
        setNoteContent(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  return (
    <Container maxW="container.lg">
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MarkdownBanner />
          {loading ? (
            <Spinner
              size="xl"
              position="absolute"
              bottom="calc(0px - var(--spinner-size)) - 10px"
              left="50%"
              ml="calc(0px - var(--spinner-size) / 2)"
            />
          ) : (
            <DetailContent colors={colors}>{noteContent}</DetailContent>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  )
}

// function withParams(Component) {
//   return props => <Component {...props} params={useParams()} />
// }

// class ShowMarkdown extends Component {
//   state = {
//     file_name: ''
//   }

//   componentDidMount() {
//     let { id } = this.props.params
//     MarkdownContentService.getInfo(id)
//       .then(res => {
//         this.setState({ file_name: res.data })
//       })
//       .catch(() => {})
//   }

//   render() {
//     return (
//       <>
//         <Container>
//           <MarkdownBanner />
//           <MarkdownExample file_name={this.state.file_name} />
//         </Container>
//       </>
//     )
//   }
// }

// export default withParams(ShowMarkdown)
export default ShowDetail
