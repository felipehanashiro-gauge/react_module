/* eslint-env node */

"use strict"

var React = require("react"),
ChangeFilter = require("./ChangeFilter");

var ChartFilter = React.createClass({
	render:function(){
		return (
				<section className={"Grid ChartFilter"}>
					<ChangeFilter filter="61"/>
					<ChangeFilter filter="62"/>
					<ChangeFilter filter="63"/>
					<ChangeFilter filter="64"/>
				</section>
		);
	}
});

module.exports = ChartFilter;