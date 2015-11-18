/* eslint-env node */
/*
 * Componente para opcao de um Multiselect
 */

"use strict"

var React = require("react");

var MultiselectListOption = React.createClass({
  onChange: function(e) {
    this.props.selectOption(this.props.index, e.target.checked);
  },

  formatId: function(props) {
    return "#fieldName-#value".replace("#fieldName", props.fieldName).replace("#value", props.value);
  },

  render: function() {
    var props = this.props,
      id = this.formatId(props);

    return (
      <li className={"Multiselect-option"}>
        <input
          className={"Checkbox"}
          type="checkbox"
          name={props.fieldName}
          id={id}
          ref={"option"}
          checked={props.isSelected}
          defaultValue={props.value}
          onChange={this.onChange}
        />
        <label
          className={"checkbox-Label"}
          htmlFor={id}>
          {props.name}
        </label>
      </li>
    );
  }
});


module.exports = MultiselectListOption;
