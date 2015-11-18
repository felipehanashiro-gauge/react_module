/* eslint-env node */
/*
 * Componente para Multiselect
 */

"use strict"

var React = require("react"),
  LiveSearch = require("./LiveSearch"),
  MultiselectList = require("./MultiselectList"),
  throttle = require("../javascripts/modules/throttle"),
  stringMatcher = require("../javascripts/modules/stringMatcher"),
  is = require("../javascripts/modules/is"),
  Settings = require("./Settings"),
  EventEmitter = require("events").EventEmitter;

var ReactPropTypes = React.PropTypes,
  Multiselect;

Multiselect = React.createClass({
  propTypes: {
    /**
     * Nome do campo
     * @type {String}
     */
    name: ReactPropTypes.string.isRequired,
    /**
     * Lista de opcoes inicial
     * @type {String}
     */
    initialOptions: ReactPropTypes.array.isRequired,
    /**
     * Instancia de EventEmitter
     * @type {Object}
     */
    channel: React.PropTypes.instanceOf(EventEmitter).isRequired
  },

  getInitialState: function() {
    return {
      /**
       * Deve-se salvar como estado por causa do LiveSearch
       * @type {String}
       */
      options: this.props.initialOptions
    }
  },

  /**
   * http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
   */
  componentWillMount: function() {
    this.search = throttle(this.searchConfig(this.state.options), this);
  },

  componentDidMount: function() {
    var channel = window.Channel;

    channel.on("tag:remove", function(tag) {
      var option;

      if (stringMatcher(this.props.name)(tag.tagName)) {
        option = this.getOption({
          value: tag.tagValue
        });

        this.selectOption(option.index, false, function() {
          channel.emit("settings:submit", Settings.getParams());
        });
      }
    }.bind(this));

    channel.on("settings:changeTab", function(tabName) {
      // FIXME cheat
      if (stringMatcher(tabName)(this.props.name)) {
        this.getDOMNode().classList.remove("u-hidden", "u-invisible");
      } else {
        this.getDOMNode().classList.add("u-hidden", "u-invisible");
      }
    }.bind(this));

    // FIXME cheat
    $("#multiselect-operator").addClass("u-hidden");
  },

  /**
   * Atualiza lista de opcoes quando receber novas propriedades
   * Quando as opcoes atualizarem, atualizar o metodo de search
   * http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
   */
  componentWillReceiveProps: function(nextProps) {
    var initialOptions = nextProps.initialOptions;
    this.search = throttle(this.searchConfig(initialOptions), this);
    this.setState({ options: initialOptions });
  },

  getOption: function(filter) {
    var result;

    Object.keys(filter).forEach(function(key) {
      this.state.options.every(function(option, index) {
        if (option[key] === filter[key]) {
          result = option;
          result.index = index;
          return false;
        }

        return true;
      });
    }, this);

    return result;
  },

  /**
   * Faz a busca pelo termo escrito no LiveSearch
   * @param  {Array} options Closure para salvar a lista de opcoes
   * @return {Function} Busca opcoes
   */
  searchConfig: function(options) {
    return function(value) {
      var results = options,
        matcher;

      if (value !== "") {
        matcher = stringMatcher(value);
        results = options.filter(function(option) {
          return matcher(option.name) === true;
        });
      }

      this.setState({ options: results });
    };
  },

  /**
   * FIXME Mudar com Flux
   */
  selectOption: function(index, isSelected, callback) {
    var options = this.state.options;
    options[index].isSelected = isSelected;
    this.setState({ options: options }, function() {
      if (is.functionType(callback)) {
        callback();
      }
    });
  },

  render: function() {
    return (
      <div className={"Multiselect"} id={"multiselect-" + this.props.name}>
        <LiveSearch
          ref={"livesearch"}
          search={this.search}
        />
        <MultiselectList
          ref={"multiselectlist"}
          list={this.state.options}
          selectOption={this.selectOption}
          name={this.props.name}
        />
      </div>
    );
  }
});

module.exports = Multiselect;
