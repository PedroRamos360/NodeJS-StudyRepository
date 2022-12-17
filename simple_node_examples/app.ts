const express = require('express')
const { randomUUID } = require('crypto')

const app = express()

app.use(express.json())

interface Product {
    name: string
    price: number
    id: string
}

let products : Product[] = []

app.post("/products", (req, res) => {
    const {name, price} = req.body

    const product = {
        name,
        price,
        id: randomUUID()
    }
    products.push(product)

    return res.json(product)
})

app.get("/products", (req, res) => {
    return res.json(products)
})

app.get("/products/:id", (req, res) => {
    const { id } = req.params

    const product = products.find(product => product.id === id)

    return res.json(product)
})

app.put("/products/:id", (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    const productIndex = products.findIndex(product => product.id === id)

    if(productIndex < 0) {
        return res.status(400).json({error: "Product not found"})
    }

    const product = {
        name,
        price,
        id,
    }

    products[productIndex] = product

    return res.json(product)
})

app.delete("/products/:id", (req, res) => {
    const { id } = req.params

    const productIndex = products.findIndex(product => product.id === id)

    if(productIndex < 0) {
        return res.status(400).json({error: "Product not found"})
    }

    products.splice(productIndex, 1)

    return res.status(204).send()
})

app.listen(3334, () => console.log("Server is running on port 3334"))