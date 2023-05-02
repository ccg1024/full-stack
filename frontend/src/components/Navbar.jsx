import PubSub, { publish } from 'pubsub-js'
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
import { useAuth } from '../libs/auth'

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

const showLogin = (mode = 'login') => {
  PubSub.publish(pubsubPipe.loginRegiste, mode)
}

// Container 让内容保持在中间，宽度中等
const Navbar = () => {
  // got login
  const { token, onLogout } = useAuth()

  const colors = {
    bg: useColorModeValue('#88ccca', '#88ccca'),
    colorActive: useColorModeValue('black', 'black'),
    colorInactive: useColorModeValue('black', 'white')
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
            {token ? (
              <>
                <RouteLinkItem to="/markdown">Markdown</RouteLinkItem>
                <RouteLinkItem to="/editor">Editor</RouteLinkItem>
                <Link
                  href="#"
                  color={colors.colorInactive}
                  _hover={{ textDecoration: 'none' }}
                  onClick={onLogout}
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
                  {token ? (
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
                      <Link
                        href="/"
                        color={colors.colorInactive}
                        _hover={{ textDecoration: 'none' }}
                        onClick={onLogout}
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
