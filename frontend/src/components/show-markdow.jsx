import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs'
import {
  Container,
  Heading,
  Box,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react'

import { DetailContent } from '../libs/trans-markdown'

const MarkdownBanner = ({ id }) => {
  const [pubNote, setPubNote] = useState(false)
  const [loading, setLoading] = useState(true)
  const timer = useRef(null)

  const togglePub = () => {
    console.log('run togglePub')
    setPubNote(!pubNote)
    if (timer.current === null || timer.current === undefined) {
      timer.current = -1
    }
  }

  useEffect(() => {
    axios
      .get('')
      .then(res => {
        const { status } = res.data
        if (status === 0) {
          const { isPub } = res.data
          setPubNote(isPub)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log('got err: ', err)
      })
    // TEST: just test code, ginore ajax
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        console.log('change pub options, sent ajax')
        axios
          .post('', { id, isPub: pubNote })
          .then(_res => {
            console.log('got message from server')
          })
          .catch(err => {
            console.log('got err: ', err)
          })
      }, 1000)
    }
  }, [pubNote])

  return (
    <Box
      borderRadius="lg"
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      mb={6}
      p={3}
      align="center"
      position="relative"
    >
      <Heading as="h5" fontSize={20}>
        Show markdown container
      </Heading>
      <Box
        position="absolute"
        right="0px"
        top="50%"
        transform="translate(0, -50%)"
        mr={4}
        fontSize="1.2rem"
        cursor="pointer"
        onClick={togglePub}
        title="pub note"
      >
        {loading ? (
          <Spinner />
        ) : pubNote ? (
          <BsFillEyeFill />
        ) : (
          <BsFillEyeSlashFill />
        )}
      </Box>
    </Box>
  )
}

const ShowDetail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [noteContent, setNoteContent] = useState('')

  const colors = {
    quote: useColorModeValue('whiteAlpha.500', 'blackAlpha.500'),
    code: useColorModeValue('#3D7AED', '#FF63C3')
  }

  useEffect(() => {
    // according axios to get note content
    console.log(id)
    if (id === '-1') {
      setLoading(false)
      fetch('/default.md')
        .then(r => r.text())
        .then(text => setNoteContent(text))
    }
    axios
      .get('')
      .then(response => {
        setNoteContent(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  return (
    <Container maxW="container.lg">
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MarkdownBanner id={id} />
          {loading ? (
            <Spinner
              size="xl"
              position="absolute"
              bottom="calc(0px - var(--spinner-size)) - 10px"
              left="50%"
              ml="calc(0px - var(--spinner-size) / 2)"
            />
          ) : (
            <DetailContent colors={colors}>{noteContent}</DetailContent>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  )
}
export default ShowDetail
