const WebSocket = require('ws')

class SocketBuilder {

    static build(provider) {
        const url = provider.info.url
        const socket = new WebSocket(url)
        socket.onmessage = provider.onMessage
        socket.onopen = provider.onOpen.bind(socket)
        return socket
    }
}

module.exports = SocketBuilder