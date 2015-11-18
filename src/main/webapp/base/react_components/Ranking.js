/* Componente para Benchmark */
"use strict";

var React = require("react"),
  TabList = require("./TabList"),
  Chart = require("./Chart"),
  Issues = require("./Issues"),
  Settings = require("./Settings"),
  BaseComponentWithTabs = require("./mixins/BaseComponentWithTabs");

var ReactPropTypes = React.PropTypes,
  Ranking;


function getParams(type) {
	var params = JSON.parse(Settings.getParams());
  	var firstRow = $('.Table-rank-value.is-active');
	if(firstRow.length == 0){
		firstRow = $(".Table-rank-value").first();  
	}

  if(!type && type != "rateranking/failcode/" && type != "rateranking/ata/" && type != "rateranking/technology/"){
	  if (firstRow) {
	    if ($("#failcode").parent().hasClass("is-active")) {
	      firstRow.addClass("is-active");
	      
	      if(!firstRow.data('code')){
	    	  params.failcodeId = parseInt(firstRow.data('id'), 10);
	      }else{
	    	  params.failcodeId = parseInt(firstRow.data('code'), 10);
	    	  params.systemModuleId = parseInt(firstRow.data('id'), 10);
	      }
	       
	    } else if ($("#ata").parent().hasClass("is-active")) {
	      firstRow.addClass("is-active");
	      
	      if(!firstRow.data('code')){
	    	  params.ataId = parseInt(firstRow.data('id'), 10);
	      }else{
	    	  params.ataId = parseInt(firstRow.data('code'), 10);
	      }
	    }else if($("#technology").parent().hasClass("is-active")){
	    	firstRow.addClass("is-active");
		      
	        if(!firstRow.data('code')){
	    	  params.technologyId = firstRow.data('id');
	        }else{
	    	  params.technologyId = firstRow.data('code');
	        }
	    }
	  }
  }

  return JSON.stringify(params);
}

Ranking = React.createClass({
  mixins: [BaseComponentWithTabs],

  changeTypeHandler: function(type) {
    var DEFAULT_VIEW = "table";

    window.Channel.emit("tabs:reset", {
      id: "tab-ranking"
    });

    window.Channel.emit("rank:changeView", this.state.selectedType + DEFAULT_VIEW );

    this.changeType(type, { params: getParams(type), id: "rateranking", selectedView: DEFAULT_VIEW });

    $(".Table-rank-value").removeClass("is-active");
  },

  changeViewHandler: function(view) {
	var  href = this.state.selectedType + view;
	/*
	if(href != "rateranking/technology/pie"){
	*/
		this.changeView(view, { params: getParams(), id: "rateranking" });
		window.Channel.emit("rank:changeView", href);
	/*
     }else{
		window.Channel.emit("tabs:reset", {
		      id: "tab-ranking"
		});
		
		alert("Feature is not yet implemented.");
	}
	*/
  },

  updateChart: function(params) {
    if (this.viewIsTable(this.state.selectedView) === false) {
      window.Channel.emit("Chart:update", {url: this.getUrl(), params: params, type: this.state.selectedView,  id: "rateranking"});
    }
  },
  
  updateTable: function(type, id, fcArray, params){
	  var url;
	  switch(type){
	     case "failcode":
	    	 url = "rateranking/failcode/table";
	    	 window.Channel.emit("rank:subView", false);
	    	 this.setState({selectedType:"rateranking/failcode/"});
	    	 window.Channel.emit("rank:update", url);
		 break;
	     case "system-module":
	    	 url = "rateranking/failcode/system-module/table";
	    	 window.Channel.emit("rank:subView", true);
	    	 this.setState({selectedType:"rateranking/failcode/system-module/"});
	    	 window.Channel.emit("rank:fetchSub", {id:id, fcArray:fcArray, url:url, params:params});
		 break;
	     case "ata":
	    	 url = "rateranking/ata/table";
	    	 window.Channel.emit("rank:subView", false);
	    	 this.setState({selectedType:"rateranking/ata/"});
	    	 window.Channel.emit("rank:update", url);
	     break;
	     case "subata":
	    	 url = "rateranking/ata/subata/table";
	    	 window.Channel.emit("rank:subView", true);
	    	 this.setState({selectedType:"rateranking/ata/subata/"});
	    	 window.Channel.emit("rank:fetchSub", {id:id, fcArray:fcArray, url:url, params:params});
	     break;
	  }
	  
	  
  },

  render: function() {
    var props = this.props;

    return (
      <section className={"Rank-panel"} ref="rankTable">
        <section className={"Panel-area"}>
          <TabList
            list={props.typeTabList}
            className={"issues-Tabs"}
            parentHandler={this.changeTypeHandler}
          />

          <TabList
            list={props.viewTabList}
            className={"chartIssues-Tabs chart-Tabs"}
            parentHandler={this.changeViewHandler}
            id="tab-ranking"
          />
        </section>
        <Issues channel={channel} updateChart={this.updateChart} updateTable={this.updateTable} />
      </section>
    );
  }
});

module.exports = Ranking;
