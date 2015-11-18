/* eslint-env node */
/*
 * Componente para icone da Tag
 */

"use strict"

var React = require("react"),
  DynamicTag = require("./DynamicTag");

DynamicTag.Icon = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getClass: function() {
    return "Tag-#name-icon".replace("#name", this.props.name);
  },

  render: function() {
    return (
      <i className={this.getClass()}></i>
    );
  }
});

module.exports = DynamicTag.Icon;
