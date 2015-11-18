/* eslint-env node */
/*
 * Componente para lista de abas
 */

"use strict"

var React = require("react"),
  classNames = require("classnames"),
  TabItem = require("./TabItem"),
  request = require("./../javascripts/modules/request"),
  Api = require("./../javascripts/modules/api"),
  is = require("./../javascripts/modules/is");

var TabList = React.createClass({
  propTypes: {
    list: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      list: []
    }
  },

  getInitialState: function() {
    return {
      indexActive: 0,
      list:[]
    }
  },

  componentDidMount: function() {
    window.Channel.on("TabList:refresh:list", function(list) {
      this.setState({ list: list });
    }.bind(this));

    window.Channel.on("ChangeTypeUser:operator", function(params) {
      this.fetch(params);
    }.bind(this));

    this.setState({ list: this.props.list });

    window.Channel.on("tabs:reset", function(config) {
      if (config.id === this.props.id) {
        this.setState({ indexActive: 0 });
      }
    }.bind(this));
  },

  fetch: function(params) {
        var self = this;

        Api._post( this.props.urlUpdate+"/"+params.operatorId, {}, function(response){self.updateState(params, response)}, function(err){self.fetchError(err, params)} )

  },

  updateState: function(params, response) {
    var list = [];

    if(response instanceof Array){
      	list = response.map(function(value){
          return {
            name: value.description,
            id: value.code,
            href:"#",
            operatorId:params.operatorId,
            regionId:params.regionId
          };
        });

      if(list.length > 0){
            var params = {
              familyCode:list[0].id,
              operatorId:list[0].operatorId,
              regionId:list[0].regionId
            }
            window.Channel.emit("SummaryBox:change:operator", params);
      }
    } else {
      window.Channel.emit("SummaryBox:empty");
    }
      this.setState({list:list, indexActive: 0 });
  },

  fetchError: function(err, params) {
    console.info("[TabList] The operator ["+params.operatorId+"] does not have registered family.");
  },

  componentDidUpdate: function(oldProps, oldState) {
    var state = this.state,
      parentHandler = this.props.parentHandler,
      indexActive = state.indexActive;
    // TODO Caixa atualizando 2x
    // Verificar se o problema esta aqui
    if (oldState.indexActive !== indexActive) {
      if (is.functionType(parentHandler) === true) {
        parentHandler(this.getTabUrlFromIndex(indexActive));
      }
    }
  },

  getClassList: function() {
    return classNames("Tabs", this.props.className);
  },

  getTabUrlFromIndex: function(index) {
    var tab = this.state.list[index];

    if (is.object(tab) === false) {
      throw new TypeError("TabList.getTabUrlFromIndex(): 'tab' is not an Object");
    }

    return tab;
  },

  handleClick: function(index) {
    this.setState({ indexActive: index });
  },

  render: function() {
    var list = this.state.list,
      indexActive = this.state.indexActive;

    return (
      <ul className={this.getClassList()}>
        { list.map(function(item, index) {
          return <TabItem
                    key={index}
                    parentHandler={this.handleClick}
                    {...item}
                    isActive={index === indexActive}
                    index={index}
                  />;
        }, this) }
      </ul>
    );
  }
});

module.exports = TabList;
