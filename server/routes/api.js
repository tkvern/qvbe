var express = require('express');
var router = express.Router();
var ticker = require('../api/ticker.controller');
var app = express();
// defind ticker router
// router.route('/ticker')

/* GET home page. */
router.get('/ticker', ticker.test);

module.exports = router;
