import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Text,
  Image,
  ListItem,
  OrderedList,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Code,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import '../css/markdown_example.css'
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'


const Quote = ({children}) => {
  return (
    <Box
      borderRadius='5px'
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      pl={2}
      mt={2}
      mb={2}
      pt={2}
      pb={2}
    >
      {children}
    </Box>
  )
}

const MarkdownLink = ({href, props, children}) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

const MarkdownTable = ({children}) => {
  return (
    <TableContainer mb={2} mt={2}>
      <Table variant='simple'>
        {children}
      </Table>
    </TableContainer>
  )
}

const MarkdownThead = ({props, children}) => {
  return (
    <Thead {...props}>
      {children}
    </Thead>
  )
}

const MarkdownTbody = ({props, children}) => {
  return (
    <Tbody {...props}>
      {children}
    </Tbody>
  )
}

const MarkdownTr = ({props, children}) => {
  return (
    <Tr {...props}>
      {children}
    </Tr>
  )
}

const MarkdownTh = ({props, children}) => {
  return (
    <Th {...props}>
      {children}
    </Th>
  )
}

const MarkdownTd = ({props, children}) => {
  return (
    <Td {...props}>
      {children}
    </Td>
  )
}

const MarkdownText = ({props, children}) => {
  return (
    <Text {...props}>
      {children}
    </Text>
  )
}

const MarkdownImage = ({src, props, children}) => {
  return (
    <Image src={src} {...props}>
      {children}
    </Image>
  )
}

const MarkdownListItem = ({props, children}) => {
  return (
    <ListItem {...props}>
      {children}
    </ListItem>
  )
}

const MarkdownUList = ({props, children}) => {
  return (
    <UnorderedList {...props}>
      {children}
    </UnorderedList>
  )
}

const MarkdownOList = ({props, children}) => {
  return (
    <OrderedList {...props}>
      {children}
    </OrderedList>
  )
}


const MarkdownExample = ({file_name}) => {
  const [post, setPost] = useState('')

  useEffect(() => {
    import(`../sources/markdown/${file_name}`).then(res => {
      fetch(res.default).then(res => res.text()).then(res => setPost(res))
    })
  })

  return <ReactMarkdown
    className="markdown_example"
    children={post}
    components={{
      blockquote: Quote,
      a: MarkdownLink,
      ul: MarkdownUList,
      ol: MarkdownOList,
      li: MarkdownListItem,
      p: MarkdownText,
      img: MarkdownImage,
      table: MarkdownTable,
      thead: MarkdownThead,
      tbody: MarkdownTbody,
      tr: MarkdownTr,
      td: MarkdownTd,
      th: MarkdownTh,
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={docco}
            language={match[1]}
            showLineNumbers='true'
            PreTag="div"
            customStyle={{marginTop: '10px', marginBottom: '10px', borderRadius: '5px'}}
            {...props}
          />
        ) : (
            <Code className={className} {...props}>
              {children}
            </Code>
          )
      }
    }}
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
    />
}


export default MarkdownExample
