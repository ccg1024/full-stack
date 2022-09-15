import React from "react";
import Logo from './logo'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  IconButton,
  useColorModeValue,
  MenuList
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from "./theme-toggle";


const LinkItem = ({ href, path, children }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <>
      <Link
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        href={href}
      >
        {children}
      </Link>
    </>
  )
}

// Container 让内容保持在中间，宽度中等
const Navbar = props => {
  const { path } = props
  return (
    <>
      <Box
        as='nav'
        w='100%'
        bg={useColorModeValue('#ffffff40', '#20202380')}
        style={{ balckdropFilter: 'blur(10px)' }}
        zIndex={1}
        mb={2}
        {...props}
      >
        <Container
          display='flex'
          p={2}
          maxW='container.md'
          wrap='wrap'
          align='center'
          justify='space-between'
        >
          <Flex align='center'>
            <Heading as='h1' size='lg' letterSpacing={ 'tighter' }>
              <Logo />
            </Heading>
          </Flex>
          
          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems='center'
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            ml={{ base: 0, md: 4 }}
          >
            <LinkItem href="/markdown" path={path}>
              Markdown
            </LinkItem>
            <LinkItem href="/others" path={path}>
              Others
            </LinkItem>
          </Stack>
          
          <Box flex={1} align='right'>
            <ThemeToggleButton />
            <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant='outline'
                  aria-label='Options'
                />
                <MenuList>
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    <MenuItem>About</MenuItem>
                  </Link>
                  <Link href="/Markdown" style={{ textDecoration: 'none' }}>
                    <MenuItem>Markdown</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Navbar
