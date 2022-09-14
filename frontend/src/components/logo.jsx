import { Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'


const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  aligh-items: center;
  height: 30px;
  line-height: 20px;
  padding: 0px;

  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const footPrintImg = `/images/footprint${useColorModeValue('', '-dark')}.png`

  return (
    <Link href='/'>
      <LogoBox>
        <Image src={footPrintImg} width={5} height={5} alt='logo'/>

        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='M PLUS Rounded 1c'
          fontWeight='bold'
          ml={3}>
          William
        </Text>
      </LogoBox>

    </Link>
  )
}

export default Logo
