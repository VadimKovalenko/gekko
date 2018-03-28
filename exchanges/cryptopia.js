var Cryptopia = require('cryptopia-api')();
var util = require('../core/util.js');
var _ = require('lodash');
var moment = require('moment');
var log = require('../core/log');

var Trader = function(config) {
  this.key = config.key;
  this.secret = config.secret;
  this.currency = config.currency.toUpperCase();
  this.asset = config.asset.toUpperCase();
  this.pair = this.asset + '_' + this.currency;
  this.name = 'cryptopia';

  this.cryptopia = Cryptopia;

  _.bindAll(this);
}

const options = {
  API_KEY: '',
  API_SECRET: '',
  HOST_URL: 'https://www.cryptopia.co.nz/api'
}

Cryptopia.setOptions(options);

//TODO Test func, remove later
Trader.prototype.testQuery = function() {
  return Cryptopia.getCurrencies().then(data => {console.log(data)})
}

//TODO test private get orders query
Trader.prototype.getOpenOrders = function() {
  return Cryptopia.getOpenOrders({Market: 'ETH/BTC', Count: 10}).then(data => {console.log(data)})
}

Trader.getCapabilities = function () {

  //TODO remove
  //this.prototype.testQuery();
  this.prototype.getOpenOrders();

  return {
    name: 'Cryptopia',
    slug: 'cryptopia',
    currencies: ['BTC', 'ETH'],
    assets: ['BTC', 'ETH'],
    markets: [
      { pair: ['BTC', 'ETH'], minimalOrder: { amount: 0.000001, unit: 'currency' } },
      { pair: ['ETH', 'BTC'], minimalOrder: { amount: 0.000001, unit: 'currency' } },
    ],
    requires: ['key', 'secret'],
    providesHistory: false,
    tradable: true,
    tid: 'tid',
  };
}

module.exports = Trader;
