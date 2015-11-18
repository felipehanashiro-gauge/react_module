/* eslint-env node */
/*
 * Componente para DatePicker
 * TODO Adicionar polyfill para navegadores sem suporte a input month
 */

"use strict"

var React = require("react"),
  moment = require("moment"),
  stringMatcher = require("../javascripts/modules/stringMatcher");

var DatePicker = React.createClass({
  getInitialState: function() {
    return {
      /**
       * Texto da opcao selecionada
       * @type {String}
       */
      textContent: "",
      /**
       * Valor da opcao selecionada
       * @type {String}
       */
      value: ""
    }
  },

  componentWillMount: function() {
    $.webshims.setOptions("forms-ext", {
      waitReady: false,
      replaceUI: true,
      updateOnInput: true,
      "month": {
        "openOnFocus": true,
        "buttonOnly": true,
        "calculateWidth": false,
        "classes": "hide-inputbtns u-invisible"
      }
    });

    $.webshims.setOptions(
      "basePath", "../base/bower_components/webshim/js-webshim/minified/shims/"
    );

    webshim.polyfill("forms-ext");
  },

  componentDidMount: function() {
    // Escuta eventos do input de data do webshim
    $(document).on("change", function(e) {
      if (stringMatcher("referenceDate")(e.target.name) === true) {
        this.update(e.target.value);
      }
    }.bind(this));
  },

  componentWillReceiveProps: function(props) {
    if(this.state.value == "")
      this.update(this.formatDate(props.minDate));
  },

  update: function(value) {
    this.setState({ value: value });
  },

  formatDate: function(date, format) {
    format = format || "YYYY-MM";
    return moment(date).format(format);
  },

  // TODO Atualizar label selecionado
  render: function() {
    var props = this.props,
      state = this.state;

    return (
      <div className={"Select"}>
        <div className={"Select-wrapper"}>
          <strong className={"Select-label"}>
            {props.label}
          </strong>

          <span
            className={"Select-value"}
            ref={"selected"}>
            {state.value}
          </span>

          <input
            type="month"
            name={props.name}
            value={state.value}
            onChange={this.handleChange}
            ref={"month"}
          />
        </div>
      </div>
    );
  }
});

module.exports = DatePicker;
