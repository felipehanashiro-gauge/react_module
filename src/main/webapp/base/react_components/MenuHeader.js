/* eslint-env node */
/*
 * Componente para o header do Menu
 */
"use strict"

var React = require("react"),
  classNames = require("classnames"),
  Util = require("../javascripts/modules/utils");

var MenuHeader = React.createClass({
  getDefaultProps: function() {
    // Considera-se que essas propriedades vem do Controller-view
    return {
      username: "User",
      isOpen: false,
      parentHandler: function() {
        console.log("MenuHeader#parentHandler: Parent Handler!");
      }
    }
  },

  getClassListHeader: function() {
    return classNames("Menu-header", { "is-open": this.props.isOpen });
  },

  getClassListToggleButton: function() {
    return classNames("link-Button", "menu-Button", "Menu-toggle-button");
  },

  logoutHandler: function(){
    Util.App.logout();
  },

  render: function() {
    var props = this.props,
      isOpen = props.isOpen;

    return ( 
      <header
        className={this.getClassListHeader()}
        id="menu-header"
        aria-checked={isOpen}>
        <button
          id="logout-button"
          className="logout-button"
          onClick={this.logoutHandler}

        ></button>
        <button
          className={this.getClassListToggleButton()}
          id="toggle-menu"
          onClick={props.parentHandler.bind(null, !isOpen)}
          type="button"
          role="menuitemradio"
          title="Menu"
          aria-checked={isOpen}
          aria-haspopup="true">
          <span>{props.username}</span>
        </button>
      </header>
    );
  }
});

module.exports = MenuHeader;
