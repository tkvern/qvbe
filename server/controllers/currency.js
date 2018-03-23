var Currency = require('../models/Currency');

/*
 * index action
 * Receive query parameters
*/
exports.index = function (req, res) {
    Currency.index(req.query, function(result) {
        return res.status(200).json(result);
    });
}