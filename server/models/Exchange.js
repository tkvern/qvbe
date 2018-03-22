var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

    // Construct
function Exchange(exchange) {
    this.region = exchange.region || "";
    this.name = exchange.name || "";
    this.symbol = exchange.symbol || "";
    this.domain = exchange.domain || "";
    this.fiat_money = exchange.fiat_money || "";
    this.number_of_pairs = exchange.number_of_pairs || "";
    this.fee = exchange.fee || "";
}

// Get data list
Exchange.get = function(query, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('exchange').find(query).sort({ name: 1 }).toArray(function (err, exchanges) {
            if (err) throw err
            client.close();
            return callback(exchanges);
        });
    })
};

// Filter new exchange to collection
Exchange.cache = function(list, oldlist, callback) {
    var newExchange = [];
    list.map(function(exchange) {
        var exist = false;
        oldlist.forEach(function (item) {
            if (exchange['name'] == item['name']) {
                return exist = true;
            }
        });
        if (!exist) {
            var exg = new Exchange({
                region: exchange.region,
                name: exchange.name,
                symbol: exchange.name.toLowerCase(),
                fiat_money: exchange.fiat_money,
                number_of_pairs: exchange.number_of_pairs,
                fee: exchange.fee,
            })
            return newExchange.push(exg);
        }
    });

    if (newExchange.length <= 0) {
        return callback(newExchange);
    } else {
        MongoClient.connect(settings.url, function (err, client) {
            assert.equal(null, err)
            const db = client.db(settings.db);
            db.collection('exchange').insert(newExchange, function(err, res) {
                if (err) throw err
                client.close();
                return callback(res);
            });
        });
    }
}

module.exports = Exchange;