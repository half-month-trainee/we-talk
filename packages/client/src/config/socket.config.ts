import { API_PREFIX, MessageVO, SocketEvent } from '@we-talk/common'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { messageObservable } from '../context/MessageContext'
import { getToken } from '../utils/auth.util'

export const socket = io({
  auth: cb => cb({ token: getToken() }),
  autoConnect: false,
  path: `${API_PREFIX}/message-socket`
})

export function useSocket (isLogin: boolean) {
  // const [connecting, setConnectingState] = useState(false)

  useEffect(() => {
    isLogin && socket.connect()

    socket.on(SocketEvent.Receive, (message: MessageVO) => {
      messageObservable.receiveNewMessage(message)
    })

    socket.on('connect_error', (err: any) => {
      console.log(err)
      setTimeout(() => {
        socket.connect()
      }, 2000)
    })

    return () => {
      socket.disconnect()
    }
  }, [isLogin])
}
