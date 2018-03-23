var Ticker = require('../models/Ticker'),
    Exchange = require('../models/Exchange');

exports.index = function (req, res) {
    var query = {
        symbol: 'binance'
    }
    Exchange.get(query, function(exchanges) {
        console.log()
    });
}