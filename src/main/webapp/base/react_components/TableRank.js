/* eslint-env node */

"use strict"

var React = require("react"),
	classNames = require("classnames"),
	request = require("../javascripts/modules/request"),
	Api = require("../javascripts/modules/api"),
	is = require("../javascripts/modules/is"),
	Settings = require("./Settings"),
	stringMatcher = require("../javascripts/modules/stringMatcher");


function number_format( number, decimals, dec_point, thousands_sep ) {
    // %        nota 1: Para 1000.55 retorna com precisão 1 no FF/Opera é 1,000.5, mas no IE é 1,000.6
    // *     exemplo 1: number_format(1234.56);
    // *     retorno 1: '1,235'
    // *     exemplo 2: number_format(1234.56, 2, ',', ' ');
    // *     retorno 2: '1 234,56'
    // *     exemplo 3: number_format(1234.5678, 2, '.', '');
    // *     retorno 3: '1234.57'
    // *     exemplo 4: number_format(67, 2, ',', '.');
    // *     retorno 4: '67,00'
    // *     exemplo 5: number_format(1000);
    // *     retorno 5: '1,000'
    // *     exemplo 6: number_format(67.311, 2);
    // *     retorno 6: '67.31'

	if(number){
	    var n = number, prec = decimals;
	    n = !isFinite(+n) ? 0 : +n;
	    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	    var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
	    var dec = (typeof dec_point == "undefined") ? '.' : dec_point;

	    var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	    var abs = Math.abs(n).toFixed(prec);
	    var _, i;

	    if (abs >= 1000) {
	        _ = abs.split(/\D/);
	        i = _[0].length % 3 || 3;

	        _[0] = s.slice(0,i + (n < 0)) +
	              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

	        s = _.join(dec);
	    } else {
	        s = s.replace('.', dec);
	    }

	    return s;
	}else{
		return null;
	}
}

var TableRank = React.createClass({
	getInitialState: function() {
	    return {
	    		data: {},
				cacheData: { rateRankingList: [] },
				search:"",
				compactView: false,
				subView: false
	    }
	  },
    quantityRateRanking:"TEN",
	params:undefined,
	componentDidMount: function () {
		var fetch = this.fetch;
		var self = this;

		window.Channel.on("settings:submit", this.listener);

		window.Channel.on("rank:update", function(href) {
			self.fcArray = undefined;
			self.id = undefined;
			this.urlCurrent = href;
			fetch({ url: href, params:this.params});
		}.bind(this));

		window.Channel.on("rank:updateSub", function(config) {
			this.urlCurrent = config.href;
			fetch({ url: config.href, params:config.params});
		}.bind(this));

	    window.Channel.on("rank:fetch", function(params) {
	    	self.fcArray = undefined;
	    	self.id = undefined;
	    	fetch({params:params});
	    });

	    window.Channel.on("rank:fetchSub", function(data) {
	    	self.id = data.id;
	    	self.fcArray = data.fcArray;
	    	this.urlCurrent = data.url;
	    	fetch({url:data.url, params:data.params});
	    });

		window.Channel.on("rank:compactView", function(compactView) {
		  this.setState({ compactView: compactView });
		}.bind(this));

		window.Channel.on("rank:subView", function(subView) {
			this.setState({ subView: subView });
		}.bind(this));
	},

    componentWillUnmount: function () {
        window.Channel.removeListener("settings:submit", this.listener);
    },

    componentDidUpdate: function () {
        this.removeLoading();
    },

    listener: function (data) {
    	this.fcArray = undefined;
    	this.params = data;
      this.fetch({params: data});
    },

    handleChangeSearch: function(event){
    	var value = event.target.value;
    	var data =  JSON.parse(JSON.stringify(this.state.cacheData));
    	var activeLineId = $('.Table-rank-value.is-active').data('id');
    	if(activeLineId){
    		this.activeLineId = activeLineId.toString();
    	}

    	data.rateRankingList = data.rateRankingList.slice(0, data.rateRankingList.length-4);
    	
    	for(var i in data.rateRankingList){
    		if(data.rateRankingList[i].id != this.activeLineId){
    			data.rateRankingList[i].active = false;
    		}else{
    			data.rateRankingList[i].active = true;
    		}
    	}

    	data.rateRankingList = data.rateRankingList.filter(function(object){
    		return object.description.toLowerCase().indexOf(value.toLowerCase())> -1;
    	});

    	this.setState({ data: data, search:value});

    },

    handleChangeViewing: function(event){
    	this.quantityRateRanking = event.target.value;
    	 var params = Settings.getParams();
         this.fetch({params: params});
    },

    fetch: function(config) {

        var props = this.props;
        var urlCurrent = this.urlCurrent;
        config = config || {};

        if(config.params || this.quantityRateRanking != "TEN"){
        	var params;
        	if(config.params){
        		params = JSON.parse(config.params);
        	}else{
        		params = JSON.parse(Settings.getParams());
        	}

        	params.quantityRateRanking = this.quantityRateRanking;
        	params = JSON.stringify(params);
        	config.params = params;
        }

        this.addLoading();
        Api._post( (config.url || urlCurrent || props.url), config.params, this.updateState, this.fetchError);

      },

	  getUrlType: function() {
		var urlCurrent = this.urlCurrent || "";

		if (urlCurrent.indexOf("ata") != -1) {
  			return "ata";
  		}
		if (urlCurrent.indexOf("technology") != -1) {
  			return "technology";
  		}

		return "failcode";
	  },

      addLoading: function() {
    	  var classList = this.getDOMNode().classList;

    	  if (is.object(classList)) {
    		  this.getDOMNode().classList.add("is-loading");
    	  }
      },

      removeLoading: function() {
    	  var classList = this.getDOMNode().classList;

    	  if (is.object(classList)) {
    		  this.getDOMNode().classList.remove("is-loading");
    	  }
      },

      updateState: function(data) {
    	  var cacheData;
    	  if (typeof data === "string") {
    		  cacheData = JSON.parse(data);
    		  data = JSON.parse(data);
    	  }

      	  data.rateRankingList = data.rateRankingList.slice(0, data.rateRankingList.length-4);

    	  this.setState({data: data, cacheData: cacheData, search: "" });
      },

      fetchError: function(err) {
    	    this.removeLoading();
    	    throw err;
    	  },

				getClassList: function() {
				  return classNames("Table-rank-total-div", {
						"u-hidden": this.state.compactView
					});
				},

				getClassListThead: function() {
				  return classNames("Table-rank-thead-div", {
						"compact-Table": this.state.compactView
					});
				},

				getClassListTable: function() {
					return classNames("Table-rank", {
						"compact-Table": this.state.compactView
					});
				},

				isCompactView: function() {
				  return classNames({
						"u-hidden": this.state.compactView
					});
				},

	render:function(){
		return (
			<div className={"Table-rank-background"}>
				<div className={this.getClassListThead()}>
					<table className={this.getClassListTable()} >
						<TableRank.thead
							search={this.state.search}
							data={this.state.cacheData}
							handleChangeSearch={this.handleChangeSearch}
							handleChangeViewing={this.handleChangeViewing}
							viewType={this.getUrlType()}
							compactView={this.state.compactView}
							subView={this.state.subView}
						onChange
						/>
					</table>
				</div>
				<div className={"Table-rank-tbody-div"}>
					<table className={this.getClassListTable()}>
						<TableRank.tbody
							cacheData={this.state.cacheData}
							data={this.state.data}
							viewType={this.getUrlType()}
							compactView={this.state.compactView}
							subView={this.state.subView}
							code={this.id}
							fcArray={this.fcArray}
						/>
					</table>
				</div>
				<div className={this.getClassList()}>
					<table className={"Table-rank nohover"}>
						<TableRank.total
							rankingList={this.state.cacheData.rateRankingList}
							viewType={this.getUrlType()}
							subView={this.state.subView}/>
					</table>
				</div>
				<p className={this.isCompactView()}>
					{"(*) One interruption may be caused by more than one issue"}
				</p>
			</div>
			);
	}
});


TableRank.total = React.createClass({
	getDefaultProps: function() {
	  return {
			rankingList: []
		};
	},

	getClassListSub: function(){
		return classNames({
			"u-hidden": this.props.subView !== true,
		});
	},

	getClassListSubInvert: function(){
		return classNames({
			"u-hidden": this.props.subView === true || this.props.viewType === "technology"
		});
	},

	getRowTotal: function() {
	  var DESCRIPTIONS =[ "TOTAL", "OTHERS", "CHARGEABLE INTERRUPTIONS", "SCHEDULED FLIGHTS", "NOT IDENTIFIED"];

	  function compareDescription(description){
		  for(var x in DESCRIPTIONS){
			  if(DESCRIPTIONS[x] == description){
				  return true;
			  }
		  }
		  return false;
	  }

	  var rows = [];
		this.props.rankingList.slice().reverse().map(function(row) {
		  if (row instanceof Object && compareDescription(row.description) === true) {
			    rows.push(row);
			}
		});

		return rows.reverse();
	},

	getTableValuesFromObject: function(objects) {
		var tableValueslist = [];

		for(var x in objects){
			var tableValues = [];
			var object = objects[x];
			// Filtra propriedades de rowTotal para buscar seus valores
			Object.keys(object).filter(function filterObjectProperties(key) {
			  return object[key] instanceof Object;
			}).forEach(function getInnerValues(key) {
				tableValues.push(Object.keys(object[key]).map(function(childKey) {
				  var value;
				  switch (childKey) {
				  	case "rate":
				  	  value = number_format(object[key][childKey], 4);
				  	  break;
					case "contribution":
					  value = number_format(object[key][childKey], 2);
					  break;
				  	default:
				  	  value = number_format(object[key][childKey]);
				  }
				  return value;
				}));
			});
			tableValueslist.push(tableValues);
		}
		return tableValueslist;
	},

	render: function() {


		var rows = this.getRowTotal() || {},
			rowListValuesList = this.getTableValuesFromObject(rows) || [];
		for(var x in rowListValuesList){
			var valuesList = rowListValuesList[x];
			if (valuesList.length > 0) {
				// Adiciona descricao na primeira posicao da coluna
				valuesList.unshift("");
				valuesList.unshift(rows[x].description);
				valuesList.unshift("");
			}
		}

		var self = this;

		return (
			<tbody>
				{ rowListValuesList.map(function(valuesList){
						return (<tr className={"Table-rank-value"}>
							{ valuesList.map(function(tableData, index) {
								if (tableData instanceof Array) {
									return tableData.map(function(value, index) {
										return (<td key={"total-column-" + index}>{value}</td>);
									});
								} else {
									if(index != 0 && index != 2){
										return (<td key={"total-column-" + index}>{tableData}</td>);
									}else if(index === 0){
										return (<td className={self.getClassListSub()} key={"total-column-" + index}>{tableData}</td>);
									}else{
										return (<td className={self.getClassListSubInvert()} key={"total-column-" + index}>{tableData}</td>);
									}
								}
							}) }
						</tr>)
				})
				}
			</tbody>
		);
	}
});

TableRank.tbody = React.createClass({
	getValues : function(array){
		var rateRankingList = array || [];

		var rows = [];

		rateRankingList.forEach(function(item, index) {
			var column = [];

			for (var i in item){
				if (i == "description"){
					column.push("");
					column.push(item[i]);
					column.push(<i className={"fa fa-bars"}></i>);
				} else if(i == "active"){
					column.push(item[i]);
				} else if(i != "id"){
					for(var j in item[i]){
						column.push(item[i][j]);
					}
				}
			}
			rows.push(column);
		});

		return rows;
	},

	getClassList: function(index) {
	  return classNames({
			"u-hidden": (index !== 0 && index !== 1 && this.props.compactView === true)
		});
	},

	getClassListSub: function(){
		return classNames({
			"u-hidden": this.props.subView !== true,
		});
	},

	getClassListSubInvert: function(){
		return classNames({
			"u-hidden": this.props.subView === true || this.props.viewType === "technology"
		});
	},

	getFcArrayValues(fcArray){
		var array = [];
		for(var x in fcArray){
			switch(x){
				case "0":
					array.push(<i className={"fa fa-caret-square-o-left"}></i>);
					break;
				case "1":
				case "2":
					array.push(fcArray[x]);
					break;
				default:
					array.push(Number(fcArray[x]));
					break;
			}
		}
		return array;
	},

	getTableRows: function(){
		function getNumberFormat(index, number) {
			var FORMATS = {
				"5": function() {
				  return number.toFixed(4);
				},
				"6": function() {
				  return number.toFixed(2);
				}
			}, formatter;

			formatter = FORMATS[index];

			if (typeof formatter === "function") {
				try{
				number = formatter();
				}catch(e){
					console.log(e);
				}
			}

			return number;
		}

		var rateRankingList = this.props.data.rateRankingList || [],
			rowsTotal = [];

		//rateRankingList = rateRankingList.slice(0, rateRankingList.length-4);


		var values = this.getValues(rateRankingList.slice()),
			self = this;

		var rows = (values.map(function(row, index){
			var id = rateRankingList[index].id;
			var className = "Table-rank-value";
			if(row[15]){
				className += " is-active";
			}
			return(<tr data-id={id} data-code={self.props.code} className={className}>{
					row.map(function(column, index){
						if (typeof column !== "string") {
							column =  getNumberFormat(index, column);
						}
						if(index != 0 && index != 2){
							return (<td className={self.getClassList(index)}>{column}</td>);
						}else if(index == 0){
							return (<td className={self.getClassListSub()}>{column}</td>);
						}else{
							return (<td className={self.getClassListSubInvert()}>{column}</td>);
						}

					})
				}</tr>);
			}));

		if(this.props.fcArray){
			var fcArray = this.getFcArrayValues(this.props.fcArray);
			var fcArrayRow = (<tr data-code={self.props.code} className={"Table-rank-fc"}>{
				fcArray.map(function(column,index){
					if (typeof column !== "string" && typeof column !== "object") {
						column =  getNumberFormat(index, column);
					}

					if(index != 0 && index != 2){
						return (<td className={self.getClassList(index)}>{column}</td>);
					}else if(index == 0){
						return (<td className={self.getClassListSub()}>{column}</td>);
					}else{
						return (<td className={self.getClassListSubInvert()}>{column}</td>);
					}
				})
			}</tr>);
			rows = [fcArrayRow].concat(rows);
		}

		var rateRankingListTotal = this.props.cacheData.rateRankingList || [];
		if(rateRankingListTotal.length>4){
			rateRankingListTotal = rateRankingListTotal.slice(rateRankingListTotal.length-4, rateRankingListTotal.length-1);
		}

		var valuesTotal = this.getValues(rateRankingListTotal);
		valuesTotal = valuesTotal.slice(valuesTotal.length-3, valuesTotal.length);

		return rows;
	},

	render:function(){
		return (
				<tbody>
					{this.getTableRows()}
				</tbody>
				);
	}
});











TableRank.thead = React.createClass({

	getNames: function(){
		return ['Rk.', 'Qty.(*)', 'Rate', 'Contr.(%)'];
	},

	getSubViewTitle: function() {
		var title, type = this.props.viewType;

		switch (type) {
			case "failcode":
				title = "SYS MOD";
				break;
			case "ata":
				title = "Sub ATA";
				break;
			default:
				title = null;
		}
		return title;
	},

	getDescription: function(){

		var data = this.props.data;
		var descriptions = [];

		for(var i in data){
			if(i != "rateRankingList"){
				if(data[i] != null && data[i] != ''){
					descriptions.push(data[i]);
				}
			}
		}

		return descriptions;

	},

	getClassList: function() {
		return classNames({
			"u-hidden": this.props.compactView === true,
		});
	},

	getClassListSub: function(){
		return classNames({
			"u-hidden": this.props.subView !== true,
		});
	},

	getClassListSubInvert: function(){
		return classNames({
			"u-hidden": this.props.subView === true || this.props.viewType === "technology"
		});
	},

	getDescriptionField: function(){
		var names = this.getNames(),
			self = this;

		return this.getDescription().map(function(description){
			return (
				<th
					className={self.getClassList()}
					colSpan={names.length}>
					{description.toUpperCase()}
				</th>
			);
		});
	},

	getNamesFull: function(){
		var data = this.props.data;
		var fieldNames = this.getNames();
		var names = [];

		for(var i in data){
			if(i != "rateRankingList"){
				if(data[i] != null && data[i] != ''){
					names = names.concat(fieldNames);
				}
			}
		}

		return names;
	},

	getNamesFullField: function(){
		var self = this;

		var namesFullField = this.getNamesFull().map(function(field){
			return (<th className={self.getClassList()}>{field}</th>);
		});

		return namesFullField;
	},

	getViewing: function(){
		return (
				<select onChange={this.props.handleChangeViewing}>
					<option value="TEN" selected>Top 10</option>
					<option value="TWENTY">Top 20</option>
					<option value="THIRTY">Top 30</option>
					<option value="FORTY">Top 40</option>
					<option value="FIFTY">Top 50</option>
				</select>
				);
	},

	render:function(){
		return (
				<thead>
					<tr>
						<th className={this.getClassListSub()}>FC.</th>
						<th>DESCRIPTION {this.getViewing()}</th>
						<th className={this.getClassListSubInvert()}>{this.getSubViewTitle()}</th>
						{this.getDescriptionField()}
					</tr>
					<tr>
					    <th className={this.getClassListSub()}></th>
						<th><input placeholder={"Search..."} value={this.props.search} onChange={this.props.handleChangeSearch} /></th>
						<th className={this.getClassListSubInvert()}></th>
						{this.getNamesFullField()}
					</tr>
				</thead>
		);
	}
});

module.exports = TableRank;
