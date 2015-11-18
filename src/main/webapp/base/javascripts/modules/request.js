/* eslint-env node */
/* global XMLHttpRequest */
"use strict";

var is = require("./is");

/*
var Request = (function() {
  if (typeof window !== "undefined" && window instanceof Object && typeof window.XMLHttpRequest === "function") {
    return window.XMLHttpRequest;
  } else {
    return require('xmlhttprequest').XMLHttpRequest;
  }
})();

module.exports = function(args) {
  var request = new Request(),
    method = args.method || "GET",
    url = "#pathname/#url",
    pathname = window instanceof Object ? window.location.pathname : "/";

  url = url.replace("#pathname", pathname).replace("#url", args.url);
  request.open(method, url);
  request.setRequestHeader("Content-Type", "application/json");

  request.addEventListener("load", function() {
    args.success(request.responseText);
  });

  request.addEventListener("error", function() {
    args.error(request.responseText);
  });

  request.send(args.data);
};
*/

var request = $.ajax;

module.exports = function(args){

  var url = "#pathname/#url",
  pathname = window instanceof Object ? window.location.pathname : "/";

  url = url.replace("#pathname", pathname).replace("#url", args.url);

  request({
    data:args.data,
    method: args.method || "GET",
    url: url
  }).done(function(response) {
    args.success(response);
  })
  .fail(function(error) {
    args.error(error);
  })
}
