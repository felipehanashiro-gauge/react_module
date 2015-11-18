/* eslint-env node */
"use strict";

var React = require("react"),
    ReactDOM = require('react-dom'),
    request = require("../../javascripts/modules/request"),
    Api = require("../../javascripts/modules/api"),
    is = require("../../javascripts/modules/is"),
    containerLoading = this;

module.exports = {
  /**
   * Busca os dados do componente
   */
  fetch: function(config) {
    config = config || {};
    this.addLoading(config.containerLoading);

    Api._post(config.url, config.params , this.fetchSuccess.bind(this, config.success),  this.fetchError);

  },

  // TODO Adicionar aria-busy e state para dizer se esta carregando ou nao
  addLoading: function(container) {
    var container = container || this;
    var classList = ReactDOM.findDOMNode(container).classList;

    if (is.object(classList)) {
      containerLoading = container;
      classList.add("is-loading");
    }
  },

  removeLoading: function() {
    var classList = ReactDOM.findDOMNode(containerLoading).classList;

    if (is.object(classList)) {
      classList.remove("is-loading");
    }
  },

  fetchSuccess: function(callback, data) {
    this.removeLoading();

    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    callback(data);
  },

  fetchError: function(err) {
    this.removeLoading();
    throw err;
  },
};
