"use strict";

module.exports = {
  chart: {
    type: "column",
    style: {
      fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    }
  },
  colors: [
      // Priority colors
      "rgba(107,123,134,.7)",
      "rgba(157,155,155,.7)",
      "rgba(109,86,74,.7)",
      "rgba(221,155,30,.7)",
      "rgba(241,223,53,.7)",
      "rgba(236,233,130,.7)",
      // Other colors
      "rgba(204,213,88,.7)",
      "rgba(156,188,93,.7)",
      "rgba(119,172,91,.7)",
      "rgba(91,151,137,.7)",
      "rgba(115,181,207,.7)",
      "rgba(106,142,197,.7)",
      "rgba(71,91,159,.7)",
      "rgba(86,77,149,.7)",
      "rgba(117,76,146,.7)"
  ],
  tooltip: {
    headerFormat: "",
    pointFormat: "{series.name}: {point.y}",
    valueDecimals: 2,
    useHTML: true,
    shared: false
  },
  xAxis: {},
  yAxis: {
    title: {
      text: ""
    },
    labels: {
      format: "{value:.2f}"
    }
  },
  legend: {
    enabled: true,
    itemStyle: {
        fontWeight: "normal"
    }
  },
  title: {
    text: "",
    style: {
      color: "#878787",
      fontSize: "12px",
      textTransform: "uppercase"
    }
  },
  credits: {
    enabled: false
  },
  empty: false
};
