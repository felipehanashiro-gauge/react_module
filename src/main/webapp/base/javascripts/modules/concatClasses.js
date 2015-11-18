/* eslint-env node */

"use strict";

/**
 * Concatena lista de classes e a transforma em string
 * @param  {Array} defaultClasses Lista de classes default do componente
 * @param  {Array} customClasses  Lista de classes do modulo
 * @return {String} Lista de classes no formato string
 */

module.exports = function(defaultClasses, customClasses) {
  var classList = [],
    match = /\S/i;

  defaultClasses = defaultClasses || [];
  classList = classList.concat(defaultClasses);

  if (customClasses && match.test(customClasses) === true) {
    classList = classList.concat(customClasses);
  }

  return classList.join(" ");
};
