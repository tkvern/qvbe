var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');
function Exchange(exchange) {
    this.symbol = exchange.symbol;
    this.name = exchange.name;
    this.domain = exchange.domain;
}

module.exports = Exchange;

// get data list
Exchange.get = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);

        db.collection('exchange').find(query).toArray(function (err, exchanges) {
            if (err) throw err
            return callback(exchanges);
        });

        client.close();
    })
};