/* eslint-env node */
/*
 * Botao para remover Tag
 */

"use strict"
var React = require("react"),
  DynamicTag = require("./DynamicTag");

DynamicTag.Remove = React.createClass({
  propTypes: {
    remove: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <button
        title={"Remove tag"}
        className={"Tag-remove"}
        onClick={this.props.remove}>
      </button>
    );
  }
});

module.exports = DynamicTag.Remove;
