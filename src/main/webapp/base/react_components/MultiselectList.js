/* eslint-env node */
/*
 * Componente para lista de opcoes de um Multiselect
 */

"use strict"

var React = require("react"),
  MultiselectListOption = require("./MultiselectListOption");

var ReactPropTypes = React.PropTypes;

var MultiselectList = React.createClass({
  propTypes: {
    /**
     * Funcao para selecionar uma opcao do select
     * @type {Function}
     */
    selectOption: ReactPropTypes.func.isRequired
  },

  render: function() {
    return (
      <ol className={"Multiselect-list"}>
        { this.props.list.map(function(option, index) {
          return <MultiselectListOption
            key={option.name}
            {...option}
            fieldName={this.props.name}
            index={index}
            selectOption={this.props.selectOption}
          />;
        }, this) }
      </ol>
    );
  }
});

module.exports = MultiselectList;
