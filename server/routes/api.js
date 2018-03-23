var express = require('express');
var router = express.Router();
var app = express();

var ticker = require('../controllers/ticker'),
    exchange = require('../controllers/exchange'),
    currency = require('../controllers/currency'),
    kline = require('../controllers/kline'),
    cache = require('../controllers/cache');

/* Ticker Router */
// router.get('/ticker', ticker.index);

/* Exchange Router */
router.get('/exchange', exchange.index);
router.get('/exchange/:symbol', exchange.show);
router.get('/cache/exchange', cache.exchange);

/* Currency Router */
router.get('/currency', currency.index);

/* Kline Router */
router.get('/kline', kline.index);

module.exports = router;
