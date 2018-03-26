var Currency = require('../models/Currency');

/*
 * index action
 * Receive query parameters
*/
exports.index = function (req, res) {
    var query = req.query;
    Currency.index(query, function(result) {
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
    Currency.show(query, function(result) {
        return res.status(200).json(result);
    });
}