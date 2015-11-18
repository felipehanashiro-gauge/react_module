"use strict"

var React = require("react"),
    EventEmitter = require("events").EventEmitter,
    Menu = require("../../base/react_components/Menu.js"),
    Header = require("../../base/react_components/Header.js"),
    Footer = require("../../base/react_components/Footer.js"),
    Breadcrumb = require("../../base/react_components/Breadcrumb.js"),
    UserTypeChange = require("../../base/react_components/UserTypeChange.js"),
    request = require("../../base/javascripts/modules/request"),
    Fetch = require("../../base/react_components/mixins/Fetch"),
    ReactRouter = require("react-router"),
    HomeView = require("./homeView");


window.Channel = new EventEmitter();

var channel = window.Channel;
channel.setMaxListeners(0);

var list = [
    {
        "href": "/",
        "name": "Home",
        "id": "home"
    }
];

var Application = React.createClass({
    mixins: [channel,Fetch],

    componentDidMount: function() {
      channel.on("ChangeTypeUser", function(params){
        request({
              method: "POST",
              url: "change-operator/"+params.idOperator,
              success: function(response){
                console.log("[Application] Change user.");
              },
              error: function(err){
                console.log("[Application] Not change user.");
              }
          });
        });
    },

    render: function() {
        return (
            <div className={"Grid-cell"}>
                <Menu url={"new-menus"}/>
                <div className={"Content"}>
                    <Header><UserTypeChange channel={channel}/></Header>
                    <Breadcrumb list={list} />
                      {this.props.children || <HomeView/>}
                    <Footer />
                </div>
            </div>
        );
    }
});


module.exports = Application;
