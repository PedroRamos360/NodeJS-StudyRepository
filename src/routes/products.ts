import { FastifyInstance } from "fastify"
import { json } from "stream/consumers"
import { prisma } from "../lib/prisma"

interface Product {
    name: string
    price: number
}

interface Id {
    id: string
}

export default async function (app: FastifyInstance) {
    app.post('/products', async (request, reply) => {
        const { name, price } = request.body as Product

        const newProduct = {
            name,
            price
        } as Product

        const product = await prisma.product.create({
            data: newProduct
        })
        reply.status(200).send(product)
    })

    app.get('/products', async (request, reply) => {
        const products = await prisma.product.findMany()
        reply.send(products)
    })

    app.get('/products/:id', async (request, reply) => {
        const { id } = request.params as Id

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        reply.status(200).send(product)
    })

    app.put('/products/:id', async (request, reply) => {
        const { id } = request.params as Id
        const { name, price } = request.body as Product

        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                price
            }
        })

        reply.status(200).send(product)
    })

    app.delete('/products/:id', async (request, reply) => {
        const { id } = request.params as Id
        
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        reply.status(202)
    })
}