/* eslint-env node */
/*
 * Navegacao do menu
 */
"use strict"

var React = require("react"),
  MenuNavigationItem = require("./MenuNavigationItem.js");

var MenuNavigation = React.createClass({
  getDefaultProps: function() {
    return {
      list: []
    };
  },

  getInitialState: function() {
    return {
      indexActive: 0
    }
  },

  toggleMenu: function(isOpen, callback) {
    if (isOpen === false) {
      return callback(!isOpen);
    }
  },

  updateIndexActive: function(index) {
    this.setState({ indexActive: index });
  },

  handleClick: function(index) {
    var props = this.props;
    this.updateIndexActive(index);
    this.toggleMenu(props.menuIsOpen, props.parentHandler);
  },

  inlineStyle: function(index){
      return {
          "zIndex": index,
          "position": "relative"
      }
  },

  render: function() {
    var Item = MenuNavigationItem,
      indexActive = this.state.indexActive,
      handleClick = this.handleClick,
      props = this.props,
      inlineStyle = this.inlineStyle;

    return (
      <nav role="menu">
        <ul>
          { props.list.map(function(item, index) {
            return <Item
                      key={index}
                      {...item}
                      index={index}
                      isActive={index === indexActive}
                      menuIsOpen={props.menuIsOpen}
                      parentHandler={handleClick}
                      style={inlineStyle(index)}
                    />;
          }) }
        </ul>
      </nav>
    );
  }
});

module.exports = MenuNavigation;
