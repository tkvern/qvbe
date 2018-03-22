var https = require('https');
var querystring = require('querystring');
var Kline = require('../models/Kline');

exports.index = function (req, res) {
    Kline.get(req.query, function(result) {
        return res.status(200).json(result);
    });
}