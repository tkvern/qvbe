var https = require('https');
    querystring = require('querystring'),
    Exchange = require('../models/Exchange'),
    assert = require('assert');

/*
 * index action
 * Receive query parameters
*/
exports.index = function (req, res) {
    Exchange.index(req.query, function(result) {
        return res.status(200).json(result);
    });
}

/*
 * show action
 * Receive query parameters
*/
exports.show = function (req, res) {
    Exchange.show(req.params.symbol, function(result) {
        return res.status(200).json(result);
    });
}