/* eslint-env node */

var is = require("./is"),
  Intl = require("./intl");

var FRACTION_DIGITS = 2;

module.exports = function formatPercent(number, config) {
  if (is.number(number) === false) {
    throw new TypeError("formatPercent(): 'number' is not a number");
  }

  if (!config) {
    config = {
      style: "percent",
      minimumFractionDigits: FRACTION_DIGITS,
      maximumFractionDigits: FRACTION_DIGITS
    };
  }

  return new Intl.NumberFormat("en-IN", config).format(number /= 100);
};
