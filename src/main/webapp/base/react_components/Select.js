/* eslint-env node */
/*
 * Componente para Select com React
 *
 * TODO Adicionar WAI-ARIA
 */

"use strict"

var React = require("react"),
  is = require("../javascripts/modules/is"),
  stringMatcher = require("../javascripts/modules/stringMatcher"),
  classNames = require("classnames"),
  Dropdown = require("./mixins/Dropdown"),
  Settings = require("./Settings");

var SelectComponent = React.createClass({
  mixins: [Dropdown],

  getInitialState: function() {
    return {
      /**
       * Flag para determinar se select esta aberto ou fechado
       * @type {Boolean}
       */
      isOpen: false,
      /**
       * Texto da opcao selecionada
       * @type {String}
       */
      textContent: "Select",
      /**
       * Valor da opcao selecionada
       * @type {String}
       */
      value: ""
    }
  },

  /**
   * Atualiza os estados da opcao selecionada
   * @param  {Object} option Opcao selecionada
   */
  update: function(option) {
    if (is.object(option) === true) {
      this.setState({
        textContent: option.name,
        value: option.value
      });
    }
  },

  /**
   * Atualiza valores do select
   * @param  {Object} target Opcao selecionada
   */
  change: function(target, callback) {
    this.setState({
      textContent: target.textContent,
      value: target.dataset.value
    }, function() {
      if (is.functionType(callback)) {
        callback();
      }
    });
  },

  render: function() {
    var props = this.props,
      state = this.state,
      toggle = this.toggle;

    return (
      <div className={"Select"}>
        <SelectComponent.Wrapper
          label={props.label}
          name={props.name}
          textContent={state.textContent}
          value={state.value}
          toggle={toggle}
        />

        <SelectComponent.List
          options={props.options}
          fieldName={props.name}
          isOpen={state.isOpen}
          toggle={toggle}
          change={this.change}
          update={this.update}
        />
      </div>
    );
  }
});

SelectComponent.Wrapper = React.createClass({
  getDefaultProps: function() {
    return {
      /**
       * Label do Select
       * @type {String}
       */
      label: "Select",
      /**
       * Nome do input
       * @type {String}
       */
      name: "select",
      /**
       * Texto da opcao selecionada
       * @type {String}
       */
      textContent: "Select",
      /**
       * Valor do input selecionado
       * @type {String}
       */
      value: ""
    };
  },

  render: function() {
    var props = this.props;

    return (
      <div
        onClick={props.toggle}
        className={"Select-wrapper"}>

        <strong className={"Select-label"}>
          {props.label}
        </strong>

        <span
          className={"Select-value"}
          ref={"selected"}>
          {props.textContent}
        </span>

        <input
          type="hidden"
          name={props.name}
          value={props.value}
        />
      </div>
    );
  }
});

SelectComponent.List = React.createClass({
  getDefaultProps: function() {
    return {
      /**
       * Lista de opcoes do Select
       * @type {Array}
       */
      options: [],
      /**
       * Flag para determinar se lista esta visivel
       * @type {Boolean}
       */
      isOpen: false,
      /**
       * Funcao para atualizar os valores setados no select
       * @type {Function}
       */
      update: function() {}
    };
  },

  componentDidUpdate: function(prevProps) {
    // So atualiza se opcoes serem diferentes
    if (prevProps.options !== this.props.options) {
      this.props.update(this.getSelectedOption());
    }
  },

  /**
   * Busca a opcao selecionada no array de options
   */
  getSelectedOption: function() {
    return this.props.options.filter(function(option) {
      return option.isSelected === true;
    }).pop();
  },

  getClassList: function() {
    return classNames(
      "Select-options",
      { "u-hidden": !this.props.isOpen }
    );
  },

  render: function() {
    var props = this.props,
      toggle = props.toggle,
      change = props.change;

    return (
      <ul ref={"list"} className={this.getClassList()}>
        { props.options.map(function(option, index) {
          return <SelectComponent.ListItem
                    key={index}
                    toggle={toggle}
                    change={change}
                    fieldName={props.fieldName}
                    {...option}
                  />;
        }) }
      </ul>
    );
  }
});

SelectComponent.ListItem = React.createClass({
  // FIXME Fim do Sprint
  getInitialState: function() {
    return {
      isSelected: false
    };
  },

  componentDidMount: function() {
    var props = this.props;

    this.setState({
      isSelected: this.props.isSelected
    });

    // FIXME REMOCAO DE TAG ERRADA
      window.Channel.on("tag:remove", function(tag) {
      if (this.state.isSelected === true && stringMatcher(tag.tagName)(props.fieldName)) {
        if (stringMatcher(tag.tagValue)(props.value)) {
          this.toggleIsSelected(function() {
              window.Channel.emit("settings:submit", Settings.getParams());
          });
        }
      }
    }.bind(this));
    
    // Atualizar periodo ao trocar settings
      window.Channel.on("settings:change", function(filter) {
      if (stringMatcher(this.props.fieldName)(filter.name)) {
        if (stringMatcher(this.props.value)(filter.value))
        this.props.change({
          textContent: this.props.name,
          dataset: {
            value: this.props.value
          }
        }, function() {
            window.Channel.emit("settings:submit", Settings.getParams());
        });
      }
    }.bind(this));
  },
  

  toggleIsSelected: function(callback) {
    this.setState({ isSelected: !this.state.isSelected }, function() {
      if (is.functionType(callback)) {
        callback();
      }
    });
  },

  renderOptionSelect: function(props) {
    return (
      <li
        onClick={this.handleClick}
        className={"Select-option"}
        data-value={props.value}>
        {props.name}
      </li>
    );
  },

  handleClick: function(e) {
    var props = this.props;
    props.toggle();
    props.change(e.currentTarget);
  },

  render: function() {
    return this.renderOptionSelect(this.props);
  }
});

module.exports = SelectComponent;
