import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

function Header() {
    const { colorMode , toggleColorMode } = useColorMode()
  return (
    <Flex justifyContent={"center"} mt="6" mb="12" >
        <Image src={colorMode === 'dark' ? "dark-logo.png" : "light-logo.png" } alt='logo' width={10} cursor={'pointer'}
        onClick={toggleColorMode} />
    </Flex>
  )
}

export default Header