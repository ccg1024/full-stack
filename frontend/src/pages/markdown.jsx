import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

import Section from '../libs/sections'
import { MarkDownGridItem } from '../components/grid-item'
import Layout from '../components/layout'
import { useAuth } from '../libs/auth'

const Markdown = () => {
  // got token
  const { token } = useAuth()

  const [loading, setLoading] = useState(true)
  const [markdownList, setMarkdowList] = useState([])

  useEffect(() => {
    // get markdown lsit from back-end
    const token = localStorage.getItem('token')
    axios
      .get('', {
        headers: { Authorization: token }
      })
      .then(response => {
        setMarkdowList(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
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
            <Box mb={6}>
              <Heading>Markdown</Heading>
            </Box>
          </motion.div>
        </AnimatePresence>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            {loading ? (
              <Section delay={0.1}>
                <MarkDownGridItem
                  id={-1}
                  title="default_test"
                  thumbnail="/images/markdown/markdown.png"
                >
                  some thing describtion
                </MarkDownGridItem>
              </Section>
            ) : (
              markdownList.map(item => {
                return (
                  <Section key={item.id}>
                    <MarkDownGridItem
                      id={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                    >
                      {item.content}
                    </MarkDownGridItem>
                  </Section>
                )
              })
            )}
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Markdown
