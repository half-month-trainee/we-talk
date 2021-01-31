import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Basic from './pages/Basic'
import { UserProvider } from './context/UserContext'
import { history } from './config/router.config'
import { MessageProvider } from './context/MessageContext'
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles } from 'twin.macro'
import { Intro } from './pages/Intro'

const FontGlobalStyle = createGlobalStyle`
  ${tw`font-sans`}
`

function App () {
  return (
    <Router history={history}>
      <FontGlobalStyle />
      <GlobalStyles />
      <UserProvider>
        <MessageProvider>
          <Switch>
            <Route exact path="/">
              <Intro />
            </Route>
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
