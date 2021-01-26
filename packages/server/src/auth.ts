import { FastifyPluginCallback } from 'fastify'
import { LoginDTO, RegisterDTO, API_PREFIX, response } from '@we-talk/common'
import { prisma } from './prisma'

export const authRouterPlugin: FastifyPluginCallback = async (server) => {
  server.post<{Body: RegisterDTO}>(`${API_PREFIX}/register`, async (req) => {
    await prisma.user.create({ data: req.body })
    return response({})
  })

  server.get<{Body: LoginDTO}>(`${API_PREFIX}/login`, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { username: req.body.username } })
    return response(user)
  })
}
