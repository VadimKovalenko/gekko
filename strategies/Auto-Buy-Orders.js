// This is a basic example strategy for Gekko.
// For more information on everything please refer
// to this document:
//
// https://gekko.wizb.it/docs/strategies/creating_a_strategy.html
//
// The example below is pretty bad investment advice: on every new candle there is
// a 10% chance it will recommend to change your position (to either
// long or short).

var log = require('../core/log');

// Let's create our own strat
var method = {};

// Prepare everything our method needs
method.init = function() {
  console.log("Init Auto-Buy-Orders strat")
};

// What happens on every new candle?
method.update = function(candle) {

  // Get a random number between 0 and 1.
  this.randomNumber = Math.random();

  // There is a 10% chance it is smaller than 0.1
  this.toUpdate = this.randomNumber < 0.1;
};

// For debugging purposes.
method.log = function() {

};

// Based on the newly calculated
// information, check if we should
// update or not.
method.check = function() {

};

module.exports = method;
