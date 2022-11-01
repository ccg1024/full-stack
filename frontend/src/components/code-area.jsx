import React from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'


const CodeArea = ({props, children}) => {
  const language = props
  const key = props
  return (
    <SyntaxHighlighter
      key={key}
      language={language}
      style={docco}
      showLineNumbers='true'
      customStyle={{
        marginTop: '2px',
        backgroundColor: useColorModeValue('rgba(255,255,255,0.36)', 'rgba(255,255,255,0.8)'),
        borderRadius: '4px'
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}


// not use
export default CodeArea
