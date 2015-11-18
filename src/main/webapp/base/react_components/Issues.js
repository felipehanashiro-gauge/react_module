/* eslint-env node */
"use strict"

var React = require("react"),
    ReactDOM = require('react-dom'),
  Chart = require("./Chart"),
  TableRank = require("./TableRank"),
  Settings = require("./Settings");

var Issues = React.createClass({
  componentDidMount: function() {
    var channel = window.Channel,
      self = this;

    window.Channel.on("settings:submit", function(){
    	self.code = undefined;
    });


    window.Channel.on("rank:compactView", function(value){
    	if(value){
    		$("#table-ranking-content").removeClass('fullBackground');
    	}else{
    		$("#table-ranking-content").addClass('fullBackground');
    	}
    });

    // Mudanca de abas da tabela de issues
    window.Channel.on("rank:changeView", function(href) {
    	var findNode = ReactDOM.findDOMNode,
        chart = findNode(this.refs.chart);

	      switch (href) {
	        case "rateranking/failcode/table":
	        case "rateranking/technology/table":
	        case "rateranking/ata/table":
	          self.code = undefined;
	          chart.classList.add("u-hidden");
	          $(".Table-rank-value").removeClass("is-active");
	          window.Channel.emit("rank:compactView", false);
	          window.Channel.emit("rank:subView", false);
	          break;
	        case "rateranking/failcode/system-module/table":
	        	self.code = undefined;
	        	chart.classList.add("u-hidden");
		        $(".Table-rank-value").removeClass("is-active");
		        window.Channel.emit("rank:compactView", false);
	        	break;
	        case "rateranking/ata/subata/table":
	        	self.code = undefined;
	        	break;
	        case "rateranking/ata/bar":
	        case "rateranking/ata/line":
	        case "rateranking/ata/pie":
	        case "rateranking/ata/subata/bar":
	        case "rateranking/ata/subata/line":
	        case "rateranking/ata/subata/pie":
	        case "rateranking/technology/line":
	        case "rateranking/technology/bar":
	        case "rateranking/failcode/line":
	        case "rateranking/failcode/bar":
	        case "rateranking/failcode/pie":
	        case "rateranking/failcode/system-module/bar":
	        case "rateranking/failcode/system-module/line":
	          chart.classList.remove("u-hidden");
	          window.Channel.emit("rank:compactView", true);
	          break;
	      }

      $(window).resize();
		}.bind(this));


    $(ReactDOM.findDOMNode(this.refs.table)).on("click", ".Table-rank-fc td:first-child", function(e) {
    	var type = "";
    	self.code = undefined;

    	if ($("#failcode").parent().hasClass("is-active")) {
    		type = "failcode";


        } else if ($("#ata").parent().hasClass("is-active")) {
        	type = "ata";

        }

    	if ($(".Tabs-table-item").hasClass("is-active") === false) {
            window.Channel.emit("rank:compactView", false);
            window.Channel.emit("tabs:reset", {id: "tab-ranking"});
    	}

        $(".Table-rank-value").removeClass("is-active");
        $(".Issues-chart").addClass("u-hidden");

    	self.props.updateTable(type);
    });

    // Clique no failcode
    $(ReactDOM.findDOMNode(this.refs.table)).on("click", "[data-id]", function(e) {
        if ($(this).closest(".compact-Table").size()) {
        	var params = JSON.parse(Settings.getParams()),
            	id = this.dataset.id;

        	var type = "";

        	if ($("#failcode").parent().hasClass("is-active")) {
        		type = "system-module";
        		if(self.code){
        			params.failcodeId = self.code;
        			params.systemModuleId = id;
        		}else{
        			params.failcodeId = id;
        		}

            } else if ($("#ata").parent().hasClass("is-active")) {
            	type = "subata";
            	if(self.code){
            		params.ataId = self.code;
            		params.subataId = id;
            	}else{
            		params.ataId = id;
            	}
            }else if ($("#technology").parent().hasClass("is-active")) {
            		params.technologyId = id;
            }

        	if ($(".Tabs-table-item").hasClass("is-active") === false) {
        		$("[data-id].is-active").removeClass("is-active");
        		$(this).addClass("is-active");
        		self.props.updateChart(JSON.stringify(params));
    	      }else{

    	    	  var fcArray = [];

    	    	  $(this).find('td').map(function(index, value){
    	    		  fcArray.push($(value).text());
    	    	  })


    	    	if(!self.code){
    	    		self.code = id;
    	    		self.props.updateTable(type, id, fcArray, JSON.stringify(params));
    	    	}
    	      }
        }
    });

    $(ReactDOM.findDOMNode(this.refs.table)).on("click", "[data-id] td:nth-child(3)", function(e) {
    	var thisParent = $(this).parent();
        var params = JSON.parse(Settings.getParams()),
        	id = parseInt(thisParent.data("id"), 10);
    	var type = "";

    	if ($("#failcode").parent().hasClass("is-active")) {
    		type = "system-module";
    		if(self.code){
    			params.failcodeId = self.code;
    			params.systemModuleId = id;
    		}else{
    			params.failcodeId = id;
    		}

        } else if ($("#ata").parent().hasClass("is-active")) {
        	type = "subata";
        	if(self.code){
        		params.ataId = self.code;
        		params.subataId = id;
        	}else{
        		params.ataId = id;
        	}
        }

    	if ($(".Tabs-table-item").hasClass("is-active") === false) {
    		$("[data-id].is-active").removeClass("is-active");
    		thisParent.addClass("is-active");
    		self.props.updateChart(JSON.stringify(params));
	      }else{

	    	  var fcArray = [];

	    	  thisParent.find('td').map(function(index, value){
	    		  fcArray.push($(value).text());
	    	  })


	    	if(!self.code){
	    		self.code = id;
	    		self.props.updateTable(type, id, fcArray, JSON.stringify(params));
	    	}
	      }
    });

  },

  render: function() {
    var channel = window.Channel;

    return (
      <section>
        <div className={"Issues-table fullBackground"} id="table-ranking-content" ref={"table"}>
          <TableRank url={"rateranking/failcode/table"} channel={channel} />
        </div>

        <div className={"Issues-chart u-hidden"} id="chart-bar-content" ref={"chart"}>
          <Chart initialUrl={"rateranking/failcode/bar"} initialType={"bar"} channel={channel} id="rateranking" />
        </div>
      </section>
    );
  }
});

module.exports = Issues;
