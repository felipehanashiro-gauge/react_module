/* eslint-env node */

"use strict"


var React = require("react"),
    LiveSearch = require("./LiveSearch.js"),
    SettingsOperatorSupplier = require("./SettingsOperatorSupplier.js"),
    Dropdown = require("./mixins/Dropdown"),
    Api = require("./../javascripts/modules/api");


var UserTypeChange = React.createClass({
    mixins: [Dropdown],
    componentDidMount: function() {
        this.fetch();
    },
    maxLine:5,
    getInitialState: function() {
        return {
            list:{
                suppliers:[],
                operators:[]
            },
            /**
             * Flag para informar se SettingsOperatorSupplier esta aberto
             * @type {Boolean}
             */
            isOpen:false,
            input:null
        }
    },

    changeInputLiveSearch: function(text){
      this.setState({input:text});
    },

    search:function(text){
      this.changeInputLiveSearch(text);

        var boldString = function(text, substring){
            var substring = substring.toLowerCase();
            var begin = text.substr(0, text.toLowerCase().indexOf(substring));
            var bold = text.substr(text.toLowerCase().indexOf(substring), substring.length);
            var end = text.substr(text.toLowerCase().indexOf(substring)+ substring.length);
            return begin + bold.bold() + end;
        }

        var filter = function(array, text){
            return array.filter(function(value){
                if(!value.name){
                    value.name = "";
                }
                return value.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
        };

        var map = function(array, text){
            return array.map(function (value) {
                value.html = boldString(value.name, text);
                return value;
            });
        }

        var operators = filter(this.list.operators, text);
        operators = map(operators, text).slice(0, this.maxLine);

        var suppliers = filter(this.list.suppliers, text);
        suppliers = map(suppliers, text).slice(0, this.maxLine);

        this.setState({ list: {operators:operators, suppliers:suppliers} });

    },

    list:{
        suppliers:[],
        operators:[]
    },

    open: function(status){
        this.toggle();

        if(status){
          var list = this.list;
          this.setState({ list:{operators:list.operators.slice(0, this.maxLine), suppliers:list.suppliers.slice(0, this.maxLine)}})
        }

    },

    fetch: function() {

        var self = this;
        var list = self.list;

        var mapHtml = function(array){
            return array.map(function (value) {
                value.html = value.name;
                return value;
            });
        }

        Api.Operator.favoriteOperator(
            function(data){
                Api.Store.set("Operator", data);
                window.Channel.emit("ChangeTypeUser:operator", {operatorId:data.id, regionId:data.regionId});
                window.Channel.emit("ChangeTypeUser", {regionName: data.regionName, operatorName: data.name, idOperator:data.id});

                if (self.isMounted()) {
                    self.setState({input:data.name, disabled:data.operatorUser});
                }
            },
            self.fetchError
        )

        Api.Supplier.favoriteSupplier(
            function(data){
                try {
                    if(data.supplierUser){
                        //TODO Código repetido pesquisar "#hlskfjghlskvy"
                        var form = $('<form>', {method: 'POST', action: '/'+window.location.pathname.split("/")[1]+'/UI/home'});
                        form.append($('<input>', {name:"supplierId", value:data.id}));
                        form.submit();
                    }
                }catch(e){
                    console.info("[UserTypeChange] This user doesn't have supplier.");
                }
            },
            self.fetchError
        )

        Api.Operator.list(function(data){
            list.operators = mapHtml(data);
        }, self.fetchError);

        Api.Supplier.list(function(data){
            list.suppliers = mapHtml(data);
        }, self.fetchError);


    },
    fetchError: function(err) {
        throw err;
    },

    fullLiveSearch: function(name){
      this.setState({input:name});
    },

    render:function(){
        return (
            <div>
                <LiveSearch search={this.search} open={this.open} input={this.state.input} disabled={this.state.disabled} changeInputLiveSearch={this.changeInputLiveSearch}/>
                <SettingsOperatorSupplier list={this.state.list}  isOpen={this.state.isOpen} fullLiveSearch={this.fullLiveSearch}/>
            </div>);
    }
});

module.exports = UserTypeChange;
