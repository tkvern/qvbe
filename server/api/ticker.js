/**
 * ticker module
 * @author tkvern
 * @date 2018-03-07
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json({test: true});
});

module.exports = router;