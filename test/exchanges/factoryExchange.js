(async () => {
    const factoryExchange = require('../../exchanges/factoryExchange')
    const fs = require('fs')

    let bittrex = await factoryExchange('bittrex')
    let markets = await bittrex.loadMarkets()
    let tickers = await bittrex.fetchTickers()

    fs.writeFileSync('markets.json', JSON.stringify(markets))
    fs.writeFileSync('tickers.json', JSON.stringify(tickers))
})()