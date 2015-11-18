/* eslint-env node */
/*
 * Componente para formulario de Settings
 */

"use strict"

var React = require("react"),
  classNames = require("classnames");

var SettingsOperatorSupplier = React.createClass({

    getDefaultProps: function() {
      return {
        /**
         * Flag para informar se form esta aberto
         * @type {Boolean}
         */
        isOpen: false
      }
    },

    getClassList: function() {
      return classNames(
        "Settings-type-user",
        { "u-hidden": !this.props.isOpen }
      );
    },

    selectOperator: function(operator){
        var id = operator.id,
            name = operator.name,
            regionId = operator.regionId,
            regionName = operator.regionName;
        this.props.fullLiveSearch(name);
        window.Storage.Operator = operator;
        window.Channel.emit("ChangeTypeUser:operator", {operatorId:id, regionId: regionId});
        window.Channel.emit("ChangeTypeUser", {regionName: regionName, operatorName: name, idOperator:id});
        this.goHome();
    },

    selectSupplier: function(id){
        //TODO Código repetido "#hlskfjghlskvy"
        var form = $('<form>', {method: 'POST', action: '/'+window.location.pathname.split("/")[1]+'/UI/home'});
        form.append($('<input>', {name:"supplierId", value:id}));
        form.submit();
    },

    goHome: function(){
            if(location.hash[2] !== "?"){
                location.href = "#"
                console.warn("MOCK - avoid reloading");
                location.reload();
            }
    },

    render: function(){
      var self = this;
      var list = this.props.list;
      var operators = list.operators;
      var suppliers = list.suppliers;
      var divStyle = {
            "borderBottom": "1px solid #DDDEDF",
            "borderTop": "1px solid #DDDEDF"
        };

        return(
            <div  className={this.getClassList()}>
                <ul>
                    <li className={"Select-option-title"} style={divStyle}>Operators</li>
                    {operators.map(function(value){
                        return <li key={value.id} onClick={self.selectOperator.bind(self,value)} className="Select-option" dangerouslySetInnerHTML={{__html: value.html}}></li>
                    })}
                </ul>
                <ul>
                    <li className={"Select-option-title"} style={divStyle}>Suppliers</li>
                    {suppliers.map(function(value){
                        return <li key={value.id} onClick={self.selectSupplier.bind(self, value.id)} className="Select-option"  dangerouslySetInnerHTML={{__html: value.html}} ></li>
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = SettingsOperatorSupplier;
