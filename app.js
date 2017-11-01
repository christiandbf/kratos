require('dotenv').config()
const api = require('./index')
const Email = require('./notifications/Email')
const pug = require('pug')

let email = new Email('trading.sg2017@gmail.com')
let compile = pug.compileFile('./views/tickers.pug')

function sendEmail(data) {
    let object = JSON.parse(data)
    let html = compile({ params: object })
    email.send(data, html)
}

let config = [
    {
        "exchanges": ["bittrex", "poloniex"],
        "message": "Probando",
        "check": (previousTicker, currentTicker) => currentTicker.last > previousTicker.last,
        "update": (previousTicker, currentTicker) => currentTicker,
        "send": sendEmail,
        "refreshTime": 1000,
    }
]

console.log('Init', new Date().toLocaleString())
console.log('Author: Christian Barrios')
config.map((opt) => api.checkMarketInterval(opt))