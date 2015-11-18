/* eslint-env node */
/*
 * Componente para formulario de Settings
 */

"use strict"

var React = require("react"),
  EventEmitter = require("events").EventEmitter,
  Settings = require("./Settings"),
  throttle = require("./../javascripts/modules/throttle"),
  classNames = require("classnames");

var SettingsFormChart = React.createClass({
  getDefaultProps: function() {
    return {
      /**
       * Atributo action do form
       * @type {String}
       */
      action: "/",
      /**
       * Instancia de eventEmitter
       * @type {Object}
       */
      channel: new EventEmitter(),
      /**
       * Atributo method do form
       * @type {String}
       */
      method: "POST",
      /**
       * Flag para informar se form esta aberto
       * @type {Boolean}
       */
      isOpen: false,
      /**
       * Funcao de toggle
       * @type {Function}
       */
      toggle: function() {}
    }
  },
  
  getInitialState: function() {
	  return {
		  srcr:"CR",
		  showSplitTotal: false,
		  disableOperator: true,
		  disableRegion: true,
		  showFleet: false,
		  showConsiderRegion: false,
		  checked: {
			  includeSRCR: false,
			  considerOnlyRegion: false,
			  operator:true,
			  region:false,
			  worldwide:false
		  }
	  };
   },

	  getClassList: function() {
	    return classNames(
	      "Settings-form",
	      { "u-hidden": !this.props.isOpen }
	    );
	  },
  
  	componentDidMount: function() {
  		window.Channel.on("settings:submit", this.changeState);
  		window.Channel.on("Chart:update", this.updateState);
  		
  		window.Channel.on("Settings:toggle", this.blockToggle);
  		
  		this.changeState(Settings.getParams());
  	},
  	
  	blockToggle: function(SettingsToggle){
  		
  		var self = SettingsToggle.self;
  		var throttle = SettingsToggle.throttle;
  		
  		if(!this.url 
  			|| this.url == 'chart/period/bar'
  			|| this.url == 'chart/operator/bar'
  			|| this.url == 'chart/region/bar'){
  			
  			alert("Feature is not yet implemented.");
  			
		}else{
			throttle(function() {
		  	      this.setState({ isOpen: !this.state.isOpen });
			}, self)();
		}
  		
  	},
  	
  	resetSetting: function(){
  		$("#toggle-switch-splitTotal").attr("checked", false);
  		$("#toggle-switch-includeSRCR").attr("checked", false);
  		$("#toggle-switch-considerOnlyRegion").attr("checked", false);
  	},
  	
  	updateState: function(config){
  		
  		this.resetSetting();
  		
  		
  		this.url = config.url;
  		
  		var params = JSON.parse(Settings.getParams());
  		var showSplitTotal = params.chargeableType=="TOTAL"?true : false;
  		
  		switch(this.url){
  			case 'chart/period/line':
  				this.setState({showFleet:false, showConsiderRegion:false, showSplitTotal: false});
  				break;
  			case 'chart/period/bar':
  				this.setState({showFleet:false, showConsiderRegion:false, showSplitTotal:showSplitTotal});
  				break;
  			case 'chart/operator/line':
  				var showConsiderRegion = true;
  				if(!params.region){
  					showConsiderRegion = false;
  				}
  				this.setState({showFleet:false, showConsiderRegion:showConsiderRegion, showSplitTotal: false});
  				break;
  			case 'chart/operator/bar':
  				var showConsiderRegion = true;
  				if(!params.region){
  					showConsiderRegion = false;
  				}
  				this.setState({showFleet:false, showConsiderRegion:showConsiderRegion, showSplitTotal:showSplitTotal});
  				break;
  			case 'chart/region/line':
  				this.setState({showFleet:false, showConsiderRegion:false, showSplitTotal: false});
  				break;
  			case 'chart/region/bar':
  				this.setState({showFleet:false, showConsiderRegion:false, showSplitTotal:showSplitTotal});
  			    break;
  			default:
  				this.setState({showFleet:false, showConsiderRegion:false, showSplitTotal:showSplitTotal});
  				break;
  		}
  		
  		
  	},
  	
  	changeState: function(params){
  		this.resetSetting();
  		params = JSON.parse(params);
  			
  		var srcr = params.srcrEnum;
  		if(srcr == "CR"){
  			srcr = "SR";
  		}else{
  			srcr = "CR";
  		}
  		
  		var disableOperator = true; 
  		var disableRegion = true;
  		var checked = this.state.checked;
  		
  		if(params.srcrEnum != ""){
  			if(params.operator && params.region){
  				checked.operator = true;
  				checked.region = false;
  				checked.worldwide = false;
  			}
  			
  			if(!params.operator){
  				disableOperator = false;
  				
  				checked.operator = false;
  				checked.region = true;
  				checked.worldwide = false;
  			}

  			if(!params.region){
  		  		disableRegion = false;
  		  		
  		  		checked.operator = true;
				checked.region = false;
				checked.worldwide = false;
  			}
  			
  			if(!params.operator && !params.region){
  				disableOperator = false; 
  				disableRegion = false;
  				
  				checked.operator = false;
				checked.region = false;
				checked.worldwide = true;
  			}
  		}
  		
  		
  		var showSplitTotal = params.chargeableType=="TOTAL"?true : false;
  		this.setState({
  					srcr:srcr,
  					showSplitTotal:showSplitTotal,
  					disableOperator:disableOperator,
  					disableRegion:disableRegion,
  					checked:checked,
  					showFleet:false
  				});
  	},
	
	handleChangeIncludeSRCR: function(event){
		if(!this.url || this.url == 'chart/period/line' || this.url == 'chart/period/bar'){
			this.setState({showFleet:event.target.checked});
		}
		
	},
	
	handleSubmit: function(e) {
		e.preventDefault();
		var params = JSON.parse(Settings.getParams());
		
		var checkSrcrInclude= $('#toggle-switch-includeSRCR').is(':checked');
		if(checkSrcrInclude){
			params.srcrInclude = checkSrcrInclude;
		}
		
		var checkSplitTotal = $('#toggle-switch-splitTotal').is(':checked');
		if(checkSplitTotal){
			params.splitTotal = checkSplitTotal;
		}
		
		var checkConsiderRegion = $('#toggle-switch-considerOnlyRegion').is(':checked');
		if(checkConsiderRegion){
			params.considerRegion = checkConsiderRegion;
		}
		
		if(this.url == "chart/period/line"){
			params.fleetInfo = $("[name=fleet]:checked").data('fleetInfo');
		} else if(this.url == undefined || this.url == "chart/period/bar"){
			var fleet =  $("[name=fleet]:checked").data('fleetInfo');
			
			switch(fleet){
				case 'OPERATOR':
					delete params.region;
					break;
				case 'REGION':
					delete params.operator;
					break;
				case 'WORLDWIDE':
					delete params.region;
					delete params.operator;
					break;
			}
		}
		
		params = JSON.stringify(params);
		
		window.Channel.emit("Chart:settings", params);
		this.props.toggle();
		    
	},
	
	getSplitTotal: function(){
		if(this.state.showSplitTotal){
			return (
				<div className={"Settings-fieldset-chart-container"}>
					<label>Split Total</label>
					<input id={"toggle-switch-splitTotal"} onChange={this.handleChangeSplitTotal} className={"toggle-switch toggle-switch-round"} type={"checkbox"}/>
					<label htmlFor={"toggle-switch-splitTotal"}></label>
				</div>
			);
		}
	},
	
	getIncludeSRCR: function(){
		return (
				<div className={"Settings-fieldset-chart-container"}>
		    		<label>Include {this.state.srcr}</label>
		     		<input id={"toggle-switch-includeSRCR"} onChange={this.handleChangeIncludeSRCR} className={"toggle-switch toggle-switch-round"} type={"checkbox"} defaultChecked={this.state.checked.includeSRCR}/>
		     		<label htmlFor={"toggle-switch-includeSRCR"}></label>
		     	</div>
				);
	},
	
	getConsiderOnlyRegion: function(){
		if(this.state.showConsiderRegion){
			return (
				<div className={"Settings-fieldset-chart-container"}>
		    		<label>Consider only Region</label>
		     		<input id={"toggle-switch-considerOnlyRegion"} onChange={this.handleChangeConsiderOnlyRegion} className={"toggle-switch toggle-switch-round"} type={"checkbox"} defaultChecked={this.state.checked.considerOnlyRegion}/>
		     		<label htmlFor={"toggle-switch-considerOnlyRegion"}></label>
		     	</div>
			);
		} 
	},
	
	handleChangeCheckBox: function(event){
		var fleet = event.target.dataset.fleetInfo;
		
		var checked = this.state.checked;
		switch(fleet){
			case 'OPERATOR':
				checked.operator = true;
				checked.region = false;
				checked.worldwide = false;
				break;
			case 'REGION':
				checked.operator = false;
				checked.region = true;
				checked.worldwide = false;
				break;
			case 'WORLDWIDE':
				checked.operator = false;
				checked.region = false;
				checked.worldwide = true;
				break;
		}
		
		
		this.setState({checked:checked});
	},
	
	getFleet: function(){
		if(this.state.showFleet){
			return (		
					<fieldset className={"Settings-fieldset-chart-container-fleet"}>
			     		<div>
			     				<div className={"Settings-fieldset-chart-fleet"}>
			     					<input id={"toggle-switch-fleet-operator"} data-fleet-info={"OPERATOR"} name={"fleet"} className={"toggle-switch toggle-switch-yes-no"} onChange={this.handleChangeCheckBox} type={"radio"} checked={this.state.checked.operator} disabled={!this.state.disableOperator}/>
			     					<label htmlFor={"toggle-switch-fleet-operator"} data-on={"Operator"} data-off={"Operator"}></label>
					            </div>
						   		<div className={"Settings-fieldset-chart-fleet"}>
					            	<input id={"toggle-switch-fleet-region"} data-fleet-info={"REGION"} name={"fleet"} className={"toggle-switch toggle-switch-yes-no"}  onChange={this.handleChangeCheckBox} checked={this.state.checked.region} disabled={!this.state.disableRegion} type={"radio"}/>
					            	<label htmlFor={"toggle-switch-fleet-region"} data-on={"Region"} data-off={"Region"}></label>
					            </div>
						   		<div className={"Settings-fieldset-chart-fleet"}>
					            	<input id={"toggle-switch-fleet-worldwide"} data-fleet-info={"WORLDWIDE"} name={"fleet"} className={"toggle-switch toggle-switch-yes-no"} onChange={this.handleChangeCheckBox} checked={this.state.checked.worldwide} type={"radio"}/>
					            	<label htmlFor={"toggle-switch-fleet-worldwide"} data-on={"Worldwide"} data-off={"Worldwide"}></label>
					            </div> 
				         </div>
			     	</fieldset>
			);
		}
	},

  render: function() {
    var props = this.props;

    return (
      <form
        method={props.method}
        action={props.action}
        className={this.getClassList()}
      	onSubmit={this.handleSubmit}
        id={props.id} >
		   <fieldset className={"Settings-fieldset-chart"}>
		   		{this.getSplitTotal()}
		     	{this.getIncludeSRCR()}
		     	{this.getConsiderOnlyRegion()}
		  </fieldset> 
		  
		  {this.getFleet()}
		 
			<fieldset className={"Settings-action-fieldset u-right"}>
		        <input
		          className={"linkaction-Button u-uppercase"}
		          type={"submit"}
		          value={"Update Chart"}
		        />
		    </fieldset>
      
      </form>
    );
  }
});

module.exports = SettingsFormChart;
