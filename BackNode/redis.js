const conf = require('./config')
var redis = require('redis');

module.exports = class RedisCon {

  constructor(){
    this._port = conf.REDIS_PORT;
    this._host = conf.REDIS_HOST;
    this.client;
 
    this.client = redis.createClient({
      port : this._port,
      host : this._host
    });

    this.client.on('error', function (err) {
      console.log('Something went wrong ' + err);
      }); 
  }
}