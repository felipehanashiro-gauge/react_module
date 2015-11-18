/* eslint-env node */
/*
 * Componente para o logo do FlyEmbraer
 */

"use strict"

var React = require("react"),
  concatClasses = require("../javascripts/modules/concatClasses");

var Logo = React.createClass({
  getDefaultProps: function() {
    return {
      customClasses: [],
      id: "logo",
      href: "/"
    };
  },

  /**
   * Busca classe especifica para o componente renderizado
   * para que a imagem correta apareca.
   *
   * Formada a partir da concatenacao do id do componente e o sufixo '-Logo'
   */
  getInstanceClass: function() {
    return this.props.id + "-Logo";
  },

  getClassList: function() {
    var props = this.props;
    return concatClasses(props.customClasses, this.getInstanceClass());
  },

  render: function() {
    var props = this.props;

    return (
      <div
        className={this.getClassList()}
        title={props.id}
        id={props.id}>
        {props.id}
      </div>
    );
  }
});

module.exports = Logo;
