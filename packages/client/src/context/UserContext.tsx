import React, { createContext, FC } from 'react'
import { SafeUserVO, UserContextData } from '@we-talk/common'
import { makeAutoObservable } from 'mobx'
import { deleteToken, getToken, saveToken } from '../utils/auth.util'

class UserObservable {
  user: SafeUserVO | null = null
  token = getToken()

  constructor () {
    makeAutoObservable(this)
  }

  updateUser (user: SafeUserVO) {
    this.user = user
  }

  updateToken (token: string) {
    this.token = token
    saveToken(token)
  }

  clearToken () {
    this.token = null
    deleteToken()
  }

  updateAll (context: UserContextData) {
    this.user = context
    this.token = context.token
  }
}

export const userObservable = new UserObservable()

export const UserContext = createContext<UserObservable>(userObservable)

export const UserProvider: FC = ({ children }) => {
  return (
    <UserContext.Provider value={userObservable}>
      {children}
    </UserContext.Provider>
  )
}
