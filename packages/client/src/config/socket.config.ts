import { API_PREFIX, MessageVO, SocketEvent } from 'common/dist'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { messageObservable } from '../context/MessageContext'
import { getToken } from '../utils/auth.util'

export function useSocket () {
  useEffect(() => {
    const socket = io(`${API_PREFIX}/message-socket`, {
      auth: cb => cb({ token: getToken() })
    })

    socket.on(SocketEvent.Receive, (message: MessageVO) => {
      messageObservable.receiveNewMessage(message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
}
