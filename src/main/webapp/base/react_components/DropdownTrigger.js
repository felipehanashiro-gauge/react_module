/* eslint-env node */
/*
 * Trigger do Dropdown
 */

"use strict"

var React = require("react"),
  concatClasses = require("../javascripts/modules/concatClasses");

var DropdownTrigger = React.createClass({
  getInitialState: function() {
    return {
      isActive: false
    };
  },

  getDefaultProps: function() {
    return {
      defaultClasses: ["Dropdown-trigger"],
      name: "Dropdown Trigger",
      id: "dropdown-trigger"
    };
  },

  getClassList: function(props) {
    props = props || this.props;
    return concatClasses(props.defaultClasses, props.customClasses);
  },

  updateActiveState: function() {
    this.setState({ isActive: !(this.state.isActive) });
  },

  runParentHandler: function() {
    var parentHandler = this.props.parentHandler;

    if (typeof parentHandler === "function") {
      parentHandler();
    }
  },

  handleClick: function() {
    this.updateActiveState();
    this.runParentHandler();
  },

  render: function() {
    var props = this.props,
      listId = props.listId;

    return (
      <button
        className={this.getClassList(props)}
        id={props.id}
        title={props.name}
        onClick={this.handleClick}
        role="menuitemradio"
        aria-checked={this.state.isActive}
        aria-haspopup="true"
        aria-owns={listId}
        data-listid={listId}>
        {props.name}
      </button>
    );
  }
});

module.exports = DropdownTrigger;
