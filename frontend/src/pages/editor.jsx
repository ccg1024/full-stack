import axios from 'axios'
import React, { useRef, useState } from 'react'
import {
  Box,
  Heading,
  Textarea,
  Container,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import 'katex/dist/katex.min.css'
import '../css/markdown_example.css'

import Section from '../libs/sections'
import { DetailContent } from '../libs/trans-markdown'
import Layout from '../components/layout'

const EditorBanner = () => {
  return (
    <Box
      borderRadius="lg"
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      mb={6}
      p={3}
      align="center"
    >
      <Heading as="h5" fontSize={20}>
        Markdown Editor
      </Heading>
    </Box>
  )
}

const Editor = () => {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('Unnamed')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const imgRef = useRef(null)

  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const handleSaveNote = () => {
    if (value.trim() === '') {
      return
    }
    // to find img
    const form = new FormData()
    // let finalImage = {}
    if (imgRef.current) {
      const { current: imgs } = imgRef
      for (let key in imgs) {
        const pat = new RegExp(`.*?!\\[.*?\\]\\(${key}\\)`)
        if (pat.test(value)) {
          // finalImage[key] = imgs[key]
          form.append(key, imgs[key])
        } else {
          URL.revokeObjectURL(imgs[key])
          delete imgs[key]
        }
      }
    }
    form.append('title', title)
    form.append('content', value)

    const token = localStorage.getItem('token')
    axios
      .post('http://127.0.0.1:5000/editor', form, {
        headers: { Authorization: token }
      })
      .then(res => {
        const { status } = res.data
        if (status === 0) {
          // show modal
          onOpen()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const imageChange = e => {
    const [file] = e.target.files
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setValue(v => v + `\n![${file.name}](${tempUrl})`)
      imgRef.current = {
        ...imgRef.current,
        [tempUrl]: file
      }
    }
  }

  const colors = {
    quote: useColorModeValue('whiteAlpha.500', 'blackAlpha.500'),
    code: useColorModeValue('#3D7AED', '#FF63C3')
  }

  return (
    <Layout>
      <Container maxW="container.lg">
        <Section delay={0.1}>
          <EditorBanner />
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" size="lg">
            File title
          </Heading>
          <Input
            mb={4}
            borderColor={useColorModeValue('#000000', '#ffffff')}
            placeholder="Note Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Heading as="h3" size="lg">
            Note content
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} spacing={2} pb={8}>
            <Box>
              <Textarea
                placeholder="# Head1..."
                value={value}
                onChange={handleInputChange}
                height="md"
                spellCheck="false"
                border={1}
                borderStyle="solid"
                borderColor={useColorModeValue('#000000', '#ffffff')}
              />
            </Box>
            <Box
              border={1}
              borderStyle="solid"
              height="md"
              overflowY="auto"
              borderRadius="md"
              padding={2}
            >
              <DetailContent colors={colors}>{value}</DetailContent>
            </Box>
          </SimpleGrid>
        </Section>

        <Section delay={0.3}>
          <Flex justifyContent="right">
            <Input
              type="file"
              accept="image/*"
              onChange={imageChange}
              formEncType="multipart/form-data"
            />
            <Button colorScheme="teal" onClick={handleSaveNote}>
              Save markdown
            </Button>
          </Flex>
        </Section>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save note success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>successful save file</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
}

export default Editor
