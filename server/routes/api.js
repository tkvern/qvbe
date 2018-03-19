var express = require('express');
var router = express.Router();
var ticker = require('../api/ticker.controller');
var exchange = require('../api/exchange.controller');
var currency = require('../api/currency.controller');
var app = express();

/* Ticker Router */
router.get('/ticker', ticker.test);

/* Exchange Router */
router.get('/exchange', exchange.index);

/* Currency Router */
router.get('/currency', currency.index);

module.exports = router;
