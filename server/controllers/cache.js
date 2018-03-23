var https = require('https');
    querystring = require('querystring'),
    Exchange = require('../models/Exchange'),
    assert = require('assert');

/*
 * cache exchange action
 * Compare the data needs to update the cache
*/
exports.exchange = function (req, res) {
    Exchange.index(req.query, function(oldlist) {
        latestExchange(function(list) {
            var newExchange = [];
            list.map(function(exchange) {
                var exist = false;
                oldlist.forEach(function (item) {
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