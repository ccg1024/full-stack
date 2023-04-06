import { Link } from 'react-router-dom'
import { Box, Text, Image } from '@chakra-ui/react'

export const GridItem = ({ children, id, title, thumbnail }) => {
  return (
    <Box w="100%" textAlign="center">
      <Link to={`/detail-markdown/?id=${id}`}>
        <Image
          src={thumbnail}
          alt={title}
          placeholder="blur"
          style={{ borderRadius: '12px' }}
        />
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
        <Text fontSize={14}>{children}</Text>
      </Link>
    </Box>
  )
}

export const MarkDownGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" align="center">
    <Link to={`/markdown/${id}`}>
      <Image
        src={thumbnail}
        alt={title}
        placeholder="blur"
        style={{ borderRadius: '12px' }}
      />
      <Text mt={2} fontSize={20}>
        {title}
      </Text>
      <Text fontSize={14}>{children}</Text>
    </Link>
  </Box>
)
