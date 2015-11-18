/* eslint-env node */
/*
 * Lista de opcoes do Dropdown
 */

"use strict"

var React = require("react"),
  DropdownListItem = require("./DropdownListItem.js");

var DropdownList = React.createClass({
  getDefaultProps: function() {
    return {
      listId: "dropdownlist",
      list: []
    }
  },

  render: function() {
    var Item = DropdownListItem,
      props = this.props;

    return (
      <ul className="Dropdown-list" id={props.listId}>
        { props.list.map(function(item, index) {
          return <Item key={index} {...item} />
        }) }
      </ul>
    );
  }
});

module.exports = DropdownList;
