class CheckerMarketExchange {
    constructor(args) {
        this._condition = args.condition
        this._updateTickers = args.update
        this._tickers
    }

    check(tickers) {
        if (this._tickers) {
            let result = {}
            let newTickers = {}
            for (let key in tickers) {
                let previousTicker = this._tickers[key]
                let currentTicker = tickers[key]
                if (this._condition(previousTicker, currentTicker)) result[key] = [previousTicker, currentTicker]
                newTickers[key] = this._updateTickers(previousTicker, currentTicker)
            }
            this._tickers = newTickers
            return result
        } else {
            this._tickers = tickers
            return {}
        }
    }
}

module.exports = CheckerMarketExchange