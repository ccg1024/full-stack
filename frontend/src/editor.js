import React, { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  Container,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  Quote,
  MarkdownTd,
  MarkdownTh,
  MarkdownTr,
  MarkdownLink,
  MarkdownText,
  MarkdownImage,
  MarkdownOList,
  MarkdownTable,
  MarkdownTbody,
  MarkdownThead,
  MarkdownUList,
  MarkdownListItem,
} from "./components/markdown_cutom"
import './css/editor.css'

import ReactMarkdown from 'react-markdown'
import './css/markdown_example.css'
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'


const EditorBanner = () => {
  return (
    <Box borderRadius='lg' bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} mb={6} p={3} align='center'>
      <Heading as="h5" fontSize={20}>Markdown Editor</Heading>
    </Box>
  )
}

const Editor = () => {

  let [value, setValue] = useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <>
      <Container>
        <EditorBanner />
      </Container>
      <SimpleGrid
        className="editor_parent"
        columns={[1, 1, 2]}
        spacing={2}
        pb={8}
      >
        <Box className='raw_editor'>
          <Textarea
            placeholder="# Head1..."
            value={value}
            onChange={handleInputChange}
            height="md"
            spellCheck="false"
            border={1}
            borderStyle='solid'
            borderColor={useColorModeValue("#000000", "#ffffff")}
          />
        </Box>
        <Box className='preview'
          border={1}
          borderStyle='solid'
          height='md'
          overflowY='auto'
          borderRadius='md'
        >
          <ReactMarkdown
            customStyle={{ innerHeight: '100%' }}
            className="markdown_editor"
            children={value}
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
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={docco}
                    language={match[1]}
                    showLineNumbers='true'
                    PreTag="div"
                    customStyle={{ marginTop: '10px', marginBottom: '10px', borderRadius: '5px' }}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          />
        </Box>
      </SimpleGrid>
    </>
  )
}


export default Editor
