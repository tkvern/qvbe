var mongodb = require('./db');

function Ticker(ticker) {
    this._id = ticker._id;
    this.symbol = ticker.symbol;
    this.name = ticker.name;
    this.rank = ticker.name;
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

module.exports = Ticker;

// get data list
Ticker.get = function(name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('tickers', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.find({}, function (err, ticker) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }

                callback(callback, ticker);
            });
        });
    });
};