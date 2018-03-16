module.exports = {
    apps : [{
      name        : "server",
      script      : "./bin/www",
      watch       : true,
      env_production : {
         "NODE_ENV": "production",
         "PORT" : 80
      }
    }]
}