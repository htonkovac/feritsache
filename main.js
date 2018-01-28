const Server = require('./Server')
const WebSocket = require('./WebSocket')
const generateName = require('sillyname')

const server = new Server()
const webSocket = new WebSocket(server.getWebSocketServer())
const port = process.env.PORT || 3000

const socketBuilder = require('./SocketBuilder')
const BitfinexProvider = require('./BitfinexProvider')

server.startup(port)
webSocket.onConnect((client) => {
    console.log('Client connected', client.conn.id)

    webSocket.onDisconnect(client, () => {
        console.log('Client disconnected', client.conn.id)
    })

    webSocket.onEvent('REQ_BITFINEX', client, () => {
        const sendDataToClient = data => {
            client.emit('RES_BITFINEX', data)
        }
        const provider = new BitfinexProvider(sendDataToClient)
        const socket = socketBuilder.build(provider)
    })
})
