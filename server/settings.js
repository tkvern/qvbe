function Config(config) {
    this.cookieSecret = config.cookieSecret,
    this.db = config.db,
    this.host = config.host,
    this.port = config.port,
    this.url = 'mongodb://' + config.host + ':' + config.port
}

module.exports = new Config({
    db: 'qvbe',
    host: '127.0.0.1',
    port: 27017,
});