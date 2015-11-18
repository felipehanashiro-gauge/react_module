"use strict"

var request = require("../../javascripts/modules/request.js"),
    ReactDOM = require('react-dom'),
Api = require("./../../javascripts/modules/api"),
is = require("../../javascripts/modules/is");


function convertTimestamp(timestamp){
  var date = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months[date.getMonth()].toUpperCase()+"/"+date.getFullYear().toString().substr(-2);
}

var SummaryBox = {

    getInitialState: function() {
      return {
        empty:true
      }
    },

    componentDidMount: function() {
        this.addLoading();
      /*
        window.Channel.on("SummaryBox:change:operator", function() {
          if(this._reactInternalInstance){
            if(!this.state.empty) {
                this.addLoading();
            }
          }
        }.bind(this));
        */
        if(this.type==="operator"){
            window.Channel.emit("SummaryBox:start:operator");
        }
        window.Channel.on("SummaryBox:change:"+ this.props.type, this.fetch);
        window.Channel.on("SummaryBox:change:"+ this.props.type+":"+this._reactInternalInstance.getName(), this.fetch);
        window.Channel.on("SummaryBox:empty", this.empty);
        window.Channel.on("SummaryBox:start:operator", this.addLoading);

    },

    empty:function(){
      this.removeLoading();
      this.setState({empty:true});
    },

    componentWillUnmount: function() {
      window.Channel.removeListener("SummaryBox:change:"+ this.props.type, this.fetch);
      window.Channel.removeListener("SummaryBox:change:"+ this.props.type+":"+this._reactInternalInstance.getName(), this.fetch);
      window.Channel.removeListener("SummaryBox:empty", this.empty);
      window.Channel.removeListener("SummaryBox:empty:operator", this.addLoading);
    },

    getDOM: function() {
      return ReactDOM.findDOMNode(this.refs[this._reactInternalInstance.getName()]);
    },

    addLoading: function() {
      try {
          var classList = this.getDOM().classList;

          if (is.object(classList)) {
              this.getDOM().classList.add("is-loading");
          }
      }catch(e){
          console.error(e);
      }
    },

    removeLoading: function() {
        try {
            var classList = this.getDOM().classList;

            if (is.object(classList)) {
                this.getDOM().classList.remove("is-loading");
            }
        }catch(e){
            console.error(e);
        }
    },

    fetch: function(params){
      var self = this;
      var data = JSON.parse(JSON.stringify(params));

      if(this.props.type==="operator"){
          window.Channel.emit("SummaryBox:start:operator");
      }

      if(data.empty){
          self.empty();
          return false;
      }


      if(self.props.type != "region"){
        delete data.regionId;
      }


      Api._post(this.props.url, data,
          function(response){
              self.removeLoading();
              self.updateState(response, params);
          },
          function(err){
              self.removeLoading();
              self.sendEmpty();
              self.fetchError(err);
          }
      );
    },

    sendEmpty: function(){
        if(this.props.type == "operator"){
            window.Channel.emit("SummaryBox:change:region:"+this._reactInternalInstance.getName(), {empty:true});

            window.Channel.emit("SummaryBox:change:worldwide:"+this._reactInternalInstance.getName(), {empty:true});
        }
    },

    updateState: function(data, params) {
        var Store = Api.Store;
        var SummaryBoxStorage = Store.get("SummaryBox");

        if(!SummaryBoxStorage){
          SummaryBoxStorage = {};
        }

        if(!SummaryBoxStorage[this._reactInternalInstance.getName()]){
          SummaryBoxStorage[this._reactInternalInstance.getName()] = {};
        }

        if(!SummaryBoxStorage[this._reactInternalInstance.getName()][this.props.type]){
          SummaryBoxStorage[this._reactInternalInstance.getName()][this.props.type] = {};
        }

        SummaryBoxStorage[this._reactInternalInstance.getName()][this.props.type] = data;

        Store.set("SummaryBox", SummaryBoxStorage);


        if(data instanceof Object){
            if(this.props.type == "operator"){
              window.Channel.emit("SummaryBox:change:region:"+this._reactInternalInstance.getName(), {
                referenceDate : data.referenceDate,
                regionId : params.regionId,
                familyCode : params.familyCode
              });

              window.Channel.emit("SummaryBox:change:worldwide:"+this._reactInternalInstance.getName(), {
                referenceDate : data.referenceDate,
                familyCode : params.familyCode
              });
            }

            data.date = convertTimestamp(data.referenceDate);
            data.empty = false;
            this.setState(data);
        }else{
          this.setState({empty:true});
        }
    },

    fetchError: function(err) {
      this.setState({empty:true});
      switch (err.status) {
        case 500:
            console.info("[SummaryBox] The service ["+this.props.type+"]["+this._reactInternalInstance.getName()+"] is returning an error.");
          break;
        default:
            console.log(err);
          break;
      }
    },

    getEmptyOutput: function() {
      return (
        <div ref={this._reactInternalInstance.getName()} className="is-empty u-center">
          <p className="Box-message Box-center">No content to be displayed</p>
        </div>
      );
    },

    render: function (){
      var content;
      if(this.state.empty){
          content = this.getEmptyOutput();
      }else{
          content = this.getContentOutput();
      }
      return this.getOutput(content);
    }

}

module.exports = SummaryBox;
