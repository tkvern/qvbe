// var https = require('https');
// var querystring = require('querystring');
var Currency = require('../models/Currency');

exports.index = function (req, res) {
    Currency.get(req.query, function(result) {
        return res.status(200).json(result);
    });
}