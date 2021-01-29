import React, { FC, useContext, useEffect } from 'react'
import { ChatBubble, ChatBubbleOutline, PeopleAlt, PeopleAltOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import { fetchCurrentUser } from '../services/user.api'
import { checkLogin } from '../utils/auth.util'
import Chat from './Chat'
import Contact from './Contact'

const Container = tw.main`flex h-screen items-stretch`
const Bar = tw.section`w-16 flex-shrink-0 border-0 border-r-2 border-gray-100 border-solid items-center`
const Content = tw.main`flex-1`

const iconNavClassName = 'icon-active'
const IconNavLink = styled(NavLink).attrs({
  activeClassName: iconNavClassName
})`
  ${tw`flex items-center justify-center w-full h-16 
       border-0 border-r-2 border-solid border-transparent
     text-gray-400 transition-colors`}
  &.${iconNavClassName} {
    ${tw`border-solid border-green-300 text-green-500`}
    :hover {
      ${tw`text-green-600`}
    }
  }
  :hover {
    ${tw`text-gray-500`}
  }
`

const Basic: FC = () => {
  const userStore = useContext(UserContext)
  useEffect(() => {
    userStore.fetchUser()
  }, [userStore])

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
            <Redirect to={checkLogin() ? '/chat' : '/auth/login'} />
          </Route>
        </Switch>
      </Content>
    </Container>
  )
}

export default Basic
