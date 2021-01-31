import React, { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom'
import tw from 'twin.macro'
import { Avatar } from '../components/Avatar'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import { ChatMessage } from './ChatMassage'
import { MessageContext } from '../context/MessageContext'

const userChatNavActiveClassName = 'active-chat'
const UserChatNavLink = styled(NavLink).attrs({
  activeClassName: userChatNavActiveClassName
})`
  ${tw`p-5 flex rounded no-underline overflow-hidden transition-colors`}
  color: #0d3200;
  &.${userChatNavActiveClassName} {
    ${tw`bg-green-600 text-white`}
    .brief {
      ${tw`text-green-100`}
    }
    :hover {
      ${tw`bg-green-600`}
    }
  }
  .brief {
    ${tw`w-40 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap text-green-700`}
  }
  :hover {
    background: rgba(188, 194, 194, 0.514);
  }
`
const UserChatNavRight = tw.div`pl-3`
const UserChatNavNickName = tw.div`mb-2`

const UserChatList = observer(() => {
  const userStore = useContext(UserContext)
  const messageStore = useContext(MessageContext)
  const { url } = useRouteMatch()

  return (
    <>
      {userStore.contacts.map(item => (
        <UserChatNavLink key={item.id} to={`${url}/${item.id}`}>
          <Avatar alt="avatar" src={item.avatar ?? ''} />
          <UserChatNavRight>
            <UserChatNavNickName>{item.nickname}</UserChatNavNickName>
            <div className="brief">{messageStore.lastMessage(item.id)}</div>
          </UserChatNavRight>
        </UserChatNavLink>
      ))}
    </>
  )
})

const MainNavSection = tw.section`h-16 w-full flex items-center text-lg font-bold pl-5`
const MainContainer = tw.section`h-screen w-full flex items-stretch`
const MainListContainer = tw.section`w-80 flex-shrink-0 flex flex-col`
const MainDetailContainer = tw.section`flex-1 flex flex-col`

const MainContentSection = styled.div`
  ${tw`flex-1 overflow-auto`};
  scrollbar-color: #b8e0e0 transparent ;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  
  ::-webkit-scrollbar-thumb {
    ${tw`bg-green-200 rounded`}
  }
`

const Chat: FC = () => {
  const { path } = useRouteMatch()

  return (
    <MainContainer>
      <MainListContainer>
        <MainNavSection>
          Chat
        </MainNavSection>
        <MainContentSection>
          <UserChatList />
        </MainContentSection>
      </MainListContainer>
      <MainDetailContainer>
        <Switch>
          <Route path={`${path}/:withId`}>
            <ChatMessage />
          </Route>
        </Switch>
      </MainDetailContainer>
    </MainContainer>
  )
}

export default Chat
