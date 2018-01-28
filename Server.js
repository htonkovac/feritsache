const http = require('http')
const socketIO = require('socket.io')
const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.io = socketIO(this.server)
    }

    startup(port) {
        this.app.use(express.static(__dirname + '/public'))
        this.app.get('*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
        })

        this.server.listen(port, () => {
            console.log('Server is listening on port', port)
        })
    }

    getWebSocketServer() {
        return this.io
    }
}

module.exports = Server
