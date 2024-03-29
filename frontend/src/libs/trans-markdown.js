import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
  Box,
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

import 'katex/dist/katex.min.css'

import MarkdownStyle from '../components/markdown-style'

export const DetailContent = ({ children, colors }) => {
  return (
    <>
      <MarkdownStyle />
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
            return <OrderedList p={0} marginInlineStart="1em" {...props} />
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
