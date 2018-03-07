var https = require('https');
var querystring = require('querystring');

exports.test = function (req, res) {
    var page = req.query.page;
    var size = req.query.size;
    var data = {
        page: page,
        size: size
    };

    var content = querystring.stringify(data);

    var options = {
        hostname: 'qube.vip',
        port: 443,
        path: '/api/ticker',
        method: 'GET'
    }

    var _data = "";
    var _req = https.request(options, function (_res) {
        _res.setEncoding('utf-8');
        _res.on('data', function (chunk) {
            _data += chunk;
        });
        _res.on('end', function () {
            // console.log('响应结束********');
            return res.status(200).json(JSON.parse(_data));
        });
    })
    _req.on('error', function (err) {
        console.error(err);
    });
    _req.end();
}