/* eslint-env node */
/*
 * Item da lista de um Dropdown
 */

"use strict"

var React = require("react"),
  stripString = require("../javascripts/modules/stripString");

var DropdownListItem = React.createClass({
  MAX_LENGTH: 14,

  getDefaultProps: function() {
    return {
      name: "DropdownItem",
      href: "/",
      openNewPage: false
    };
  },

  render: function() {

    var props = this.props,
      name = props.name,
      target = (props.openNewPage ? "_blank" : "");

      var href = props.href;

      if(props.remote){
        var urlEsight = '/'+window.location.pathname.split("/")[1]+'/UI/fleet_operational_init.action?origem=login&menu=';
        if((href.split('/')[1] || '') == "view"){
          href = urlEsight+'/'+window.location.pathname.split("/")[1]+ props.href;
        }else{
          href = urlEsight+ props.href;
        }

      }else{
        if(href[0] != "/"){
          href = '/'+window.location.pathname.split("/")[1]+'/'+href;
        }
      }

    return (
      <li>
        <a className="Dropdown-item" href={href} title={name} target={target}>
          {stripString(name, this.MAX_LENGTH)}
        </a>
      </li>
    );
  }
});

module.exports = DropdownListItem;
