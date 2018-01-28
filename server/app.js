const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

const BitfinexProvider = require('./BitfinexProvider')
const providers = [
    new BitfinexProvider()
]
const socketBuilder = require('./SocketBuilder')
console.log(socketBuilder)
const socket = socketBuilder.build(providers[0])


// const bitfinex = new WebSocket('wss://api.bitfinex.com/ws/2')
// bitfinex.onmessage = (msg) => {
//   let data = JSON.parse(msg.data)
//
//   if (data.hasOwnProperty('event')) {
//     if (data.event === 'info') {
//       //error codes should be handled here if this was to be deployed
//     }
//     if (data.event === 'subscribed') { }
//
//   } else if (data[1] !== "hb") {
//     response = formatService.formatBitfinexResponse(data[1]);
//     console.log(response)
//     //save to DB
//     //send to our socket
//   }
//
//
// }
// bitfinex.onopen = () => {
//   bitfinex.send(JSON.stringify({
//     event: 'subscribe',
//     channel: 'ticker',
//     symbol: 'tBTCUSD'
//   }))
//
// }

//
// const gdax = new WebSocket('wss://ws-feed.gdax.com')
//
// gdax.onmessage = (msg) => {
//   let data = JSON.parse(msg.data);
//   if (data.type == 'ticker' && data.time) {
//     response = formatService.formatGdaxResponse(data)
//
//     //send to our socket
//     //save to db
//     console.log(response)
//   }
//
// }
// gdax.onopen = () => {
//   gdax.send(JSON.stringify({
//     "type": "subscribe",
//     "product_ids": [
//       "BTC-USD"
//     ],
//     "channels": [
//       "ticker"
//     ]
//   }))
// }
//
// const hitbtc = new WebSocket('wss://api.hitbtc.com/api/2/ws')
//
// hitbtc.onmessage = (msg) => {
//   let data = JSON.parse(msg.data)
//
//   if (data.hasOwnProperty('method') && data.method == 'ticker') {
//     response = formatService.formatHitbtcResponse(data)
//
//     //save to db
//     //send to our socket
//     console.log(response)
//
//   }
//
// }
//
// hitbtc.onopen = () => {
//   hitbtc.send(JSON.stringify(
//     {
//       "method": "subscribeTicker",
//       "params": {
//         "symbol": "BTCUSD"
//       },
//       "id": 123
//     }
//   ))
// }

module.exports = app
