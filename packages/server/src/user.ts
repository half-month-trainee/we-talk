import { API_PREFIX, response, UpdateUserDTO } from '@we-talk/common'
import { FastifyPluginCallback } from 'fastify'
import { prisma } from './prisma'

export const userRouterPlugin: FastifyPluginCallback = async (server) => {
  server.get<{Params: {id: string}}>(`${API_PREFIX}/user/:id`, async (req) => {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } })
    return response(user)
  })

  server.put<{Params: {id: string}, Body: UpdateUserDTO}>(`${API_PREFIX}/user/:id`, async (req) => {
    const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data: req.body })
    return response(user)
  })
}
