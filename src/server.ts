import Fastify, { fastify } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import productRoutes from './routes/products'


async function bootstrap() {
    const app = Fastify({ logger: true })
  
    await app.register(cors, {
        origin: true,
    })

    await app.register(jwt, {
        secret: 'nlwcopa'
    })

    app.register(productRoutes)



    await app.listen({ port: 3333 })
}

bootstrap()