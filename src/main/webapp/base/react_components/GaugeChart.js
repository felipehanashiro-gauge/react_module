/* eslint-env node */
/*
 * Grafico de Gauge
 * Exemplo de aplicacao: Caixa de Fleet Composition
 */

"use strict"

var React = require("react"),
    ReactDOM = require('react-dom'),
  is = require("../javascripts/modules/is"),
  iterate = require("../javascripts/modules/iterate");

var GaugeChart = React.createClass({
  getDefaultProps: function() {
    return {
      name: "Chart",
      above: {
        percent: 0
      },
      below: {
        percent: 0
      },
      nodata: {
        percent: 0
      }
    }
  },

  componentDidUpdate: function() {
    this.createChart();
  },

  CHART_CONFIG: {
    above: {
      name: "Above Target",
      color: "#44C8C3",
      y: null
    },
    below: {
      name: "Below Target",
      color: "#D73335",
      y: null
    },
    nodata: {
      name: "No Data",
      color: "#c0bfbf",
      y: null
    }
  },

  updateSerieData: function(dataList) {
    if (is.array(dataList) === false) {
      throw new TypeError("GaugeChart.updateSerieData(): 'dataList' is not an Array");
    }

    return function(model) {
      dataList.push(model);
    }
  },

  /**
   * Busca a configuracao salva de um dado da serie no objeto CHART_CONFIG
   * @param {String} key
   */
  getChartConfig: function(key) {
    var config = this.CHART_CONFIG[key];

    if (is.object(config) === false) {
      throw new TypeError("GaugeChart.getChartConfig(): 'config' is not an Object.");
    }

    return config;
  },

  /**
   * Retorna o valor da propriedade 'percent' do objeto, necessaria para montar
   * o grafico
   * @param {Object} item
   */
  getDataPercent: function(item) {
    var percent = item.percent;

    if (is.number(percent) === false) {
      throw new TypeError("GaugeChart.getDataPercent(): 'percent' is not a Number.");
    }

    return percent;
  },

  createSerieData: function(callback) {
    if (is.functionType(callback) === false) {
      throw new TypeError("GaugeChart.createSerieData(): 'callback' is not a Function");
    }

    return function(key, hash) {
      var item;
      item = this.getChartConfig(key);
      item.y = this.getDataPercent(hash[key]);
      callback(item);
    };
  },

  getSeries: function(data) {
    return [{
      type: "pie",
      name: this.props.name,
      innerSize: 32,
      data: data
    }]
  },

  /**
   * FIXME Refatorar para forma declarativa
   */
  createChart: function() {
    var serieData = [],
      updateSerieData = this.updateSerieData(serieData),
      options;

    iterate(this.props.data, this.createSerieData(updateSerieData).bind(this));
    options = this.getOptions(this.getSeries(serieData));
    this.renderChart(options);
  },

  getOptions: function(series) {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: null,
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0]
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      title: {
        text: this.props.title,
        verticalAlign: "middle",
        style: {
          fontSize: "10px",
          fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
          textTransform: "uppercase",
          color: "#7d7d7d"
        },
        y: 4
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          size: 50,
          startAngle: 0,
          endAngle: 360,
          center: ["50%"]
        },
        series: {
          states: {
            hover: {
              halo: false
            }
          }
        }
      },
      series: series
    };
  },

  renderChart: function(options) {
    $(ReactDOM.findDOMNode(this)).highcharts(options);
  },

  render: function() {
    return (
      <div
        className={"Box-fleetcomposition-chartwrapper"}
        ref={"chart"}>
      </div>
    );
  }
});

module.exports = GaugeChart;
