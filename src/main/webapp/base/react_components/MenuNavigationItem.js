/* eslint-env node */
/*
 * Menu item
 */

"use strict"

var React = require("react"),
  Dropdown = require("./Dropdown.js"),
  classNames = require("classnames");

var MenuNavigationItem = React.createClass({

  getDefaultProps: function() {
    return {
      id: "menu",
      isActive: false,
      handleClick: function(index) {
        console.log("instance index", index);
        console.log("MenuNavigationItem#handleClick: Default Prop!");
      }
    }
  },

  getClassList: function() {
    var props = this.props;

    return classNames(
      "link-Button", "Dropdown-up-trigger", props.name.toLowerCase().trim()+ "-Button", "Menu-button",
      {
        "is-active": props.isActive
      },
      {
        "has-child": props.list.length
      }
    );
  },

  handleClick: function() {
    var props = this.props;
    if(props.list.length) {
        props.parentHandler(props.index);
    }
  },

  render: function() {
    var props = this.props;

    return (
      <li style={props.style}>
        <Dropdown
          parentHandler={this.handleClick}
          customClasses={this.getClassList()}
          id={props.id}
          name={props.name}
          list={props.list}
          menuIsOpen={props.menuIsOpen}
          link={props.href}
          openNewPage={props.openNewPage}
        />
      </li>
    );
  }
});

module.exports = MenuNavigationItem;
