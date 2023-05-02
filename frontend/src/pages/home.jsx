import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Link as MyRouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Heading,
  Link,
  Button,
  useColorModeValue,
  Text,
  SimpleGrid
} from '@chakra-ui/react'

import Section from '../libs/sections'
import Paragraph from '../libs/paragraph'
import Layout from '../components/layout'
import { BioSection, BioYear } from '../libs/bio'
import { GridItem } from '../components/grid-item'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [markList, setMarkList] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://127.0.0.1:5000/api/notes', {
        headers: { Authorization: token }
      })
      .then(res => {
        const { status } = res.data
        if (status === 0) {
          setLoading(false)
          setMarkList(res.data.notes)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Layout>
      <Container maxW="container.lg">
        <AnimatePresence mode="wait" initial={true}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              borderRadius="lg"
              bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
              mb={6}
              p={3}
              align="center"
            >
              A online personal portfolio
            </Box>

            <Box display={{ md: 'flex' }}>
              <Box flexGrow={1}>
                <Heading>Crazyboy</Heading>
                <Text>A Online personal portfolio</Text>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            this project builds a small online portfolio website by using the
            react framework and the spring boot framework. The front-end tech
            stack used are: React, Chakra-ui, threeJS, etc. The source address
            is{' '}
            <Link href="https://github.com/ccg1024/full-stack/tree/main/frontend">
              here
            </Link>
            .
          </Paragraph>
          <Box align="center" my={4}>
            <MyRouterLink to="/">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My protfile
              </Button>
            </MyRouterLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2019</BioYear>
            Discover the new coronavirus
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            ...
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I love
          </Heading>
          <Paragraph>Some thing like...</Paragraph>
        </Section>

        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            Details
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            {loading ? (
              <GridItem
                id={-1}
                title="default-test"
                thumbnail="/images/markdown/markdown.png"
              >
                this is default show markdown, just for test
              </GridItem>
            ) : (
              markList.map(item => {
                return (
                  <GridItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    thumbnail="/images/markdown/markdown.png"
                  >
                    this is default show markdown, just for test
                  </GridItem>
                )
              })
            )}
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Home
