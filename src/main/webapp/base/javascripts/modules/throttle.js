/* eslint-env node */

/**
 * Funcao que determina um tempo minimo para a execucao do handler de um
 * evento. Util para eventos que se repetem varias vezes num pequeno
 * intervalo, como "resize", "keyup", "keydown" etc
 *
 * @param {Function} callback Funcao a se executar depois do timeout
 * @param {Object} context Contexto em que a funcao deve funcionar (o 'this')
 * @param {Number} timing Tempo para executar o timeout
 */
module.exports = function(callback, context, timing) {
  var timeout;
  timing = timing ? timing : 150;

  return function() {
    var args = arguments;
    clearTimeout(timeout);

    timeout = setTimeout(function() {
      timeout = null;
      callback.apply(context, args);
    }, timing);
  };
};
