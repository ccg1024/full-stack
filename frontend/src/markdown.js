import React, { Component } from "react";
import {
  Container,
  Heading,
  SimpleGrid
} from '@chakra-ui/react'
import Section from "./libs/sections";
import { MarkDownGridItem } from "./components/grid-item";
import { AnimatePresence, motion } from "framer-motion"
import MarkdownService from "./services/MarkdownService";

class Markdown extends Component {

  state = {
    markdown_list: [],
  }

  componentDidMount() {
    MarkdownService.getInfo().then((res) => {
      this.setState({ markdown_list: res.data })
    })
  }

  render() {
    return (
      <>
        <Container>
          <AnimatePresence
            mode='wait'
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
                    id={-1}
                    title="default_test"
                    thumbnail="/images/markdown/markdown.png"
                  >
                  </MarkDownGridItem>
                </Section>
                {
                  this.state.markdown_list.map((item, index) => {
                    return (
                      <Section key={index}>
                        <MarkDownGridItem
                          id={item.id}
                          title={item.noteName}
                          thumbnail='/images/markdown/markdown.png'
                          key={index}>
                        </MarkDownGridItem>
                      </Section>
                    )
                  })
                }
              </SimpleGrid>
            </motion.div>
          </AnimatePresence>
        </Container>
      </>
    )
  }
}

export default Markdown
