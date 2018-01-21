var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const WebSocket = require('ws')
const formatService = require('./services/formatService')


const bitfinex = new WebSocket('wss://api.bitfinex.com/ws/2')
bitfinex.onmessage = (msg) => {
  let data = JSON.parse(msg.data)

  if (data.hasOwnProperty('event')) {
    if (data.event === 'info') {
      //error codes should be handled here if this was to be deployed
    }
    if (data.event === 'subscribed') { }

  } else if (data[1] !== "hb") {
    response = formatService.formatBitfinexResponse(data[1]);
    console.log(response)
    //save to DB
    //send to our socket
  }


}
bitfinex.onopen = () => {
  bitfinex.send(JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
  }))

}


const gdax = new WebSocket('wss://ws-feed.gdax.com')

gdax.onmessage = (msg) => {
  let data = JSON.parse(msg.data);
  if (data.type == 'ticker' && data.time) {
    response = formatService.formatGdaxResponse(data)

    //send to our socket
    //save to db
    console.log(response)
  }

}
gdax.onopen = () => {
  gdax.send(JSON.stringify({
    "type": "subscribe",
    "product_ids": [
      "BTC-USD"
    ],
    "channels": [
      "ticker"
    ]
  }))
}

const hitbtc = new WebSocket('wss://api.hitbtc.com/api/2/ws')

hitbtc.onmessage = (msg) => {
  let data = JSON.parse(msg.data)

  if (data.hasOwnProperty('method') && data.method == 'ticker') {
    response = formatService.formatHitbtcResponse(data)

    //save to db
    //send to our socket 
    console.log(response)

  }

}

hitbtc.onopen = () => {
  hitbtc.send(JSON.stringify(
    {
      "method": "subscribeTicker",
      "params": {
        "symbol": "BTCUSD"
      },
      "id": 123
    }
  ))
}

module.exports = app;
