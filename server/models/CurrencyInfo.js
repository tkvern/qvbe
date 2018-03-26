var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

// Construct
function CurrencyInfo(currency) {
    this.symbol = currency.symbol || '';
    this.name = currency.name || '';
    this.identity = currency.identity || '';
    this.exchange = currency.exchange || '';
}

// Get data list
CurrencyInfo.index = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency_info').find(query).toArray(function (err, currencies) {
            if (err) throw err
            client.close();
            return callback(currencies);
        });
    });
};

// Show data single
CurrencyInfo.show = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency_info').findOne(query, function (err, currency) {
            if (err) throw err
            client.close();
            return callback(currency);
        });
    });
};

// Filter new currency to collection
CurrencyInfo.cache = function(newCurrency, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency_info').insert(newCurrency, function(err, res) {
            if (err) throw err
            client.close();
            return callback(res);
        });
    });
}

module.exports = CurrencyInfo;