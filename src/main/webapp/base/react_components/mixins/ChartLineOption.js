"use strict";

module.exports = {
  chart: {
    type: "spline",
    borderColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    style: {
      fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    },
    zoomType: "x"
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 0
      }
    }
  },
  colors: [
    // Priority colors
    "rgb(107,123,134)",
    "rgb(157,155,155)",
    "rgb(109,86,74)",
    "rgb(221,155,30)",
    "rgb(241,223,53)",
    "rgb(236,233,130)",
    // Other colors
    "rgb(204,213,88)",
    "rgb(156,188,93)",
    "rgb(119,172,91)",
    "rgb(91,151,137)",
    "rgb(115,181,207)",
    "rgb(106,142,197)",
    "rgb(71,91,159)",
    "rgb(86,77,149)",
    "rgb(117,76,146)"
  ],
  legend: {
    enabled: true,
    itemStyle: {
      fontWeight: "normal"
    }
  },
  navigator: {
    enabled: false
  },
  tooltip: {
    headerFormat: "<span style=\"font-size:12px;font-weight:bold\">{point.key}</span><table>",
    pointFormat: "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" + "<td style=\"padding:0\"><b>{point.y}%</b></td></tr>",
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
    xDateFormat: '%b %Y'
  },
  yAxis: {
    title: {
      text: ""
    },
    labels: {
      format: "{value:.2f}%"
    },
    opposite: false,
    max: 100
  },
  xAxis: {
//    labels: {
//      formatter: function() {
//        return Highcharts.dateFormat("%b/%y", this.value);
//      }
//    }
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
  empty: false,
  rangeSelector: {
    enabled: false
  }
};
