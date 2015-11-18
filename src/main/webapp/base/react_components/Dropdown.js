/* eslint-env node */
/*
 * Componente para Dropdown
 */

"use strict"

var React = require("react"),
  classNames = require("classnames"),
  DropdownTrigger = require("./DropdownTrigger.js"),
  DropdownList = require("./DropdownList.js");

var Dropdown = React.createClass({
  getDefaultProps: function() {
    return {
      id: "dropdown",
      isActive: false,
      name: "Dropdown",
      list: [],
      link: "",
      openNewPage: false
    };
  },

  getListId: function() {
    return "dropdown-list-" + this.props.id;
  },

  handleClick: function(){
      var props = this.props;
      if(props.link) {
          var win = window.open("/"+window.location.pathname.split("/")[1]+"/"+props.link, (props.openNewPage ? "_blank" : "_self"));
          win.focus();
      }
  },

  render: function() {
    var props = this.props,
      listId = this.getListId();

    return (
      <div className="Dropdown" onClick={this.handleClick}>
        <DropdownTrigger
          customClasses={props.customClasses}
          parentHandler={props.parentHandler}
          listId={listId}
          id={props.id}
          name={props.name}
          isActive={props.isActive}
          menuIsOpen={props.menuIsOpen}
        />

        <DropdownList
          listId={listId}
          list={props.list}
        />
      </div>
    );
  }
});

module.exports = Dropdown;
