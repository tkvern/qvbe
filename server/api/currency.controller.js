var https = require('https');
var querystring = require('querystring');
var Currency = require('../models/Currency');

exports.index = function (req, res) {
    // var content = querystring.stringify(data);
    Currency.get(req.query, function(result) {
        return res.status(200).json(result);
     });

    // var options = {
    //     hostname: 'qube.vip',
    //     port: 443,
    //     path: '/api/ticker',
    //     method: 'GET'
    // }

    // Ticker.get({}, function (err, ticker) {
    //     if (err) {
    //         console.log(err);
    //         return false;
    //     }

    //     if (ticker) {
    //         console.log(ticker);
    //         return true;
    //     }
    // });

    // var _data = "";
    // var _req = https.request(options, function (_res) {
    //     _res.setEncoding('utf-8');
    //     _res.on('data', function (chunk) {
    //         _data += chunk;
    //     });
    //     _res.on('end', function () {
    //         // console.log('响应结束********');
    //         return res.status(200).json(JSON.parse(_data));
    //     });
    // })
    // _req.on('error', function (err) {
    //     console.error(err);
    // });
    // _req.end();
}