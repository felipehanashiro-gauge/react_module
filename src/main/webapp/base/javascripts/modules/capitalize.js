/* eslint-env node */
var is = require("./is");

module.exports = function capitalize(str) {
  var pattern = "#capitalize#text";
  str = is.string(str) ? str : "";
  pattern = pattern.replace("#capitalize", str.charAt(0).toUpperCase());
  pattern = pattern.replace("#text", str.substring(1));
  return pattern;
};
