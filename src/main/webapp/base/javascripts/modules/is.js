/* eslint-env node */

var stringMatcher = require("./stringMatcher");

var is = {
  number: function(number) {
    number = parseInt(number, 10);
    return number === number;
  },
  string: function(item) {
    return typeof item === "string";
  },
  percent: function(number) {
    var parsed = parseFloat(number);

    return stringMatcher("%$")(number)
            && this.number(parsed) === true
            && parsed >= 0 && parsed <= 100;
  },
  object: function(object) {
    return object instanceof Object;
  },
  array: function(item) {
    return Object.prototype.toString.call(item) === "[object Array]";
  },
  functionType: function(func) {
    return typeof func === "function";
  },
  notNull: function(item) {
    return item !== null;
  }
};

module.exports = is;
