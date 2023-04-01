import React from 'react'
import {
  Input,
  Button,
  useColorModeValue,
  Box,
  Text,
  Container,
  Flex,
  Divider
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'

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

export const FormContainer = ({
  keyId,
  isVisible,
  setIsVisible,
  colors,
  modalHead,
  children
}) => {
  const closeModal = () => setIsVisible(false)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={keyId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container
            maxW="container.md"
            backgroundColor={colors.containerBackground}
            position="absolute"
            left="50%"
            top="100px"
            transform="translate(-50%, 0%)"
            borderRadius="md"
            boxShadow={colors.containerBoxShadow}
            color={colors.containerColor}
            zIndex={10}
            transition="display 0.5s"
          >
            <Box padding={{ base: 2, md: 6 }} paddingX={{ md: 10 }}>
              <Flex justifyContent="right">
                <Box>
                  <CloseIcon
                    _hover={{
                      cursor: 'pointer',
                      transform: 'scale(1.5)',
                      transition: 'transform 0.5s'
                    }}
                    transition="transform 0.5s"
                    onClick={closeModal}
                  />
                </Box>
              </Flex>
              <Box textAlign={'center'}>
                <Text fontWeight="bold" fontSize="1.2rem" my={4}>
                  {modalHead}
                </Text>
              </Box>

              <Divider mb={4} borderColor={colors.dividerBorderColor} />
              {children}
            </Box>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
