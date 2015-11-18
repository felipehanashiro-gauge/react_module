/* eslint-env node */

"use strict"

var React = require("react");

var AdvancedAnalysis = React.createClass({

	getDefaultProps: function() {
		return {
			open: "SHOW ADVANCED ANALYSIS",
			close: "HIDE ADVANCED ANALYSIS"
		}
	},

	getInitialState: function() {
		return {
			name: this.props.open
		}
	},
	componentDidMount: function () {
        window.Channel.on("settings:submit", this.listener);
	},
	listener: function (data) {
	 	this.params = data;
	},
	first:false,

	open:false,

    handleClick: function(event) {

    	if(!this.first){
            window.Channel.emit("rank:fetch", this.params);
    		this.first = true;
    	}

    	if(this.open){
    		this.open = false;
    		this.setState({name: this.props.open});
    	}else{
    		this.open = true;
    		this.setState({name: this.props.close});
    	}
        window.Channel.emit("advancedAnalysis:change", this.open);
    },

	render: function() {
		return (
			<div
				onClick={this.handleClick}
				className={"Advanced-settings"}>
				{this.state.name}
			</div>
		);
	}
});

module.exports = AdvancedAnalysis;
