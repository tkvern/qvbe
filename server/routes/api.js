var express = require('express');
var router = express.Router();
var app = express();

var ticker = require('../controllers/ticker'),
    exchange = require('../controllers/exchange'),
    currency = require('../controllers/currency'),
    kline = require('../controllers/kline'),
    cache = require('../controllers/cache');

/* Ticker Router */
router.get('/ticker', ticker.index);

/* Exchange Router */
router.get('/exchange', exchange.index);
router.get('/exchange/:symbol', exchange.show);

/* Currency Router */
router.get('/currency', currency.index);
router.get('/currency/:symbol', currency.show);

/* Kline Router */
router.get('/kline', kline.index);

/* Cache data */
router.get('/cache/exchange', cache.exchange);
router.get('/cache/currencyinfo', cache.currencyInfo);

module.exports = router;
