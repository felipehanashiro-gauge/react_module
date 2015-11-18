/* eslint-env node */

/**
 * Modulo baseado na ECMAScript Internationalization API.
 * Se o navegador nao suporta-la, um polyfill de mesma assinatura e retornado.
 */

"use strict";

module.exports = (function() {
  var Global = window.Intl;

  if (!(Global instanceof Object)) {
    Global = require("intl");
  }

  return Global;
}());
