import React, { FC, useContext, useEffect } from 'react'

// import { Switch } from 'react-router-dom'
import tw from 'twin.macro'
import { UserContext } from '../context/UserContext'
import { fetchCurrentUser } from '../services/user.api'

const Container = tw.main`flex h-screen items-stretch`
const Bar = tw.section`bg-black w-16`
const Content = tw.main`bg-red-500 flex-1`

const Basic: FC = () => {
  const userStore = useContext(UserContext)
  useEffect(() => {
    fetchCurrentUser()
      .then((response) => {
        console.log(response)
        // if (res) {
        //   userStore.updateUser(res)
        // }
      })
  })

  return (
    <Container>
      <Bar>hi {JSON.stringify(userStore.user)}</Bar>
      <Content>

      </Content>
    </Container>
  )
}

export default Basic
