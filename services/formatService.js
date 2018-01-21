

module.exports.formatBitfinexResponse = (response) => {
    return {
        'exchange':'bitfinex',
        'bid':response[0],
        'ask':response[2],
        'timestamp': Math.floor(Date.now())

    }
}

module.exports.formatGdaxResponse= (response) => {
// console.log(response)
    return{
        'exchange':'gdax',
        'bid':response.best_bid,
        'ask':response.best_ask,
        'timestamp':Math.floor(new Date(response.time))
    }
}

module.exports.formatHitbtcResponse = (response) => {
    return {
        'exchange':'hitbtc',
        'bid':response.params.bid,
        'ask':response.params.ask,
        'timestamp':Math.floor(new Date(response.params.timestamp))
    }

}