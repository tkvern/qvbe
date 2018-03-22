var https = require('https');
    querystring = require('querystring'),
    Exchange = require('../models/Exchange'),
    assert = require('assert');

exports.index = function (req, res) {
    Exchange.get(req.query, function(result) {
        return res.status(200).json(result);
    });
}

exports.cache = function (req, res) {
    Exchange.get(req.query, function(oldlist) {
        cacheExchange(function(list) {
            Exchange.cache(list, oldlist, function(result) {
                return res.status(200).json(result);
            })
        });
    });
}

function cacheExchange(callback) {
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
            // Todo
            var data = JSON.parse(_data)
            callback(data['data']['list'])
        });
    });
    _req.on('error', function (err) {
        console.error(err);
    });
    _req.end();
}