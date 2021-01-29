import { API_PREFIX, extractToken, response, SentMessageDTO, SocketEvent } from '@we-talk/common'
import { FastifyPluginCallback } from 'fastify'
import { findLastNMessagesEachUser, findNMessagesBeforeId } from '../services/message.service'
import { jwtOpts, verify } from '../utils/jwtUtils'
import { Server, Socket } from 'socket.io'
import { JsonWebTokenError } from 'jsonwebtoken'
import { prisma } from '../utils/prisma'

export const messageRouterPlugin: FastifyPluginCallback = async (server) => {
  server.get(`${API_PREFIX}/current/init-message`, jwtOpts, async (req) => {
    const messages = await findLastNMessagesEachUser(req.user?.id !!)
    return response(messages)
  })

  server.get<{Querystring:{withUserId: string, messageId: string}}>(
    `${API_PREFIX}/current/message`, jwtOpts, async (req) => {
      const messages = await findNMessagesBeforeId(
      req.user?.id!!, Number(req.query.withUserId), Number(req.query.messageId))
      return response(messages)
    })
}

export const messageSocketPlugin: FastifyPluginCallback = async (server) => {
  const socketMap: Map<number, Socket> = new Map()

  const io = new Server(server.server, {
    path: `${API_PREFIX}/message-socket`
  })

  io.use((socket, next) => {
    const authorization = (socket.handshake.auth as Record<string, string>).token
    const token = extractToken(authorization)
    if (token) {
      try {
        const payload = verify(token)
        socket.user = payload
        next()
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          next(new Error('登录已失效'))
        }
      }
    } else {
      next(new Error('登录已失效'))
    }
  })

  io.on('connection', (socket: Socket) => {
    socketMap.set(socket.user?.id !!, socket)

    socket.on('disconnect', () => {
      socketMap.delete(socket.user?.id !!)
    })

    socket.on(SocketEvent.Send, async (message: SentMessageDTO) => {
      const nextMessage = await prisma.message.create({ data: { fromUserId: socket.user?.id!!, ...message } })
      socket.to(socket.id).emit(SocketEvent.Receive, nextMessage)
      const targetSocket = socketMap.get(nextMessage.toUserId)
      if (targetSocket) {
        targetSocket.emit(SocketEvent.Receive, nextMessage)
      }
    })
  })
}
