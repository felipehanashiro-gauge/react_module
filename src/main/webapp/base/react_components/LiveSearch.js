/* eslint-env node */
/*
 * Componente para input de pesquisa com livesearch
 */

"use strict"

var React = require("react");
var ReactPropTypes = React.PropTypes;

var LiveSearch = React.createClass({
    propTypes: {
      /**
       * Funcao para fazer a busca. Deve ser enviada como prop para que o
       * componente seja desacoplado
       * @type {Function}
       */
      search: ReactPropTypes.func.isRequired
    },
    operatorDefaultName:null,
    getInitialState: function() {
        return {
            input:this.props.input
        }
    },

    /**
     * Trata evento de input
     * @param  {Event} e
     */
    onChange: function(e) {
      this.props.search(e.target.value);
    },
    onFocus: function(e){
        this.props.open(true);
        this.operatorDefaultName = e.target.value;
        this.props.search("");
    },
    onBlur: function(e){
      this.props.open(false);
      if(e.target.value == "" || !e.target.value){
          this.props.changeInputLiveSearch(this.operatorDefaultName);
      }

    },
    render: function() {
      return (
        <label htmlFor="livesearch">
          <input className={"Livesearch"}
                value={this.props.input}
                type={"search"}
                placeholder={"Select Operator/Supplier"}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                disabled={this.props.disabled}/>
        </label>
      );
    }
});

module.exports = LiveSearch;
