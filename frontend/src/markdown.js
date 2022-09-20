import React from "react";
import {
  Container,
  Heading,
  SimpleGrid
} from '@chakra-ui/react'
import Section from "./libs/sections";
import { MarkDownGridItem } from "./components/grid-item";
import { AnimatePresence, motion } from "framer-motion"


const Markdown = () => {
  return (
    <>
      <Container>
        <AnimatePresence
          exitBeforeEnter
          initial={true}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading as="h3" mb={4}>
              Markdown
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} gap={6}>
              <Section>
                <MarkDownGridItem
                  id='markdown_test'
                  title='markdown_test'
                  thumbnail='/images/markdown/markdown.png'>
                  this is a describtion for card
                </MarkDownGridItem>
              </Section>

              <Section>
                <MarkDownGridItem
                  id='markdown'
                  title='markdown'
                  thumbnail='/images/markdown/markdown.png'>
                  this is a describtion for card
                </MarkDownGridItem>

              </Section>
            </SimpleGrid>
          </motion.div>
        </AnimatePresence>
      </Container>
    </>
  )
}

export default Markdown
