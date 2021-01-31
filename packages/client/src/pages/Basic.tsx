import React, { useContext, useEffect } from 'react'
import { ChatBubble, PeopleAlt } from '@material-ui/icons'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import Chat from './Chat'
import Contact from './Contact'
import { useSocket } from '../config/socket.config'
import { MessageContext } from '../context/MessageContext'
import { observer } from 'mobx-react-lite'

const Container = styled.main`
  ${tw`flex h-screen items-stretch`}
  background: rgb(240,247,247);
`
const Bar = tw.section`w-16 flex-shrink-0 items-center`
const Content = tw.main`flex-1`

const iconNavClassName = 'icon-active'
const IconNavLink = styled(NavLink).attrs({
  activeClassName: iconNavClassName
})`
  ${tw`flex items-center justify-center w-full h-16 
     text-gray-400 transition-colors`}
  &.${iconNavClassName} {
    ${tw`text-green-500`}
    :hover {
      ${tw`text-green-600`}
    }
  }
  :hover {
    ${tw`text-gray-500`}
  }
`

const Basic = observer(() => {
  const userStore = useContext(UserContext)
  const messageStore = useContext(MessageContext)
  useEffect(() => {
    userStore.fetchUser()
    userStore.fetchContacts()
    messageStore.fetchBasicMessageMap()
  }, [userStore, messageStore])
  useSocket(userStore.isLogin)

  return (
    <Container>
      <Bar>
        <IconNavLink to="/chat">
           <ChatBubble />
        </IconNavLink>
        <IconNavLink to="/contact">
          <PeopleAlt />
        </IconNavLink>
      </Bar>
      <Content>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Redirect to={userStore.isLogin ? '/chat' : '/auth/login'} />
          </Route>
        </Switch>
      </Content>
    </Container>
  )
})

export default Basic
