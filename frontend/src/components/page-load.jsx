import React from 'react'
import { Spinner } from '@chakra-ui/react'

const LoadingPage = () => {
  return (
    <Spinner
      size="xl"
      position="absolute"
      top="50%"
      left="50%"
      ml="calc(0px - var(--spinner-size) / 2)"
      mt="calc(0px- var(--spinner-size) / 2)"
    />
  )
}

export default LoadingPage
