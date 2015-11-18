"use strict";

module.exports = {
		chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
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
        credits: {
            enabled: false
        },
    	title: {
            text: "",
		    style: {
				color: "#878787",
				fontSize: "12px",
				textTransform: "uppercase"
		    }
        },
        tooltip: {
            formatter: function() {
                return '<strong>' + this.point.name + '</strong>: ' + this.point.y + '%';
            }
        },
        legend: {
			itemMarginTop: 2,
			itemMarginBottom: 2,
        	itemStyle: {
                fontSize: "10px",
                fontWeight: "normal",
				cursor: "default"
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 240,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
				point: {
					events: {
						legendItemClick: function(event) {
							event.preventDefault();
						}
					}
				}
            }
        }
}
