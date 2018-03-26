var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

function Ticker(ticker) {
    this._id = ticker._id;
    this.symbol = ticker.symbol;
    this.name = ticker.name;
    this.rank = ticker.rank;
    this.price_usd = ticker.price_usd;
    this.price_btc = ticker.price_btc;
    this.market_cap_usd = ticker.market_cap_usd;
    this.available_supply = ticker.available_supply;
    this.total_supply = ticker.total_supply;
    this.max_supply = ticker.max_supply;
    this['24h_volume_rank'] = ticker['24h_volume_rank'];
    this['24h_volume_usd'] = ticker['24h_volume_usd'];
    this.percent_change_1h = ticker.percent_change_1h;
    this.percent_change_7d = ticker.percent_change_7d;
    this.percent_change_24h = ticker.percent_change_24h;
    this.high_price_24h = ticker.high_price_24h;
    this.low_price_24h = ticker.low_price_24h;
    this.last_updated = ticker.last_updated;
}

// Get data list
// required query, options params
// If there is not exist, place input {}
Ticker.index = function(query, options, callback) {
    MongoClient.connect(settings.url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(settings.db);
        db.collection('tickertime').find(query, options).toArray(function (err, tickers) {
            if (err) throw err
            var cleanTickers = tickers.map(function (ticker) {
                return new Ticker({
                    _id: ticker._id,
                    price_usd: ticker.price
                })
            });
            console.log(tickers)
            client.close();
            return callback(cleanTickers);
        });
    });
};

module.exports = Ticker;