import PubSub from 'pubsub-js'
import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  IconButton,
  useColorModeValue,
  MenuList,
  Link
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { Global } from '@emotion/react'

import Logo from './logo'
import { pubsubPipe } from '../config/pubsub'
import ThemeToggleButton from './theme-toggle'

const NavbarLinkStyle = ({ colors }) => {
  return (
    <Global
      styles={{
        '.active-link': {
          backgroundColor: colors.bg,
          padding: '6px',
          color: colors.colorActive
        },
        '.inactive-link': {
          padding: '6px',
          color: colors.colorInactive
        }
      }}
    />
  )
}

const RouteLinkItem = ({ to, children }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
      to={to}
    >
      {children}
    </NavLink>
  )
}

// Container 让内容保持在中间，宽度中等
const Navbar = () => {
  const colors = {
    bg: useColorModeValue('#88ccca', '#88ccca'),
    colorActive: useColorModeValue('black', 'black'),
    colorInactive: useColorModeValue('black', 'white')
  }
  const [loginToken, setLoginToken] = useState(localStorage.getItem('token'))

  const showLogin = (module = 'login') => {
    if (module === 'login') {
      PubSub.publish(pubsubPipe.loginRegiste, 'login')
    } else if (module === 'registe') {
      PubSub.publish(pubsubPipe.loginRegiste, 'registe')
    }
  }

  useEffect(() => {
    const token = PubSub.subscribe(pubsubPipe.authenticate, (_msg, _data) => {
      setLoginToken(localStorage.getItem('token'))
    })

    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  const handleLoginOut = () => {
    localStorage.removeItem('token')
    setLoginToken(null)
    // maybe some code to tell server login out
  }

  return (
    <>
      <NavbarLinkStyle colors={colors} />
      <Box
        position="fixed"
        top={0}
        as="nav"
        w="100%"
        bg={useColorModeValue('#ffffff40', '#20202380')}
        style={{ balckdropFilter: 'blur(10px)' }}
        zIndex={2}
      >
        <Container
          display="flex"
          p={2}
          maxW="container.lg"
          wrap="wrap"
          align="center"
          justify="space-between"
        >
          <Flex align="center">
            <Heading as="h1" size="lg" letterSpacing={'tight'}>
              <Logo />
            </Heading>
          </Flex>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            ml={{ base: 0, md: 4 }}
          >
            {loginToken ? (
              <>
                <RouteLinkItem to="/markdown">Markdown</RouteLinkItem>
                <RouteLinkItem to="/editor">Editor</RouteLinkItem>
                <RouteLinkItem to="/others">Others</RouteLinkItem>
                <Link
                  href="/"
                  color={colors.colorInactive}
                  _hover={{ textDecoration: 'none' }}
                  onClick={handleLoginOut}
                >
                  Login out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="#"
                  color={colors.colorInactive}
                  onClick={() => showLogin('login')}
                  _hover={{ textDecoration: 'none' }}
                >
                  Login
                </Link>

                <Link
                  href="#"
                  color={colors.colorInactive}
                  onClick={() => showLogin('registe')}
                  _hover={{ textDecoration: 'none' }}
                >
                  registe
                </Link>
              </>
            )}
          </Stack>

          <Box flex={1} align="right">
            <ThemeToggleButton />
            <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Options"
                />
                <MenuList>
                  {loginToken ? (
                    <>
                      <NavLink to="/">
                        <MenuItem>About</MenuItem>
                      </NavLink>
                      <NavLink to="/markdown">
                        <MenuItem>Markdown</MenuItem>
                      </NavLink>
                      <NavLink to="/editor">
                        <MenuItem>Editor</MenuItem>
                      </NavLink>
                      <NavLink to="/others">
                        <MenuItem>Others</MenuItem>
                      </NavLink>
                      <Link
                        href="/"
                        color={colors.colorInactive}
                        _hover={{ textDecoration: 'none' }}
                        onClick={handleLoginOut}
                      >
                        <MenuItem>Login out</MenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="#"
                        color={colors.colorInactive}
                        onClick={() => showLogin('login')}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Login</MenuItem>
                      </Link>
                      <Link
                        href="#"
                        color={colors.colorInactive}
                        onClick={() => showLogin('registe')}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <MenuItem>Registe</MenuItem>
                      </Link>
                    </>
                  )}
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
