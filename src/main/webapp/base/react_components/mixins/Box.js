/* eslint-env node */
/*
 * Mixin para componente Box
 */

"use strict";

var React = require("react"),
    ReactDOM = require('react-dom'),
  EventEmitter = require("events").EventEmitter,
  request = require("../../javascripts/modules/request"),
  is = require("../../javascripts/modules/is");

var Box = {
  getDefaultProps: function() {
    return {
      /**
       * Instancia de eventEmitter
       * @type {Object}
       */
      channel: new EventEmitter(),
      /**
       * Id da caixa
       * @type {String}
       */
      id: "id",
      /**
       * Nome da caixa
       * @type {String}
       */
      name: "Box",
      /**
       * Prefixo da URL
       * @type {String}
       */
      prefix: "http://localhost:3000/api/#id"
    }
  },

  getInitialState: function() {
    return {
      data: {}
    }
  },

  componentDidMount: function() {
      window.Channel.on("settings:submit", this.listener);
    this.fetch();
  },

  componentWillUnmount: function() {
      window.Channel.removeListener("settings:submit", this.listener);
  },

  componentDidUpdate: function() {
    this.removeLoading();
  },

  listener: function(data) {
    this.fetch({ params: data });
  },

  getDOM: function() {
    return ReactDOM.findDOMNode(this.refs.boxBody);
  },

  // TODO Adicionar aria-busy e state para dizer se esta carregando ou nao
  addLoading: function() {
    var classList = this.getDOM().classList;

    if (is.object(classList)) {
      this.getDOM().classList.add("is-loading");
    }
  },

  removeLoading: function() {
    var classList = this.getDOM().classList;

    if (is.object(classList)) {
      this.getDOM().classList.remove("is-loading");
    }
  },

  getUrl: function(prefix, id) {
    return prefix.replace("#id", id);
  },

  updateState: function(data) {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    this.setState({ data: data });
  },

  fetchError: function(err) {
    this.removeLoading();
    throw err;
  },

  /**
   * Busca as informacoes da caixa de visao
   */
  fetch: function(config) {
    var props = this.props;
    config = config || {};

    this.addLoading();

    request({
      data: config.params || null,
      method: "POST",
      url: config.url || this.getUrl(props.prefix, props.id),
      success: this.updateState,
      error: this.fetchError
    });
  }
};

module.exports = Box;
