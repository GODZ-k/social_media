import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

function Header() {
    const { colorMode , toggleColorMode } = useColorMode()
  return (
    <Flex justifyContent={"space-between"} bg={'black'} position={'fixed'} top={0} left={0} zIndex={10} width={'100%'} padding={2}>
        <Image src={colorMode === 'dark' ? "dark-logo.png" : "light-logo.png" } alt='logo' width={10} cursor={'pointer'}
        onClick={toggleColorMode} />
        <div>
          logo
        </div>
    </Flex>
  )
}

export default Header