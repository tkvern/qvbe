import { currentId } from 'async_hooks';

var https = require('https');
    querystring = require('querystring'),
    Exchange = require('../models/Exchange'),
    CurrencyInfo = require('../models/CurrencyInfo'),
    assert = require('assert');

/*
 * cache exchange action
 * Compare the data needs to update the cache
*/
exports.exchange = function (req, res) {
    Exchange.index(req.query, function(oldExchanges) {
        latestExchange(function(ltsExchanges) {
            var newExchange = [];
            ltsExchanges.map(function(exchange) {
                var exist = false;
                oldExchanges.forEach(function (item) {
                    if (exchange['name'] == item['name']) {
                        return exist = true;
                    }
                });
                if (!exist) {
                    var exg = new Exchange({
                        region: exchange.region,
                        name: exchange.name,
                        symbol: exchange.name.toLowerCase(),
                        fiat_money: exchange.fiat_money,
                        number_of_pairs: exchange.number_of_pairs,
                        fee: exchange.fee,
                    })
                    return newExchange.push(exg);
                }
            });
            if (newExchange.length <= 0) {
                return res.status(200).json(newExchange);
            } else {
                Exchange.cache(newExchange, function(result) {
                    return res.status(200).json(result);
                })
            }
        });
    });
}

exports.currencyInfo = function (req, res) {
    CurrencyInfo.index(req.query, function(oldCurrencies) {
        latestCurrency(function(ltsCurrencies) {
            var newCurrency = [];
            ltsCurrencies.map(function(currency) {
                var exist = false;
                oldCurrencies.forEach(function (item) {
                    if (currency['name'] == item['name']) {
                        return exist = true;
                    }
                });
                if (!exist) {
                    var cry = new CurrencyInfo({
                        region: currency.region,
                        name: currency.name,
                        symbol: currency.name.toLowerCase(),
                        fiat_money: currency.fiat_money,
                        number_of_pairs: currency.number_of_pairs,
                        fee: currency.fee,
                    })
                    return newCurrency.push(cry);
                }
            });
            if (newCurrency.length <= 0) {
                return res.status(200).json(newCurrency);
            } else {
                CurrencyInfo.cache(CurrencyInfo, function(result) {
                    return res.status(200).json(result);
                })
            }
        });
    });
}

// Get latest exchange list
function latestExchange(callback) {
    var options = {
        hostname: 'qube.vip',
        port: 443,
        path: '/api/exchange',
        method: 'GET'
    }
    var _data = "";
    var _req = https.request(options, function (_res) {
        _res.setEncoding('utf-8');
        _res.on('data', function (chunk) {
            _data += chunk;
        });
        _res.on('end', function () {
            var data = JSON.parse(_data)
            callback(data['data']['list'])
        });
    });
    _req.on('error', function (err) {
        console.error(err);
    });
    _req.end();
}