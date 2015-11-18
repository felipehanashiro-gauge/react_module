/* eslint-env node */
module.exports = function(string, options) {
  var regexp;
  options = options || "i";

  regexp = new RegExp(string, options);

  return function stringMatcher(str) {
    return regexp.test(str) === true;
  };
};
