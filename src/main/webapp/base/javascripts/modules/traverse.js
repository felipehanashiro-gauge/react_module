/* eslint-env node */
module.exports = function(callback) {
  return function traverse(element) {
    var parent = element ? element.parentElement : null;

    if (callback(parent) === false) {
      traverse(parent);
    }
  };
};
