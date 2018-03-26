var Ticker = require('../models/Ticker'),
    Exchange = require('../models/Exchange'),
    Currency = require('../models/Currency'),
    CurrencyInfo = require('../models/CurrencyInfo');

exports.index = function (req, res) {
    var queryExchange = {
        symbol: 'binance',
    }

    var queryCurrency = {

    }

    var queryTicker = {

    }

    var queryCurrencyInfo = {

    }
    
    var optionsTicker = {
        sort: [['_id', '-1']],
        limit: 1,
    }
    var optionsCurrencyInfo = {
        sort: [['rank', '1']],
        limit: 100
    }
    CurrencyInfo.index(queryCurrencyInfo, optionsCurrencyInfo, function(currencies) {
        console.log(currencies.length);
        return res.status(200).json({
            data: {
                list: currencies
            }
        });
    })
    // Exchange.show(queryExchange, function(exchange) {
    //     queryCurrency['exchange'] = exchange['_id']
    //     Currency.show(queryCurrency, function(currency) {
    //         queryTicker['exchange'] = exchange['_id'];
    //         queryTicker['currency'] = currency['_id'];
    //         Ticker.index(queryTicker, optionsTicker, function(tickers) {
    //             return res.status(200).json({
    //                 data: {
    //                     list: tickers
    //                 }
    //             });
    //         });
    //     });
    // });
}