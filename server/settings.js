function Config(config) {
    return {
        cookieSecret : config.cookieSecret,
        db : config.db,
        host : config.host,
        port : config.port,
        url : 'mongodb://' + config.host + ':' + config.port
    };
}

module.exports = Config({
    cookieSecret: 'myblog',
    db: 'qvbe',
    host: '127.0.0.1',
    port: 27017,
});