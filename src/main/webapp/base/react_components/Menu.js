/* eslint-env node */
/*
 * Componente para o Menu.
 * Haverao dois tipos de menu: 'Contracted' e 'Expanded'
 */
"use strict"

var React = require("react"),
  classNames = require("classnames"),
  request = require("../javascripts/modules/request"),
  Api = require("../javascripts/modules/api"),
  MenuHeader = require("./MenuHeader"),
  MenuNavigation = require("./MenuNavigation");

var Menu = React.createClass({
  getDefaultProps: function() {
    return {
      url: "esight/view/fre/getNewMenus"
    }
  },

  getInitialState: function() {
    return {
      isOpen: false,
      list: []
    };
  },

  fetchMenusList: function() {
      Api._get(this.props.url,
          function(response) {
              console.warn("MOCK - menu items");

              response = [{"id":148,"name":"Home","menuOrder":1,"href":"view/fre/home","list":[],"enable":true},{"id":149,"name":"Dashboards","menuOrder":2,"href":null,"list":[{"id":194,"name":"Dispatch Reliability","description":null,"href":"/esight-dashboard/srcr-technical","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1},{"id":195,"name":"Component Reliability","description":null,"href":"/esight-dashboard/mtbur","enable":true,"remote":false,"openNewPage":false,"submenuOrder":2},{"id":196,"name":"Scheduled Maintenance KPIs","description":null,"href":"/esight-dashboard/mtx","enable":true,"remote":false,"openNewPage":false,"submenuOrder":3},{"id":197,"name":"Current Fleet","description":null,"href":"aircraft_management","enable":true,"remote":true,"openNewPage":false,"submenuOrder":4}],"enable":true},{"id":150,"name":"Data Exchange","menuOrder":3,"href":null,"list":[{"id":198,"name":"Upload","description":null,"href":"data_upload","enable":true,"remote":true,"openNewPage":false,"submenuOrder":1},{"id":199,"name":"Export","description":null,"href":"data_export","enable":true,"remote":true,"openNewPage":false,"submenuOrder":2},{"id":200,"name":"History","description":null,"href":"upload_history","enable":true,"remote":true,"openNewPage":false,"submenuOrder":3}],"enable":true},{"id":151,"name":"Reliability","menuOrder":4,"href":null,"list":[{"id":201,"name":"Classification","description":null,"href":"UI/reliability_home","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1}],"enable":true},{"id":152,"name":"Maintenance","menuOrder":5,"href":null,"list":[{"id":202,"name":"Analysis","description":null,"href":"UI/maintenance","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1}],"enable":true},{"id":154,"name":"Administrator","menuOrder":7,"href":null,"list":[{"id":203,"name":"Users","description":null,"href":"/view/embraer_operators_user","enable":true,"remote":true,"openNewPage":false,"submenuOrder":1},{"id":204,"name":"Operators","description":null,"href":"/view/operators_and_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":2},{"id":205,"name":"Suppliers","description":null,"href":"/view/suppliers_and_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":3},{"id":206,"name":"Access Control","description":null,"href":"/view/groups_of_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":4}],"enable":true}];

              this.setState({ list: response });
          }.bind(this),
          function(err) {
              console.info("[Menu] The service ["+this.props.url+"] not returning the correct value.");

              console.warn("MOCK - menu items");
              err = [{"id":148,"name":"Home","menuOrder":1,"href":"view/fre/home","list":[],"enable":true},{"id":149,"name":"Dashboards","menuOrder":2,"href":null,"list":[{"id":194,"name":"Dispatch Reliability","description":null,"href":"/esight-dashboard/srcr-technical","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1},{"id":195,"name":"Component Reliability","description":null,"href":"/esight-dashboard/mtbur","enable":true,"remote":false,"openNewPage":false,"submenuOrder":2},{"id":196,"name":"Scheduled Maintenance KPIs","description":null,"href":"/esight-dashboard/mtx","enable":true,"remote":false,"openNewPage":false,"submenuOrder":3},{"id":197,"name":"Current Fleet","description":null,"href":"aircraft_management","enable":true,"remote":true,"openNewPage":false,"submenuOrder":4}],"enable":true},{"id":150,"name":"Data Exchange","menuOrder":3,"href":null,"list":[{"id":198,"name":"Upload","description":null,"href":"data_upload","enable":true,"remote":true,"openNewPage":false,"submenuOrder":1},{"id":199,"name":"Export","description":null,"href":"data_export","enable":true,"remote":true,"openNewPage":false,"submenuOrder":2},{"id":200,"name":"History","description":null,"href":"upload_history","enable":true,"remote":true,"openNewPage":false,"submenuOrder":3}],"enable":true},{"id":151,"name":"Reliability","menuOrder":4,"href":null,"list":[{"id":201,"name":"Classification","description":null,"href":"UI/reliability_home","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1}],"enable":true},{"id":152,"name":"Maintenance","menuOrder":5,"href":null,"list":[{"id":202,"name":"Analysis","description":null,"href":"UI/maintenance","enable":true,"remote":false,"openNewPage":false,"submenuOrder":1}],"enable":true},{"id":154,"name":"Administrator","menuOrder":7,"href":null,"list":[{"id":203,"name":"Users","description":null,"href":"/view/embraer_operators_user","enable":true,"remote":true,"openNewPage":false,"submenuOrder":1},{"id":204,"name":"Operators","description":null,"href":"/view/operators_and_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":2},{"id":205,"name":"Suppliers","description":null,"href":"/view/suppliers_and_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":3},{"id":206,"name":"Access Control","description":null,"href":"/view/groups_of_user_roles","enable":true,"remote":true,"openNewPage":false,"submenuOrder":4}],"enable":true}];
              this.setState({ list: err });
          }.bind(this)
      );

  },

  componentDidMount: function() {
    this.fetchMenusList();
  },

  handleClick: function(state) {
    this.setState({ isOpen: state });
  },

  render: function() {
    var state = this.state,
      isOpen = state.isOpen,
      classList = classNames("Menu", { "is-open": isOpen }),
      handleClick = this.handleClick;

    return (
      <aside
        className={classList}
        id="menu"
        role="menubar"
        aria-expanded={isOpen}>

        <MenuHeader
          isOpen={isOpen}
          parentHandler={handleClick}
          username={this.props.username}
        />

        <MenuNavigation
          list={state.list}
          parentHandler={handleClick}
          menuIsOpen={isOpen}
        />
      </aside>
    );
  }
});

module.exports = Menu;
