const factoryExchange = require('./exchanges/factoryExchange')
const ConditionCheckerMarket = require('./checkers/CheckerMarketExchange')
const ControllerMarketInterval = require('./controllers/CheckMarketExchangeInterval')

async function checkMarketInterval (args) {
    for (let exchangeName of args.exchanges) {
        let exchange = await factoryExchange(exchangeName)

        let conditionChecker = new ConditionCheckerMarket({
            "condition": args.check,
            "update": args.update
        })

        let argsController = {
            "exchange": exchange,
            "conditionChecker": conditionChecker,
            "send": args.send,
            "refreshTime": args.refreshTime,
            "message": args.message
        }

        let controller = new ControllerMarketInterval(argsController)
        controller.start()
    }
}

module.exports = {
    "checkMarketInterval": checkMarketInterval
}