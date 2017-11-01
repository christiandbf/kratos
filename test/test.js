const assert = require('assert')

describe('Module to exchanges', function () {
    const factoryExchange = require('../exchanges/factoryExchange')
    it('factoryExchange', function () {
        let exchange = factoryExchange('bittrex')
        assert(exchange)
    })
})

describe('Module to checkers', async function () {
    describe('CheckerMarketExchange', function () {
        const fs = require('fs')
        const CheckerMarketExchange = require('../checkers/CheckerMarketExchange')
        let tickers1 = JSON.parse(fs.readFileSync('./test/exchanges/tickersToTest/1.json').toString())
        let tickers2 = JSON.parse(fs.readFileSync('./test/exchanges/tickersToTest/2.json').toString())
        let tickers3 = JSON.parse(fs.readFileSync('./test/exchanges/tickersToTest/3.json').toString())
        it('Last is equal', async function () {
            let conditionChecker = new CheckerMarketExchange({
                "condition": (previousTicker, currentTicker) => currentTicker.last == previousTicker.last,
                "update": (previousTicker, currentTicker) => currentTicker
            })
            assert(Object.keys(conditionChecker.check(tickers1)).length == 0)
            assert(Object.keys(conditionChecker.check(tickers2)).length == 1)
            assert(Object.keys(conditionChecker.check(tickers3))[0] == 'ABY/BTC')
        })
        it('Last is up', async function () {
            let conditionChecker = new CheckerMarketExchange({
                "condition": (previousTicker, currentTicker) => currentTicker.last > previousTicker.last,
                "update": (previousTicker, currentTicker) => currentTicker
            })
            assert(Object.keys(conditionChecker.check(tickers1)).length == 0)
            assert(Object.keys(conditionChecker.check(tickers2)).length == 1)
            assert(Object.keys(conditionChecker.check(tickers3))[0] == '1ST/BTC')
        })
        it('Last is down', async function () {
            let conditionChecker = new CheckerMarketExchange({
                "condition": (previousTicker, currentTicker) => currentTicker.last < previousTicker.last,
                "update": (previousTicker, currentTicker) => currentTicker
            })
            assert(Object.keys(conditionChecker.check(tickers1)).length == 0)
            assert(Object.keys(conditionChecker.check(tickers2)).length == 1)
            assert(Object.keys(conditionChecker.check(tickers3))[0] == '2GIVE/BTC')
        })

    })
})

describe('Module to controllers', function () {
    it('CheckMarketExchangeInterval', async function () {
        const factoryExchange = require('../exchanges/factoryExchange')
        const ConditionChecker = require('../checkers/CheckerMarketExchange')
        const Controller = require('../controllers/CheckMarketExchangeInterval')

        let exchange = await factoryExchange('bittrex')

        let conditionChecker = new ConditionChecker({
            "condition": (previousTicker, currentTicker) => currentTicker.last == previousTicker.last,
            "update": (previousTicker, currentTicker) => currentTicker
        })

        let argsController = {
            "exchange": exchange,
            "conditionChecker": conditionChecker,
            "send": data => pass,
            "refreshTime": 1000,
            "message": 'testing'
        }

        let controller = new Controller(argsController)
        let id = controller.start()
        controller.stop()
        assert(id)
    })
})