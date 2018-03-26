var MongoClient = require('mongodb').MongoClient,
    settings = require('../settings'),
    assert = require('assert');

function Ticker(ticker) {
    this._id = ticker.identity;
    this.symbol = ticker.symbol;
    this.name = ticker.name;
    this.rank = ticker.rank || 0;
    this.price_usd = ticker.price_usd || 0;
    this.price_btc = ticker.price_btc || 0;
    this.market_cap_usd = ticker.market_cap_usd || 0;
    this.available_supply = ticker.available_supply || 0;
    this.total_supply = ticker.total_supply || 0;
    this.max_supply = ticker.max_supply || 0;
    this['24h_volume_rank'] = ticker['24h_volume_rank'] || 0;
    this['24h_volume_usd'] = ticker['24h_volume_usd'] || 0;
    this.percent_change_1h = ticker.percent_change_1h || 0;
    this.percent_change_7d = ticker.percent_change_7d || 0;
    this.percent_change_24h = ticker.percent_change_24h || 0;
    this.high_price_24h = ticker.high_price_24h || 0;
    this.low_price_24h = ticker.low_price_24h || 0;
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
            client.close();
            return callback(cleanTickers);
        });
    });
};

module.exports = Ticker;