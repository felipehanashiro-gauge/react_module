/* eslint-env node */
/*
 * Componente para formulario de Settings
 */

"use strict"

var React = require("react"),
  EventEmitter = require("events").EventEmitter,
  Settings = require("./Settings"),
  throttle = require("./../javascripts/modules/throttle"),
  classNames = require("classnames");

var SettingsForm = React.createClass({
  getDefaultProps: function() {
    return {
      /**
       * Atributo action do form
       * @type {String}
       */
      action: "/",
      /**
       * Instancia de eventEmitter
       * @type {Object}
       */
      channel: new EventEmitter(),
      /**
       * Atributo method do form
       * @type {String}
       */
      method: "POST",
      /**
       * Flag para informar se form esta aberto
       * @type {Boolean}
       */
      isOpen: false,
      /**
       * Funcao de toggle
       * @type {Function}
       */
      toggle: function() {}
    }
  },

  getClassList: function() {
    return classNames(
      "Settings-form",
      { "u-hidden": !this.props.isOpen }
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
      window.Channel.emit("settings:submit", Settings.getParams());
    this.props.toggle();
  },

  render: function() {
    var props = this.props;
    var children = React.Children.map(props.children, function(child) {
      return React.cloneElement (child, {
        formControls: props.formControls,
        parentHandler: props.parentHandler
      });
    });

    return (
      <form
        method={props.method}
        action={props.action}
        className={this.getClassList()}
        onSubmit={this.handleSubmit}
        id={props.id}
      >
        {children}
      </form>
    );
  }
});

module.exports = SettingsForm;
