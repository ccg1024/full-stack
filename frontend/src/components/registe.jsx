import _ from 'lodash'
import axios from 'axios'
import PubSub from 'pubsub-js'
import React, { useState, useEffect } from 'react'
import { IoLogoGithub, IoLogoWechat } from 'react-icons/io5'
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Link,
  Center,
  useColorModeValue
} from '@chakra-ui/react'
import { pubsubPipe } from '../config/pubsub'
import {
  FormInput,
  FormButton,
  FormErrorMessage,
  FormContainer
} from './form-input'

const Registe = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordB, setPasswordB] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [userCharErr, setUserCharErr] = useState('')
  const [pswdCharErr, setPswdCharErr] = useState('')
  const [registeMessage, setRegisteMessage] = useState('')

  const usernameChange = e => setUsername(e.target.value)
  const passwordChange = e => setPassword(e.target.value)
  const passwordBChange = e => setPasswordB(e.target.value)

  const submitData = e => {
    e.preventDefault()
  }

  useEffect(() => {
    const token = PubSub.subscribe(pubsubPipe.loginRegiste, (_msg, data) => {
      if (data === 'registe') {
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
      <FormContainer
        keyId="registe"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        colors={colors}
        modalHead="Registe"
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
            {userCharErr ? (
              ''
            ) : (
              <FormErrorMessage>{userCharErr}</FormErrorMessage>
            )}
            <FormLabel fontWeight="bold">Password</FormLabel>
            <FormInput
              type="password"
              name="password"
              placeholder="password"
              onChange={_.debounce(passwordChange, 16)}
            />
            {pswdCharErr ? (
              ''
            ) : (
              <FormErrorMessage>{pswdCharErr}</FormErrorMessage>
            )}
            <FormLabel fontWeight="bold">Password again</FormLabel>
            <FormInput
              type="password"
              name="passwordB"
              placeholder="password again"
              onChange={_.debounce(passwordBChange, 16)}
            />
          </FormControl>

          {registeMessage ? (
            <FormErrorMessage>{registeMessage}</FormErrorMessage>
          ) : (
            ''
          )}

          <FormButton onClick={submitData}>Registe</FormButton>
        </form>

        <Flex my={4} direction="column">
          <Box>
            <Text>Registe with other account?</Text>
          </Box>
          <Center>
            <Link
              href="#"
              ml={2}
              color={useColorModeValue('white', 'black')}
              title="github"
            >
              <IoLogoGithub fontSize="1.5rem" />
            </Link>
            <Link
              href="#"
              ml={2}
              color={useColorModeValue('white', 'black')}
              title="wechat"
            >
              <IoLogoWechat fontSize="1.5rem" />
            </Link>
          </Center>
        </Flex>
      </FormContainer>
    </>
  )
}

export default Registe
