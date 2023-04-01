import _ from 'lodash'
import axios from 'axios'
import PubSub from 'pubsub-js'
import { CloseIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  Divider,
  Flex,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

import { pubsubPipe } from '../config/pubsub'
import { FormInput, FormButton, FormErrorMessage } from './form-input'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [userCharErr, setUserCharErr] = useState('')
  const [pswdCharErr, setPswdCharErr] = useState('')
  const [loginMessage, setLoginMessage] = useState('')

  const usernameChange = event => {
    setUsername(event.target.value)
  }
  const passwordChange = event => {
    setPassword(event.target.value)
  }

  const submitData = e => {
    e.preventDefault()
    e.target.disabled = true
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

    // using axios
    axios
      .post('http://127.0.0.1:5000/api/login', { username, password })
      .then(res => {
        const { status } = res.data
        if (status === 0) {
          setIsVisible(false)
          const { token } = res.data
          localStorage.setItem('token', token)
          PubSub.publish(pubsubPipe.authenticate, true)
        } else {
          e.target.disabled = false
          setLoginMessage('wrong username or password')
          // or
          // setLoginMessage(res.data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const closeLogin = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const token = PubSub.subscribe(pubsubPipe.loginRegiste, (_msg, data) => {
      if (data === 'login') {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  const colors = {
    containerBackground: useColorModeValue('#202023', 'green.200'),
    containerBoxShadow: useColorModeValue('dark-lg', 'none'),
    containerColor: useColorModeValue('white', 'black'),
    dividerBorderColor: useColorModeValue('white', 'black'),
    linkColor: useColorModeValue('blue.200', 'blue')
  }

  return (
    <>
      <AnimatePresence model="wait" initial={true}>
        {isVisible && (
          <motion.div
            key="login"
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
                      onClick={closeLogin}
                    />
                  </Box>
                </Flex>
                <Box textAlign={'center'}>
                  <Text fontWeight="bold" fontSize="1.2rem" my={4}>
                    Login
                  </Text>
                </Box>

                <Divider mb={4} borderColor={colors.dividerBorderColor} />

                <form>
                  <FormControl>
                    <FormLabel fontWeight="bold">User Name</FormLabel>
                    <FormInput
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={_.debounce(usernameChange, 16)}
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
                      onChange={_.debounce(passwordChange, 16)}
                    />
                    {pswdCharErr === '' ? (
                      ''
                    ) : (
                      <FormErrorMessage>{pswdCharErr}</FormErrorMessage>
                    )}
                  </FormControl>

                  {loginMessage ? (
                    <FormErrorMessage>{loginMessage}</FormErrorMessage>
                  ) : (
                    ''
                  )}

                  <FormButton onClick={submitData}>Login</FormButton>
                </form>

                <Flex mt={4} mb={4} justifyContent="space-between">
                  <Box>
                    <Text>forgot password?</Text>
                  </Box>
                  <Box>
                    <Link href="#" color={colors.linkColor}>
                      registe
                    </Link>
                  </Box>
                </Flex>
              </Box>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Login
