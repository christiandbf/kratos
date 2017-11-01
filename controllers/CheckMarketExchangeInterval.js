class CheckMarketExchangeInterval {
    constructor(args) {
        this._exchange = args.exchange
        this._conditionChecker = args.conditionChecker
        this._send = args.send
        this._refreshTime = args.refreshTime
        this._message = args.message
        this._id
    }

    async start() {
        this._id = setInterval(async () => {
            let tickers = await this._exchange.fetchTickers()
            let tickersToSend = this._conditionChecker.check(tickers)
            if (Object.keys(tickersToSend).length > 0) {
                tickersToSend.exchange = this._exchange.name
                tickersToSend.message = this._message
                this._send(JSON.stringify(tickersToSend, null, 2))
            }
        }, this._refreshTime)
    }

    stop() {
        clearInterval(this._id)
    }
}

module.exports = CheckMarketExchangeInterval