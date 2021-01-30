import React, { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom'
import tw from 'twin.macro'
import { Avatar } from '../components/Avatar'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import { ChatMessage } from './ChatMassage'

const userChatNavActiveClassName = 'active-chat'
const UserChatNavLink = styled(NavLink).attrs({
  activeClassName: userChatNavActiveClassName
})`
  ${tw`p-4 block`}
`

const UserChatList = observer(() => {
  const userStore = useContext(UserContext)
  const { url } = useRouteMatch()

  return (
    <>
      {userStore.contacts.map(item => (
        <UserChatNavLink key={item.id} to={`${url}/${item.id}`}>
          <Avatar alt="avatar" src={item.avatar ?? ''} />
          <div>{item.nickname}</div>
        </UserChatNavLink>
      ))}
    </>
  )
})

const MainNavSection = tw.section`h-16 w-full bg-white`
const MainContentSection = tw.section`flex-1 bg-blue-400 overflow-auto`
const MainContainer = tw.section`h-screen w-full flex bg-black items-stretch`
const MainListContainer = tw.section`w-80 flex-shrink-0 bg-red-500 flex flex-col`
const MainDetailContainer = tw.section`flex-1 bg-green-400 flex flex-col`

const Chat: FC = () => {
  const { path } = useRouteMatch()

  return (
    <MainContainer>
      <MainListContainer>
        <MainNavSection>
          hello
        </MainNavSection>
        <MainContentSection>
          <UserChatList />
        </MainContentSection>
      </MainListContainer>
      <MainDetailContainer>
        <MainNavSection>
          hello
        </MainNavSection>
        <MainContentSection>
          <Switch>
            <Route path={`${path}/:withId`}>
              <ChatMessage />
            </Route>
          </Switch>
        </MainContentSection>
      </MainDetailContainer>
    </MainContainer>
  )
}

export default Chat
