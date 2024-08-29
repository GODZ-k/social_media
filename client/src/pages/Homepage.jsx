import React from 'react'
import { Suggestions , Container as MainContainer ,RightSuggestaion } from '../components'
import { Container } from '@chakra-ui/react'

function Homepage() {
  return (
    <MainContainer>
      <Container>
      {/* <Suggestions/>   */}
      <RightSuggestaion/>  
            </Container>

    </MainContainer>
  )
}

export default Homepage