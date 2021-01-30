import React, { createContext, FC } from 'react'
import { MessageVO, SafeUserVO } from '@we-talk/common'
import { makeAutoObservable } from 'mobx'
import { userObservable } from './UserContext'
import { initMessage } from '../services/message.api'

type MessageMap = Map<SafeUserVO['id'], MessageVO[]>

export class MessageObservable {
  messageMap: MessageMap = new Map()

  constructor () {
    makeAutoObservable(this)
  }

  get message () {
    return (withId: number) => this.messageMap.get(withId)
  }

  initMessageMap (map: MessageMap) {
    this.messageMap = map
  }

  async fetchBasicMessageMap () {
    const { data: { res } } = await initMessage()
    res?.forEach(element => {
      this.receiveNewMessage(element)
    })
  }

  receiveNewMessage (message: MessageVO) {
    const currentUser = userObservable.user
    if (message.fromUserId === currentUser?.id) {
      this.addMessageToMap(message.toUserId, message)
    } else if (message.toUserId === currentUser?.id) {
      this.addMessageToMap(message.fromUserId, message)
    } else {
      console.log('id err', currentUser)
    }
  }

  addMessageToMap (userId: number, message: MessageVO) {
    const messages = this.messageMap.get(userId)
    this.messageMap.set(userId, [...messages ?? [], message])
  }
}

export const messageObservable = new MessageObservable()

export const MessageContext = createContext(messageObservable)

export const MessageProvider: FC = ({ children }) => {
  return (
    <MessageContext.Provider value={messageObservable}>
      {children}
    </MessageContext.Provider>
  )
}
