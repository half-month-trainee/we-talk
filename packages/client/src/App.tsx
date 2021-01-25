import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Basic from './pages/Basic'
import { UserProvider } from './context/UserContext'

function App () {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
