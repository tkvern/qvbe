module.exports = function(app) {
    var ticker = require('../api/ticker');
    app.use('/ticker', ticker);
}