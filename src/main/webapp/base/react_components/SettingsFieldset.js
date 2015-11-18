/* eslint-env node */
/*
 * Componente para grupo de campos do form de Settings
 */

"use strict"

var React = require("react"),
  stringMatcher = require("../javascripts/modules/stringMatcher");

var SettingsFieldset = React.createClass({
  render: function() {
    var props = this.props;

    var children = React.Children.map(props.children, function(child) {
      var component;

      switch (child.props.componentName) {
        case "SelectComponent":
          component = React.cloneElement(child, {
            options: props.formControls[child.props.name]
          });
          break;

        case "DatePicker":
          component = React.cloneElement(child, {
            minDate: props.formControls[child.props.name]
          });
          break;

        case "Multiselect":
          component = React.cloneElement(child, {
            initialOptions: props.formControls[child.props.name] || []
          });
          break;

        default:
          component = React.cloneElement(child, {
            parentHandler: props.parentHandler
          });
      }

      return component;
    });

    return (
      <fieldset className={"Settings-fieldset"}>
      {children}
      </fieldset>
    );
  }
});

module.exports = SettingsFieldset;
