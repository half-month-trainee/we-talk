import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Basic from './pages/Basic'
import { UserProvider } from './context/UserContext'
import { history } from './config/router.config'
import { MessageProvider } from './context/MessageContext'
import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

const GlobalStyle = createGlobalStyle`
  ${tw`font-sans`}
`

function App () {
  return (
    <Router history={history}>
      <GlobalStyle />
      <UserProvider>
        <MessageProvider>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="">
              <Basic />
            </Route>
          </Switch>
        </MessageProvider>
      </UserProvider>
    </Router>
  )
}

export default App
