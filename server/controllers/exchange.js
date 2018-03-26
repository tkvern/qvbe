var https = require('https');
    querystring = require('querystring'),
    Exchange = require('../models/Exchange'),
    assert = require('assert');

/*
 * index action
 * Receive query parameters
*/
exports.index = function (req, res) {
    var query = req.query;
    Exchange.index(query, function(result) {
        return res.status(200).json(result);
    });
}

/*
 * show action
 * Receive query parameters
*/
exports.show = function (req, res) {
    var query = {
        symbol: req.params.symbol
    }
    Exchange.show(query, function(result) {
        return res.status(200).json(result);
    });
}