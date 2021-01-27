import { JwtPayload } from '@we-talk/common'
import type { RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

declare module 'fastify' {
  // interface FastifyInstance {
  //   jwtHandler: RouteHandlerMethod,
  //   jwtOpts: RouteShorthandOptions
  // }

  interface FastifyRequest {
    user: JwtPayload | null
  }
}
