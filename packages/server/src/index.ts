import fastify from 'fastify'
import { authRouterPlugin } from './route/auth'
import { userRouterPlugin } from './route/user'

const server = fastify({ logger: true })

server.register(authRouterPlugin)
server.register(userRouterPlugin)

server.listen(2333, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
