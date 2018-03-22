var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

// Construct
function Kline(kline) {
    this.symbol = kline.symbol;
    this.name = kline.name;
    this.identity = kline.identity;
    this.exchange = kline.exchange;
}

// Get data list
Kline.get = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);

        db.collection('kline').find(query).sort({ _id: -1 }).limit(50).toArray(function (err, klines) {
            if (err) throw err7
            return callback(klines);
        });

        client.close();
    })
};

module.exports = Kline;