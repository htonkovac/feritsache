const connectionStatus = {
    connection: 'connection',
    disconnect: 'disconnect'
}

class WebSocket {
    constructor(webSocketServer) {
        this.webSocketServer = webSocketServer
    }

    onConnect(onConnect) {
        this.webSocketServer.on(connectionStatus.connection, onConnect)
    }

    onDisconnect(client, cb) {
        client.on(connectionStatus.disconnect, cb)
    }

    onEvent(eventName, client, cb) {
        client.on(eventName, cb)
    }
}

module.exports = WebSocket