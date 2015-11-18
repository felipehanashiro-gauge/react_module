/* eslint-env node */
/*
 * Componente para o menu principal da aplicação.
 * Possui o logo do FlyEmbraer e um select com LiveSearch para escolha de
 * usuarios
 */

"use strict"

var React = require("react"),
  Logo = require("./Logo.js");

var Header = React.createClass({
  getDefaultProps: function() {
    return {
      logoId: "flyembraer"
    };
  },

  render: function() {
    var props = this.props;

    return (
      <header className={"Header x-Panel l-space-between"} role="landmark">

        <Logo id={props.logoId} />

        {props.children}
      </header>
    );
  }
});

module.exports = Header;
