import React from 'react'
import { Global } from '@emotion/react'

const MarkdownStyle = () => {
  return (
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
  )
}

export default MarkdownStyle
