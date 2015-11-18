/* eslint-env node */

"use strict"

var React = require("react"),
    ReactDOM = require('react-dom'),
	ChartMixin = require("./mixins/Chart"),
	ChartOptionsMixin = require("./mixins/ChartOptions");

var Chart = React.createClass({
	mixins: [ChartOptionsMixin, ChartMixin],

  renderChart: function(options) {
		$(ReactDOM.findDOMNode(this)).highcharts(options);
		$(window).resize();
  }
});

module.exports = Chart;
