import _ from 'lodash'
import axios from 'axios'
import PubSub from 'pubsub-js'
import React, { useState, useRef, useEffect } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  Divider,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'

import { FormInput, FormButton, FormErrorMessage } from './form-input'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userCharErr, setUserCharErr] = useState('')
  const [pswdCharErr, setPswdCharErr] = useState('')
  const loginRef = useRef(null)

  const usernameChange = event => {
    setUsername(event.target.value)
  }
  const passwordChange = event => {
    setPassword(event.target.value)
  }

  const submitData = e => {
    e.preventDefault()
    console.log(username)
    console.log(password)

    // remove char error
    setUserCharErr('')
    setPswdCharErr('')

    // simple validation of input legitimacy
    if (!/^[a-zA-z0-9_]+$/.test(username)) {
      setUserCharErr('username is empty or include invalide char')
    }

    if (!/^[a-zA-z0-9_]+$/.test(password)) {
      setPswdCharErr('password is empty or include invalide char')
    }
  }

  const closeLogin = () => {
    loginRef.current.style.display = 'none'
  }

  useEffect(() => {
    console.log('run sub')
    const token = PubSub.subscribe('login-and-registe', (_msg, data) => {
      if (data === 'login') {
        loginRef.current.style.display = 'block'
      } else {
        loginRef.current.style.display = 'none'
      }
    })
    return () => {
      console.log('run close subscribe')
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <>
      <Container
        ref={loginRef}
        maxW="container.md"
        backgroundColor={useColorModeValue('#202023', 'green.200')}
        position="absolute"
        left="50%"
        top="100px"
        transform="translate(-50%, 0%)"
        borderRadius="md"
        boxShadow={useColorModeValue('dark-lg', 'none')}
        color={useColorModeValue('white', 'black')}
        zIndex={1}
        display="none"
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
                onClick={closeLogin}
              />
            </Box>
          </Flex>
          <Box textAlign={'center'}>
            <Text fontWeight="bold" fontSize="1.2rem" my={4}>
              Login
            </Text>
          </Box>

          <Divider mb={4} borderColor={useColorModeValue('white', 'black')} />

          <form>
            <FormControl>
              <FormLabel fontWeight="bold">User Name</FormLabel>
              <FormInput
                type="text"
                name="username"
                placeholder="username"
                onChange={_.debounce(usernameChange, 500)}
              />
              {userCharErr === '' ? (
                ''
              ) : (
                <FormErrorMessage>{userCharErr}</FormErrorMessage>
              )}
              <FormLabel fontWeight="bold">Passworld</FormLabel>
              <FormInput
                type="password"
                name="password"
                placeholder="password"
                onChange={_.debounce(passwordChange, 500)}
              />
              {pswdCharErr === '' ? (
                ''
              ) : (
                <FormErrorMessage>{pswdCharErr}</FormErrorMessage>
              )}
            </FormControl>

            <FormButton onClick={submitData}>Login</FormButton>
          </form>

          <Flex mt={4} mb={4} justifyContent="space-between">
            <Box>
              <Text>forgot password?</Text>
            </Box>
            <Box>
              <Text>registe</Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export default Login
