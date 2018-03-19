var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');
function Currency(currency) {
    this.symbol = currency.symbol;
    this.name = currency.name;
    this.domain = currency.domain;
}

module.exports = Currency;

// get data list
Currency.get = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);

        db.collection('currency').find(query).toArray(function (err, currencies) {
            if (err) throw err
            return callback(currencies);
        });

        client.close();
    })
};