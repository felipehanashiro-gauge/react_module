/* eslint-env node */
/*
 * Componente para o minigrafico da caixa de visao de Operador, Regiao e Mundo
 */

"use strict"

var React = require("react"),
  ReactDOM = require('react-dom'),
  request = require("../javascripts/modules/request"),
  is = require("./../javascripts/modules/is");

var BoxChart = React.createClass({
  getDefaultProps: function() {
    return {
      id: "chart",
      tendency: 0,
      series: []
    };
  },

  componentDidMount: function() {
    this.createChart();
  },

  componentDidUpdate: function() {
    this.createChart();
  },

  getTendencyClass: function(tendency) {
    var className;

    tendency = tendency || this.props.tendency;

    if (is.number(tendency) === false) {
      throw new TypeError(
        "BoxChart.getTendencyClass(): Value is not a Number"
      );
    }

    if (tendency > 0) {
      className = "tendencychartup-Icon";
    } else if (tendency < 0) {
      className = "tendencychartdown-Icon";
    } else {
      className = "u-hidden";
    }

    return className;
  },

  getOptions: function(series) {
    var target = this.props.target;
    return {
      chart: {
        type: "column",
        backgroundColor: null,
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0],
        height: 30
      },
      credits: {
        enabled: false
      },
      colors: ["#919191"],
      legend: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      plotOptions: {
        series: {
          pointWidth: 8,
          pointPadding: 0
        },
        column: {
          borderWidth: 0
        }
      },
      series: series || this.props.series,
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '',
  			pointFormat: '{point.y}%',
  			valueDecimals: 2,
  			shared: false,
        positioner: function(x, y, point) {
          return {
            x: point.plotX - 35,
            y: point.plotY - 40
          };
        }
      },
      yAxis: {
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
        min: 98,
        minRange: target,
        title: {
          enabled: false
        }
      },
      xAxis: {
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        minorTickLength: 0,
        tickWidth: 0
      }
    };
  },

  createChart: function() {
    var series = this.props.series,
      options = this.getOptions(series),
      target = this.props.target;

    this
      .addTarget(options, target)
      .addPlotline(options, target)
      .renderChart(options);
  },

  addTarget: function(options, target) {
    options.series.push({
      type: "scatter",
      marker: {
        enabled: false
      },
      data: [target || this.props.target]
    });

    return this;
  },

  addPlotline: function(options, target) {
    options.yAxis.plotLines = [{
      color: "#E3B839",
      width: 1,
      value: target || this.props.target,
      zIndex: 6
    }];

    return this;
  },

  renderChart: function(options) {
    $(ReactDOM.findDOMNode(this.refs.chart)).highcharts(options);
  },

  render: function() {
    var tendency = this.props.tendency;
    return (
      <div className={"Box-chartwrapper"}>
        <div className={"Box-chart"} ref={"chart"}></div>
        <i className={this.getTendencyClass(tendency)} title={"Tendency"}>
          {tendency}
        </i>
      </div>
    );
  }
});

module.exports = BoxChart;
