/* eslint-env node */

"use strict"

var React = require("react"),
	Settings = require("./Settings"),
	classNames = require("classnames");

var ChangeFilter = React.createClass({
	getInitialState: function() {
	  return {
			isSelected: false
		};
	},
	
	componentDidMount: function() {
		var that = this;
		window.Channel.on("changeFilter:change", function(filter) {
			var isActive;
			if(that.props.filter == filter){
				isActive = true;
			}else{
				isActive = false;
			}
			that.setState({isSelected: isActive});
		});
		
		window.Channel.emit("changeFilter:change", "64");
		
		window.Channel.on("settings:submit", this.listener);
	},
	listener:function(data){
		var param = JSON.parse(data);
		window.Channel.emit("changeFilter:change", param.period);
	},
	handleClick: function() {	
		window.Channel.emit("changeFilter:change", this.props.filter);
		window.Channel.emit("settings:change", {
			name: "period",
			value: this.props.filter
	    });
	
	},


	render:function(){
		var classList = classNames("ChangeFilter", {
			"is-active": this.state.isSelected
		});

		return(
		  <div className={classList} onClick={this.handleClick}>
		    <span>Change Filter</span>
		  </div>
		);
	}
});

module.exports = ChangeFilter;
