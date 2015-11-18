/* eslint-env node */
"use strict";

var is = require("./is");

module.exports = function(object, callback) {
  if (is.object(object) === false) {
    object = {};
  }

  Object.keys(object).forEach(function(key) {
    if (object.hasOwnProperty(key) === true) {
      callback(key, object);
    }
  });
};
