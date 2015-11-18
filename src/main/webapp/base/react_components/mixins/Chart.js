/* eslint-env node */
/*
 * Mixin para componente Chart
 */

"use strict";

var request = require("../../javascripts/modules/request"),
	is = require("../../javascripts/modules/is");

var Chart = {

  componentDidMount: function() {
      window.Channel.on("Chart:refresh",this.refresh);
		this.addLoading();
  },

	refresh:function(data){

		function getRepresentativeness(series, type, min, max) {
					var representativeness;

						min = min + 0.5;
						max = max - 0.5;

					var seriesReduce = series.reduce(function(memo, element) {
							if (element.visible) {
								memo.push(element.data[0][2]);
							}
							return memo;
						}, []);

						if (type === 'min') {
							representativeness = Math.min.apply(Math, seriesReduce);

							series.unshift({
								data: [{
									x: min,
									y: 100,
									z: representativeness
								}],
								name: "",
								showInLegend: false,
								color: "transparent",
								enableMouseTracking: false
							});

							return representativeness;
						}

						if (type === 'max') {
							representativeness = Math.max.apply(Math, seriesReduce);

							series.unshift({
								data: [{
									x: max,
									y: 100,
									z: representativeness
								}],
								name: "",
								showInLegend: false,
								color: "transparent",
								enableMouseTracking: false
							});

							return representativeness;
						}
		}

		var options = this.getChartOptions();

		options.series = data.map(function(item){

				var region = (item.region ? item.region+" - " : "");

			 var serie = {};
			 serie.visible = true;
			 serie.name = region + item.name;
			 serie.data = [[item.x, item.y, item.size]];
			 return serie;
		});

		var seriesReduce = options.series.reduce(function(previousValue, currentValue) {
        		/* Data[0] porque data e um array que contem 1 array e
        			posicao 0 porque e o FH/Day que preciso */
        		previousValue.push(currentValue.data[0][0]);
        		return previousValue;
    }, []);

		options.xAxis.min = Math.min.apply(Math, seriesReduce) - 0.5;
    options.xAxis.max = Math.max.apply(Math, seriesReduce) + 0.5;

		var minRepresentativeness = getRepresentativeness(options.series, 'min', options.xAxis.min, options.xAxis.max);
    var maxRepresentativeness = getRepresentativeness(options.series, 'max', options.xAxis.min, options.xAxis.max);

		var factor;
		if (maxRepresentativeness > 50) {
      factor = 1;
		} else if (maxRepresentativeness > 30) {
      factor = 3;
    } else if (maxRepresentativeness > 15) {
      factor = 5;
    } else {
    	factor = 10;
    }

		options.plotOptions = {
			bubble: {
		  	maxSize: maxRepresentativeness * factor,
		    minSize: minRepresentativeness * factor
		  }
		}

		this.removeLoading();

		this.renderChart(options);
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

  render: function(){
    return (<div className={"ChartBig"}></div>);
  }
};

module.exports = Chart;
