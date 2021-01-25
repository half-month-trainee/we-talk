import fastify from 'fastify'
import { authRouter } from './auth'

const server = fastify({ logger: true })

server.register(authRouter)

server.listen(2333, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
