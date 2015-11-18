/* eslint-env node */
/*
 * Componente para tags estaticas, que nao podem ser removidas clicando
 * no X
 */

"use strict"

var React = require("react");

var StaticTag = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    value: React.PropTypes.any
  },

  getDefaultProps: function() {
    return {
      name: "staticTag",
      title: "static Tag",
      value: "static"
    };
  },

  render: function() {
    var props = this.props;

    return (
      <li className={"static-Tag"} title={props.title}>
        <span className={"Tag-hole"}></span>
        <span className={"Tag-value"}>{props.title}</span>
      </li>
    );
  }
});

module.exports = StaticTag;
