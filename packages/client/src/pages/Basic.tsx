import React, { FC } from 'react'
// import { Switch } from 'react-router-dom'
import tw from 'twin.macro'

const Container = tw.main`flex h-screen items-stretch`
const Bar = tw.section`bg-black w-16`
const Content = tw.main`bg-red-500 flex-1`

const Basic: FC = () => {
  return (
    <Container>
      <Bar>hi</Bar>
      <Content>

      </Content>
    </Container>
  )
}

export default Basic
