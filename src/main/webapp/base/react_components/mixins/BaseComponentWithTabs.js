"use strict";

var React = require("react"),
  stringMatcher = require("../../javascripts/modules/stringMatcher"),
  Settings = require("../Settings");

var ReactPropTypes = React.PropTypes,
  BaseComponentWithTabs;

BaseComponentWithTabs = {
  propTypes: {
    /**
     * Instancia de EventEmitter
     * @type {Object}
     */
    channel: ReactPropTypes.object.isRequired,
    /**
     * Lista com os dados para abas de tipo. Ex.: Operators, Regions, Period etc
     * @type {Array}
     */
    typeTabList: ReactPropTypes.array.isRequired,
    /**
     * Lista com os dados para abas de view. Ex.: grafico de colunas, grafico de
     * linhas, tabela, etc.
     * @type {Array}
     */
    viewTabList: ReactPropTypes.array.isRequired,
    /**
     * Valor inicial para aba de tipo
     * @type {String}
     */
    initialSelectedType: ReactPropTypes.string.isRequired,
    /**
     * Valor inicial para aba de view
     * @type {String}
     */
    initialSelectedView: ReactPropTypes.string.isRequired
  },

  getInitialState: function() {
    var props = this.props;

    return {
      /**
       * Guarda qual aba de tipo esta selecionada
       * @type {String}
       * @default {String} O padrao e o tipo periodo
       */
      selectedType: props.initialSelectedType,
      /**
       * Guarda qual aba de view esta selecionada
       * @type {String}
       * @default {String} O padrao e a view do grafico de barras
       */
      selectedView: props.initialSelectedView
    };
  },

  changeType: function(type, options) {
    this.setState({
      selectedType: type,
      selectedView: options.selectedView || this.state.selectedView
    }, function() {
      this.updateStateCallback(options);
    }.bind(this));
  },

  changeView: function(view, options) {
    this.setState({
      selectedView: view
    }, function() {
      this.updateStateCallback(options);
    }.bind(this));
  },

  viewIsTable: function(selectedView) {
    return stringMatcher("table")(selectedView);
  },

  getUrl: function() {
    var state = this.state;
    return state.selectedType + state.selectedView;
  },

  updateStateCallback: function(options) {  
    options = options || {};

    if (this.viewIsTable(this.state.selectedView) === true) {
    	if(options.params){
    		var params = JSON.parse(options.params);
    		if(params.failcodeId || params.ataId){
    			window.Channel.emit("rank:updateSub", {href:this.getUrl(), params:options.params});
    		}else{
    			window.Channel.emit("rank:update", this.getUrl());
    		}
    	}else{
    		window.Channel.emit("rank:update", this.getUrl());
    	}
    } else {
      window.Channel.emit("Chart:update", { url: this.getUrl(), type: this.state.selectedView, params: options.params || Settings.getParams(), id: options.id });
    }
  }
};

module.exports = BaseComponentWithTabs;
