/* eslint-env node */
/*
 * Componente para fieldset de acoes do formulario
 */

"use strict"

var React = require("react");

var SettingsFieldsetAction = React.createClass({
	
	getDefaultProps: function() {
		return {
			value: "Update dashboard"
		};
	},
	
  render: function() {
    return (
      <fieldset className={"Settings-action-fieldset u-right"}>
        <input
          className={"linkaction-Button u-uppercase"}
          type={"submit"}
          value={this.props.value}
        />
      </fieldset>
    );
  }
});

module.exports = SettingsFieldsetAction;
