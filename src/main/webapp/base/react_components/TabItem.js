/* eslint-env node */
/*
 * Componente para aba
 */

"use strict"

var React = require("react"),
  classNames = require("classnames"),
  is = require("../javascripts/modules/is");

var TabItem = React.createClass({
  getClassList: function(isActive) {
    return classNames(
      "Tabs-item",
      "Tabs-#type-item".replace("#type", this.props.id),
      "u-center",
      { "is-active": isActive }
    );
  },

  handleClick: function(e) {
    var props = this.props,
      parentHandler = props.parentHandler;

    if (is.functionType(parentHandler) === true) {
      props.parentHandler(props.index);
    }

    e.preventDefault();
  },

  render: function() {
    var props = this.props;
    return (
      <li className={this.getClassList(props.isActive)}>
        <a
          onClick={this.handleClick}
          href={props.href}
          title={props.title}
          id={props.id}>
          {props.name}
        </a>
      </li>
    );
  }
});

module.exports = TabItem;
