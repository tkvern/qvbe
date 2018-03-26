var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

// Construct
function Currency(currency) {
    this.symbol = currency.symbol || '';
    this.name = currency.name || '';
    this.identity = currency.identity || '';
    this.exchange = currency.exchange || '';
}

// Get data list
Currency.index = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency').find(query).toArray(function (err, currencies) {
            if (err) throw err
            client.close();
            return callback(currencies);
        });
    });
};

// Show data single
Currency.show = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency').findOne(query, function (err, currency) {
            if (err) throw err
            client.close();
            return callback(currency);
        });
    });
};

module.exports = Currency;