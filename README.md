# KRATOS

A module to send notifications to your email when a cryptocurrency accomplish a given condition

___

## To use it:  

In a .env file inside the folder set your email direction and password to sent emails, like below:  

```
USER_EMAIL=Your-Email
PASS_EMAIL=Your-Password
```

Now is setting up using gmail, but you can change it in the email.js file. It use nodemailer module.

In app.js at config you can create your notifications in an array of object called config: 

```javascript
let config = [
    {
        "exchanges": ["bittrex", "poloniex"], // ID of Exhcanges to monitor
        "message": "Probando",  // Condition's name
        "check": (previousTicker, currentTicker) => currentTicker.last > previousTicker.last, // Condition to perform
        "update": (previousTicker, currentTicker) => currentTicker, // Return the tickers to compare later
        "send": sendEmail, // Action to perform - It is the only implemented now.
        "refreshTime": 1000,  // Time to refresh
    }
]
```

To define the exchanges see the [ccxt](https://github.com/ccxt/ccxt) module to know the supported exchanges and the id used.

The check property receive a function which must return a bool value to know if the tickers should be send or not. In the example if the current ticker last is greater than previous ticker last, the ticker is sended. This is the composition of the ticker object: 

```javascript
"1ST/BTC": {
        "symbol": "1ST/BTC",
        "timestamp": 1508978802577,
        "datetime": "2017-10-26T00:46:42.577Z",
        "high": 0.00005185,
        "low": 0.000046,
        "bid": 0.000046,
        "ask": 0.0000462,
        "last": 0.000046,
        "baseVolume": 618641.26320781,
        "quoteVolume": 30.53038882,
        "info": {
            "MarketName": "BTC-1ST",
            "High": 0.00005185,
            "Low": 0.000046,
            "Volume": 618641.26320781,
            "Last": 0.000046,
            "BaseVolume": 30.53038882,
            "TimeStamp": "2017-10-26T00:46:42.577",
            "Bid": 0.000046,
            "Ask": 0.0000462,
            "OpenBuyOrders": 172,
            "OpenSellOrders": 5893,
            "PrevDay": 0.00005184,
            "Created": "2017-06-06T01:22:35.727"
        }
    }
```

The update property receive a function which must return one of the two tickers given in its arguments to compare in the next time.
