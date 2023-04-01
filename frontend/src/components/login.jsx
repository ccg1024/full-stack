import _ from 'lodash'
import axios from 'axios'
import PubSub from 'pubsub-js'
import React, { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

import { pubsubPipe } from '../config/pubsub'
import {
  FormInput,
  FormButton,
  FormErrorMessage,
  FormContainer
} from './form-input'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
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
    console.log(username)
    console.log(password)

    // remove char error
    setUserCharErr('')
    setPswdCharErr('')

    // simple validation of input legitimacy
    if (!/^[a-zA-z0-9_]+$/.test(username)) {
      setUserCharErr('username is empty or include invalide char')
      return
    }

    if (!/^[a-zA-z0-9_]+$/.test(password)) {
      setPswdCharErr('password is empty or include invalide char')
      return
    }

    // using axios and diable button
    e.target.disabled = true
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

  const clickRegiste = () => {
    PubSub.publish(pubsubPipe.loginRegiste, 'registe')
  }

  const colors = {
    containerBackground: useColorModeValue('#202023', 'green.200'),
    containerBoxShadow: useColorModeValue('dark-lg', 'none'),
    containerColor: useColorModeValue('white', 'black'),
    dividerBorderColor: useColorModeValue('white', 'black'),
    linkColor: useColorModeValue('blue.200', 'blue')
  }

  return (
    <>
      <FormContainer
        keyId="login"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        colors={colors}
        modalHead="Login"
      >
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
            <Link href="#" color={colors.linkColor} onClick={clickRegiste}>
              registe
            </Link>
          </Box>
        </Flex>
      </FormContainer>
    </>
  )
}

export default Login
