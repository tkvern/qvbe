var express = require('express');
var router = express.Router();
var app = express();

var ticker = require('../controllers/ticker'),
    exchange = require('../controllers/exchange'),
    currency = require('../controllers/currency'),
    kline = require('../controllers/kline');

/* Ticker Router */
router.get('/ticker', ticker.test);

/* Exchange Router */
router.get('/exchange', exchange.index);
router.get('/exchange/cache', exchange.cache);

/* Currency Router */
router.get('/currency', currency.index);

/* Kline Router */
router.get('/kline', kline.index);

module.exports = router;
