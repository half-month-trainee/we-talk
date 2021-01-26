import React, { createContext, useContext, useState, FC } from 'react'
import { ContextValue, initContextValue } from './utils'
import { UserContextData } from '@we-talk/common'

type UserType = UserContextData | null

const initUser = initContextValue<UserType>(null)

export const UserContext = createContext<ContextValue<UserType>>(initUser)

export function useUserContext () {
  return useContext(UserContext)
}

export const UserProvider: FC = ({ children }) => {
  const [data, setData] = useState<UserType>(null)
  const contextValue: ContextValue<UserType> = { data, setData }
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
