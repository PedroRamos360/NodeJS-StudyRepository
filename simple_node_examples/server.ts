const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    if (req.url === "/produto") {
        res.end(JSON.stringify({
            message: "Rota produto"
        }))
    }

    if (req.url === "/usuarios") {
        res.end(JSON.stringify({
            message: "Rota usuarios"
        }))
    }

    res.end(JSON.stringify({
        message: "Rota nao encontrada"
    }))
})


server.listen(3333, () => console.log('Server is running on port 3333'))