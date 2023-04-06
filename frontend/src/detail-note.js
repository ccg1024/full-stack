import axios from 'axios'
import { Global } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  useColorModeValue,
  Center
} from '@chakra-ui/react'

import Section from './libs/sections'
import { DetailContent } from './libs/trans-markdown'

const DetailHeadStyle = () => {
  return (
    <Global
      styles={{
        '.icon-span': {
          margin: '0 2px'
        },
        '.time-span': {
          marginLeft: '10px',
          padding: '0 2px',
          backgroundColor: useColorModeValue('#EDF2F7', '#718096'),
          borderRadius: '5px'
        }
      }}
    />
  )
}

const DetailHead = ({ title, pubTime }) => {
  const showTime = pubTime ? pubTime : '2023'
  const showTitle = title ? title : 'Test'
  return (
    <Box>
      <DetailHeadStyle />
      <Flex alignItems="center" mb={4}>
        <Link to="/">
          <Text color={useColorModeValue('#3d7aed', '#ff63c3')}>Home</Text>
        </Link>
        <span className="icon-span">
          <BsChevronRight />
        </span>
        <Heading as="h3" size="lg">
          {showTitle}
        </Heading>
        <span className="time-span">{showTime}</span>
      </Flex>
    </Box>
  )
}

const DetailNote = () => {
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState()
  const [search] = useSearchParams()
  const id = search.get('id')

  const colors = {
    quote: useColorModeValue('whiteAlpha.500', 'blackAlpha.500'),
    code: useColorModeValue('#3D7AED', '#FF63C3')
  }

  useEffect(() => {
    axios
      .get('')
      .then(res => {
        const { status } = res.data
        if (status === 0) {
          setLoading(false)
          setNote(res.data.content)
        }
      })
      .catch(err => {
        console.log('got err from detail-note: ', err)
      })

    // TEST: just for fron test
    setTimeout(() => {
      setLoading(false)
      fetch('/default.md')
        .then(r => r.text())
        .then(text => setNote(text))
    }, 2000)
  }, [])

  return (
    <Container maxW="container.lg">
      <AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailHead />
        </motion.div>
      </AnimatePresence>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <Section delay={0.2}>
          <DetailContent colors={colors}>{note}</DetailContent>
        </Section>
      )}
    </Container>
  )
}

export default DetailNote
