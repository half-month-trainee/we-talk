import React, { createContext, useContext, useState, FC } from 'react'
import { UserVO } from '@we-talk/common'
import { ContextValue, initContextValue } from './utils'

type UserType = Pick<UserVO, 'id'|'username'|'nickname'|'avatar'|'intro'>
                        & { token: string }
                        | null

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
