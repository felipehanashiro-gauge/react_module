/* eslint-env node */

var eventListener = {
  add: function(element, evt, callback) {
    element.addEventListener(evt, callback, false);
  },
  removeListener: function(element, evt, callback) {
    element.removeEventListener(evt, callback, false);
  }
};

module.exports = eventListener;
