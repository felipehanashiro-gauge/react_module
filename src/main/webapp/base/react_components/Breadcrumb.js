/* eslint-env node */
/*
 * Componente para o Breadcrumb de navegacao da aplicação.
 * Serve para salvar a localizacão do usuário.
 */

"use strict"

var React = require("react"),
    BreadcrumbItem = require("./BreadcrumbItem.js"),
    Logo = require("./Logo.js");

var channel = window.Channel;

var Breadcrumb = React.createClass({

  breadcrumbCollection: {
      "home": {
          name: "Home",
          href: "/",
          children: {
              "fleetoperationalsummary": {
                  name: "Fleet Operational Summary",
                  href: ""
              },
              "fleetoperationalsummary/bubblechart": {
                  name: "Fleet Operational Summary / Bubble Chart",
                  href: ""
              }
          }
      }
  },

  componentDidMount: function(){
    var self = this;
    window.Channel.on("View:change:breadcrumb", function(path){
        self.updateBreadcrumb(path);
    });
  },

  updateBreadcrumb: function(path){
    try {
        var elements = path.replace(/ /gi, "").toLowerCase().split(">"),
            list = [],
            atual = null,
            collection = this.breadcrumbCollection;
        elements.forEach(function (element) {
            atual = atual ? atual.children[element] : collection[element];
            list.push({name: atual.name, href: "#"+atual.href});
        });
        this.setState({
            list: list
        });
    }catch(e){console.error("Wrong breadcrumb path");}
  },


  getDefaultProps: function() {
    return {
      urlEsight: "/esight",
      idEsight: "esight"
    }
  },

  getInitialState: function(){
    return{
        list: []
    }
  },

  render: function() {
    var props = this.props,
      list = this.state.list,
      // Se for o ultimo item da lista, deve ser marcado como ativo
      lastIndexOfList = list.length - 1;

    return (
      <nav
        className="Breadcrumb bottom-Panel"
        id="breadcrumb"
        role="navigation">

        <Logo
          customClasses={["Breadcrumb-item", "Breadcrumb-esight-item"]}
          href={props.urlEsight}
          id={props.idEsight}
        />

        { list.map(function(item, index) {
          return <BreadcrumbItem
                    key={index}
                    {...item}
                    isActive={lastIndexOfList === index}
                  />
        }) }
      </nav>
    );
  }
});

module.exports = Breadcrumb;
