/* eslint-env node */
/*
 * Componente do cabecalho da caixa de visao de frota.
 */

"use strict"

var React = require("react"),
  stringMatcher = require("../javascripts/modules/stringMatcher"),
  is = require("../javascripts/modules/is"),
  classNames = require("classnames");

var BoxHeader = React.createClass({
  getDefaultProps: function() {
    return {
      /**
       * Id do Header, pode ser operator, region e worldwide
       * @type {String}
       */
      id: "boxheader",
      /**
       * Nome do header, pode ser Operators, Regions e Worldwide
       * @type {String}
       */
      name: "Box header"
    };
  },

  /**
   * Retorna a lista de classes dinamicas do componente
   */
  getClassList: function(id, hasMultiline) {
    return classNames(
      {
        "Box-header": !hasMultiline,
        "Box-multiline-header": hasMultiline
      },
      "Box-#id-header".replace("#id", id || this.props.id)
    );
  },

  hasOperatorsCount: function(id, totalGeral) {
    return stringMatcher("operator")(id) === false && totalGeral > 0;
  },

  render: function() {
    var props = this.props,
      count,
      operatorsCount,
      hasMultiline;

    hasMultiline = this.hasOperatorsCount(props.id, props.totalGeral);

    if (is.number(props.selected) === true) {
      count = <BoxHeader.Count
        selected={props.selected}
        total={props.total}
      />;
    }

    if (hasMultiline === true) {
      operatorsCount = <BoxHeader.OperatorsCount
        total={props.totalGeral}
      />;
    }

    return (
      <header className={this.getClassList(props.id, hasMultiline)}
        id={"box-header-#id".replace("#id", props.id)}>
        <span className="Box-headerwrapper Grid">
          <span>
            <h2 className="Box-name">{props.name}</h2>
            {count}
          </span>
          {operatorsCount}
        </span>
      </header>
    );
  }
});

/**
 * Contador de itens do header da caixa de visao
 */
BoxHeader.Count = React.createClass({
  propTypes: {
    selected: React.PropTypes.number,
    total: React.PropTypes.number
  },

  render: function() {
    var props = this.props;

    return (
      <span className="Box-count u-bold">
        {props.selected} of {props.total}
      </span>
    );
  }
});

/**
 * Contador de operadores da Caixa de visao. Caixa de operator nao exibe esse
 * total.
 */
BoxHeader.OperatorsCount = React.createClass({
  render: function() {
    var total = this.props.total,
      text = total > 1 ? "operators" : "operator",
      output = "#total #text";

    return (
      <small className={"Box-operators-count"}>
        {output.replace("#total", total).replace("#text", text)}
      </small>
    );
  }
});

module.exports = BoxHeader;
