import React from 'react'
import { Input, Button, useColorModeValue, Box, Text } from '@chakra-ui/react'

export const FormInput = ({ name, type, placeholder, onChange }) => {
  return (
    <Input
      id={name}
      type={type}
      name={name}
      autoComplete="off"
      onChange={onChange}
      mb={{ base: 2, md: 4 }}
      placeholder={placeholder}
      borderColor={useColorModeValue('white', 'black')}
      _placeholder={{ color: useColorModeValue('gray.500', 'gray.600') }}
      _hover={{ borderColor: useColorModeValue('white', 'black') }}
    />
  )
}

export const FormButton = ({ onClick, children }) => {
  return (
    <Button
      w="100%"
      type="submit"
      onClick={onClick}
      mt={{ base: 2, md: 4 }}
      color={useColorModeValue('black', 'white')}
      backgroundColor={useColorModeValue('teal.200', '#202023')}
      _hover={{ backgroundColor: useColorModeValue('green.200', 'black') }}
    >
      {children}
    </Button>
  )
}

export const FormErrorMessage = ({ children }) => {
  return (
    <Box mb={2} mt={{ md: -2 }}>
      <Text color="red" ml={2}>
        {children}
      </Text>
    </Box>
  )
}
