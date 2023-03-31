import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

import Section from './libs/sections'
import { MarkDownGridItem } from './components/grid-item'

const Markdown = () => {
  const [loading, setLoading] = useState(true)
  const [markdownList, setMarkdowList] = useState([])

  useEffect(() => {
    // get markdown lsit from back-end
    axios
      .get('http://localhost:8080/api/v1/markdown')
      .then(response => {
        setMarkdowList(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
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
    </>
  )
}

// class Markdown_ extends Component {
//   state = {
//     markdown_list: []
//   }

//   componentDidMount() {
//     MarkdownService.getInfo().then(res => {
//       this.setState({ markdown_list: res.data })
//     })
//   }

//   render() {
//     return (
//       <>
//         <Container>
//           <AnimatePresence mode="wait" initial={true}>
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -20, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Heading as="h3" mb={4}>
//                 Markdown
//               </Heading>

//               <SimpleGrid columns={[1, 1, 2]} gap={6}>
//                 <Section>
//                   <MarkDownGridItem
//                     id={-1}
//                     title="default_test"
//                     thumbnail="/images/markdown/markdown.png"
//                   ></MarkDownGridItem>
//                 </Section>
//                 {this.state.markdown_list.map((item, index) => {
//                   return (
//                     <Section key={index}>
//                       <MarkDownGridItem
//                         id={item.id}
//                         title={item.noteName}
//                         thumbnail="/images/markdown/markdown.png"
//                         key={index}
//                       ></MarkDownGridItem>
//                     </Section>
//                   )
//                 })}
//               </SimpleGrid>
//             </motion.div>
//           </AnimatePresence>
//         </Container>
//       </>
//     )
//   }
// }

export default Markdown
