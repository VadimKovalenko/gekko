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


  Cryptopia.setOptions({
    /*'API_KEY': this.key,
    'API_SECRET': this.secret*/
    API_KEY: 'cryptopia-key',
    API_SECRET: 'cryptopia-secret'
  });

  console.log(`${config.key}`);

  this.cryptopiaApi = Cryptopia;

  _.bindAll(this);
};

//TODO test private get orders query
Trader.prototype.getOpenOrders = function() {
  //return Cryptopia.getOpenOrders({Market: 'ETH/BTC', Count: 10}).then(data => {console.log(data)})
  return this.cryptopiaApi.getOpenOrders({Market: 'ETH/BTC', Count: 10}).then(data => {console.log(data)})
};

//TODO traid pair is hardcoded for now
Trader.prototype.getTrades = function(since, callback, descending) {
  return this.cryptopiaApi.getMarketHistory({Market: 'ETH_BTC'}).then(data => {return data})
};

Trader.prototype.getTicker = function(callback) {
  return this.cryptopiaApi.getMarket({Market: 'ETH_BTC'}).then(data => {return data})
};

Trader.prototype.getPortfolio = function(callback) {
  return this.cryptopiaApi.getBalance().then(data => {return data})
};

Trader.getCapabilities = function () {

  //TODO remove
  //this.prototype.getOpenOrders();

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
};

module.exports = Trader;
