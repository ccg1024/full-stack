import React from 'react'
import { Container } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <Container maxWidth="container.lg" marginTop={16}>
      {children}
    </Container>
  )
}

export default Layout
