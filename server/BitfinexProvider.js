const formatService = require('./services/formatService')

const literalConstants = {
    events: {
        info: 'info',
        subscribe: 'subscribe',
        subscribed: 'subscribed'
    },
    dataFlags: {
        event: 'event',
        heartBeat: 'hb'
    },
    channels: {
        ticker: 'ticker'
    },
    symbols: {
        BTCUSD: 'tBTCUSD'
    },
    defaultString: 'default'
}

class BitfinexProvider {

    constructor(collectData) {
        this.collectData = collectData
        this.info = {
            supportsSocket: true,
            name: 'bitfinex',
            url: 'wss://api.bitfinex.com/ws/2'
        }
    }



    onMessage = (msg) => {
        let data = JSON.parse(msg.data)
        if (data.hasOwnProperty(literalConstants.dataFlags.event)) {
            const event = data.event
            switch (event) {
                case literalConstants.events.info: //error codes should be handled here if this was to be deployed
                    console.log(literalConstants.events.info)
                    break
                case literalConstants.events.subscribed:  //e ovaj se spojio na socket, nosi channel id, ako slusamo vise chanella
                    console.log(literalConstants.events.subscribed)
                    break
                default:
                    console.log(literalConstants.defaultString)
            }
        } else if (data[1] !== literalConstants.dataFlags.heartBeat) {
            const response = formatService.formatBitfinexResponse(data[1])
            this.collectData(response)
            //TODO: saveToDB, aggregate to socket
        }
    }

    onOpen() {
        this.send(JSON.stringify({
            event: literalConstants.events.subscribe,
            channel: literalConstants.channels.ticker,
            symbol: literalConstants.symbols.BTCUSD
        }))
    }
}

module.exports = BitfinexProvider