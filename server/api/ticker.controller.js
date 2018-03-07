exports.test = function (req, res) {
    console.log(req.query);
    console.log(res.url);
    return res.status(200).json({ test: 'a' });
}