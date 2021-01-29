import React from 'react'
import './App.css'
import { Route, Router, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Basic from './pages/Basic'
import { UserProvider } from './context/UserContext'
import { history } from './config/router.config'
import { MessageProvider } from './context/MessageContext'

function App () {
  return (
    <Router history={history}>
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
