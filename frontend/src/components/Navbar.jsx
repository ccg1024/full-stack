import React from "react";
import {
  Box,
  useColorMode,
  useColorModeValue,
  Text,
  Flex,
  Spacer,
  Link
} from '@chakra-ui/react'


const Navbar = () => {
  const { toggleColorMode } = useColorMode()
  const bg = useColorModeValue('orange.400', 'gray.900')
  const color = useColorModeValue('whitealpha.500', 'gray.50')
  return (
    <>
      <Flex bg={bg} color={color}>
        <Box p={4}>
          <Text>This is a navbar</Text>
        </Box>
        <Spacer />
        <Box p={4}>
          <Flex gap={2}>
            <Link href="#">Markdown</Link>
            <Text>
              Twe
            </Text>
          </Flex>
        </Box>
        <Box p={4} onClick={toggleColorMode} borderWidth='thin'>
          Toggle
        </Box>
      </Flex>
    </>
  )
}

export default Navbar
