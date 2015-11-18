/* eslint-env node */
"use strict";

module.exports = {

  getChartOptions: function(){

      var options =  {
          "chart":{
              "type":"bubble",
              "zoomType":"xy"
          },
          "title":{
              "text":"SCHEDULE RELIABILITY vs. DAILY UTILIZATION "
          },
          "xAxis":{
              "title":{
                  "text":"FH/Day"
              }
          },
          "yAxis":{
              "max":100,
              "minPadding":0.1,
              "title":{
                  "text":"SR (%)"
              },
              "labels":{
                formatter : function(){
                  return parseFloat(Math.round(this.value * 100) / 100).toFixed(2);
                }
              }
          },
          "credits":{
              "enabled":false
          },
          "exporting":{
              "scale":4
          },
          "navigation":{
              "buttonOptions":{
                  "enabled":true
              }
          },
          "colors":['#0C4188', '#3894D1', '#34C7D6', '#2DA28E', '#4ABD61',
                    '#7BC862', '#BDD85E', '#E8E883', '#F9F0A0', '#FFD548',
                    '#FF9432', '#FF855A', '#AF5413', '#6E4C44', '#402724'],
          "legend":{
              "title":{
                  "text":"Operator (scheduled flights representativeness)"
              }
          },
		      "tooltip": {
					       formatter: function() {
	                	return '<b>'+ this.series.name +'</b><br/>'+
	                    'SR: '+ Highcharts.numberFormat(this.y, 2) + '%' +
	                    ' <br/> FH/Day: '+Highcharts.numberFormat(this.x, 2) +
	                    ' <br/>Representativeness: '+Highcharts.numberFormat(this.point.z, 2) + '%';
	                }
	        }
      }
    return options;
  }
};
