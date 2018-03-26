var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

// Construct
function CurrencyInfo(currency) {
    this.name = currency.name || '';
    this.symbol = currency.symbol || '';
    this.identity = currency.identity || '';
    this.rank = currency.rank || '';
    this.total_supply = currency.total_supply || '';
    this.available_supply = currency.available_supply || '';
    this.max_supply = currency.max_supply || '';
    this['24h_volume_rank'] = currency['24h_volume_rank'] || '';
}

// Get data list
CurrencyInfo.index = function(query, options, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('currency_info').find(query, options).toArray(function (err, currencies) {
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