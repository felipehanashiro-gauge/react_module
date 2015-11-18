/* eslint-env node */
/*
 * Componente para Settings
 */

"use strict"

var React = require("react"),
  querystring = require("querystring"),
  extend = require("extend"),
  moment = require("moment"),
  stringMatcher = require("../javascripts/modules/stringMatcher"),
  is = require("../javascripts/modules/is"),
  Dropdown = require("./mixins/Dropdown"),
  request = require("../javascripts/modules/request"),
  Api = require("../javascripts/modules/api"),
  classNames = require("classnames");

var Settings = React.createClass({
  mixins: [Dropdown],

  statics: {
    getParams: function() {
      // FIXME OMG PLEASE FIX
      var params = {},
        parse = querystring.parse,
        basicForm = parse($("#basicform").serialize());

      if (is.string(basicForm.region) === true) {
        basicForm.region = [basicForm.region];
      }

      if (is.string(basicForm.operator) === true) {
        basicForm.operator = [basicForm.operator];
      }

      extend(true, params, basicForm);

      return JSON.stringify(params);
    }
  },

  /**
   * Buscar campos do settings no metodo didMount de cada settings
   */
  getInitialState: function() {
    return {
      /**
       * Flag para determinar se select esta aberto ou fechado
       * @type {Boolean}
       */
      isOpen: false,
      /**
       * Campos do settings
       * @type {Object}
       */
      formControls: {},
      filters: []
    };
  },

  componentDidMount: function() {
	  if(this.props.url){
		  this.fetch();
	  }
  },

  fetch: function(config) {
    config = config || {};

    /*Api._post((config.url || this.props.url), config.data,
      function(data) {
          if (typeof data === "string") {
              data = JSON.parse(data);
          }
*/

        console.warn("MOCK - settings");
        var data = {"referenceDate":1435719600000,"family":[{"name":"E-JETS FAMILY","value":"EJETS","isSelected":true},{"name":"EMBRAER 190/195 FAMILY","value":"19FT","isSelected":false},{"name":"EMBRAER 170/175 FAMILY","value":"17FT","isSelected":false},{"name":"ERJ 145 FAMILY","value":"145T","isSelected":false}],"period":[{"name":"L1M","value":61,"isSelected":false},{"name":"L3M","value":62,"isSelected":false},{"name":"L6M","value":63,"isSelected":false},{"name":"L12M","value":64,"isSelected":true}],"operator":[{"name":"AIR ASTANA","value":10529,"isSelected":false},{"name":"AIR BURKINA","value":10953,"isSelected":false},{"name":"AIR CANADA","value":9396,"isSelected":false},{"name":"AIR COSTA","value":10882,"isSelected":false},{"name":"AIR EUROPA","value":9968,"isSelected":false},{"name":"AIR MOLDOVA","value":267,"isSelected":false},{"name":"AIR NORTH","value":56,"isSelected":false},{"name":"ALITALIA","value":93,"isSelected":false},{"name":"AM CONNECT","value":9397,"isSelected":false},{"name":"ARKIA","value":10042,"isSelected":false},{"name":"AURIGNY","value":10889,"isSelected":false},{"name":"AUSTRAL","value":10456,"isSelected":false},{"name":"AVIANCA","value":10025,"isSelected":false},{"name":"AZERBAIJAN AIRLINES","value":10861,"isSelected":false},{"name":"AZUL","value":10040,"isSelected":false},{"name":"BA CITYFLYER","value":10229,"isSelected":false},{"name":"BEI BUWAN","value":10957,"isSelected":false},{"name":"BELAVIA","value":10822,"isSelected":false},{"name":"BORAJET","value":10888,"isSelected":false},{"name":"BULGARIA AIR","value":10720,"isSelected":false},{"name":"CHINA SOUTHERN","value":9435,"isSelected":false},{"name":"COBHAM AVIATION","value":10921,"isSelected":false},{"name":"COMPASS","value":9848,"isSelected":false},{"name":"CONVIASA","value":10821,"isSelected":false},{"name":"COPA AIRLINES","value":384,"isSelected":false},{"name":"COPA COLOMBIA","value":9864,"isSelected":false},{"name":"EGYPTAIR","value":9852,"isSelected":false},{"name":"ESTONIAN AIR","value":10736,"isSelected":false},{"name":"FLYBE","value":9434,"isSelected":false},{"name":"FLYBE FINLAND","value":9381,"isSelected":false},{"name":"FUJI","value":9991,"isSelected":false},{"name":"HE BEI","value":9986,"isSelected":false},{"name":"JAL","value":9970,"isSelected":false},{"name":"JET BLUE","value":9411,"isSelected":false},{"name":"KENYA AIRWAYS","value":9870,"isSelected":false},{"name":"KLM CITYHOPPER","value":9971,"isSelected":false},{"name":"LAM","value":10053,"isSelected":false},{"name":"LUFTHANSA CITY","value":9975,"isSelected":false},{"name":"MANDARIN","value":9840,"isSelected":false},{"name":"MESA AIRLINES","value":22,"isSelected":false},{"name":"MONTENEGRO","value":9969,"isSelected":false},{"name":"MYANMA","value":10886,"isSelected":false},{"name":"NIKI","value":10045,"isSelected":false},{"name":"OMAN AIR","value":10530,"isSelected":false},{"name":"PEOPLES","value":10546,"isSelected":false},{"name":"RÉGIONAL","value":9438,"isSelected":false},{"name":"REPUBLIC","value":9424,"isSelected":false},{"name":"ROYAL JORDANIAN","value":9854,"isSelected":false},{"name":"SARATOV","value":10895,"isSelected":false},{"name":"SATENA","value":297,"isSelected":false},{"name":"SAUDI ARABIAN","value":380,"isSelected":false},{"name":"SKY REGIONAL","value":10857,"isSelected":false},{"name":"SKYWEST","value":15,"isSelected":false},{"name":"TAME","value":389,"isSelected":false},{"name":"TIANJIN","value":9898,"isSelected":false},{"name":"TUI JETAIRFLY","value":10852,"isSelected":false},{"name":"UKRAINE AIRLINE","value":10859,"isSelected":false},{"name":"US AIRWAYS","value":328,"isSelected":false},{"name":"VIRGIN AUSTRALIA","value":9860,"isSelected":false}],"region":[{"name":"AFRICA","value":"AFR","isSelected":false},{"name":"ASIA-PACIFIC","value":"APAC","isSelected":false},{"name":"CHINA","value":"CHINA","isSelected":false},{"name":"EUROPE","value":"EURO","isSelected":false},{"name":"LATIN AMERICA","value":"LATIN","isSelected":false},{"name":"MIDDLE EAST","value":"MIDAF","isSelected":false},{"name":"USA, CANADA & CARIBBEAN","value":"USACC","isSelected":false}],"chargeableType":[{"name":"TOTAL","value":"TOTAL","isSelected":false},{"name":"CHARGEABLE","value":"CHARGEABLE","isSelected":true}],"srcrEnum":[{"name":"SR","value":"SR","isSelected":true},{"name":"CR","value":"CR","isSelected":false}]}


          this.setState({
              formControls: data,
              filters: this.getFilters(data)
          });
/*
      }.bind(this),
      function(err) {
          throw err;
      }
    );*/
  },

  getFilters: function(data) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    /**
     * FIXME Fim do Sprint
     */
    return Object.keys(data).map(function(key) {
      var item = data[key],
        value,
        date;

      if (is.array(item) === true) {
        item = item.filter(function(item) {
          return item.isSelected === true;
        }).pop();
      } else if (item !== "undefined") {
        item = data[key];
      }

      if (key === "referenceDate") {
        date = new Date(item);
        value = months[date.getMonth()] + " " + date.getFullYear();
      } else if (is.object(item) === true) {
        value = item.name;
      }

      return value;
    }).join(" ");
  },

  changeTab: function(name) {
      window.Channel.emit("settings:changeTab", name);

    this.fetch({
      url: this.props.url,
      data: Settings.getParams()
    });
  },

  render: function() {
    var state = this.state,
      props = this.props;

    var children = React.Children.map(props.children, function(child) {
      return React.cloneElement (child, {
        toggle: this.toggle,
        isOpen: state.isOpen,
        formControls: state.formControls,
        action: props.url,
        ref: "form",
        parentHandler: this.changeTab
      });
    }, this);

    return (
      <div className={"Settings"}>
        <button
          onClick={this.toggle}
          className={"link-Button Settings-trigger"}
          title={"Settings"}>
        </button>
        {children}
      </div>
    );
  }
});

module.exports = Settings;
