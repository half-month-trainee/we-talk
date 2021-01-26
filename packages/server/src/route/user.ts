import { API_PREFIX, ErrorStatus, response, UpdateUserDTO } from '@we-talk/common'
import { FastifyPluginCallback } from 'fastify'
import { jwtPreHandler } from '../utils/jwtUtils'
import { prisma } from '../utils/prisma'
import { makeUserSafe } from '../utils/password'

export const userRouterPlugin: FastifyPluginCallback = async (server) => {
  server.get<{Params: {id: string}}>(`${API_PREFIX}/user/:id`, { preHandler: jwtPreHandler }, async (req) => {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } })
    if (!user) {
      return response(user, ErrorStatus.NotFound, '用户不存在')
    }
    return response(makeUserSafe(user))
  })

  server.put<{Params: {id: string}, Body: UpdateUserDTO}>(`${API_PREFIX}/user/:id`, async (req) => {
    const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data: req.body })
    return response(user)
  })
}
