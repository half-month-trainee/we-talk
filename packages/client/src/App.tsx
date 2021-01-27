import React from 'react'
import './App.css'
import { Route, Router, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Basic from './pages/Basic'
import { UserProvider } from './context/UserContext'
import { history } from './config/router.config'

function App () {
  return (
    <Router history={history}>
      <UserProvider>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="">
            <Basic />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  )
}

export default App
