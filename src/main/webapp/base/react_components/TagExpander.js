/* eslint-env node */
/*
 * Componente para expandir area de tags
 */

"use strict"

var React = require("react"),
  throttle = require("../javascripts/modules/throttle");

var TagExpander = React.createClass({
  propTypes: {
    handleMouseOver: React.PropTypes.func.isRequired,
    count: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      /**
       * Quantidade de tags
       * @type {Number}
       */
      count: 0
    };
  },

  render: function() {
    var props = this.props;

    return (
      <span
        onMouseOver={props.handleMouseOver}
        className={"Tag-expand"}>
        See all {this.props.count} tags
      </span>
    );
  }
});

module.exports = TagExpander;
