/* eslint-env node */
/*
 * Componente para o corpo da caixa de visao de frota.
 */

"use strict"

var React = require("react"),
  BoxChart = require("./BoxChart"),
  formatPercent = require("./../javascripts/modules/formatPercent"),
  is = require("./../javascripts/modules/is");

/**
 * Componente para o container da caixa de visao
 */
var BoxBody = React.createClass({
  validateComponents: function(props) {
    var isNumber = is.number,
      delta = props.delta,
      highlight,
      delta,
      representativeness,
      chart;

    // TODO Refatorar condicoes
    if (isNumber(props.srcr)) {
      highlight = <BoxBody.Highlight value={props.srcr} />;
    }

    if (isNumber(props.delta)) {
      delta = <BoxBody.Delta value={props.delta} />;
    }

    if (isNumber(props.representativeness)) {
      representativeness = <BoxBody.Representativeness
        value={props.representativeness}
        limit={props.representativenessLimit}
      />;
    }

    if (is.object(props.chart)) {
      chart = <BoxChart
        target={props.target}
        id={props.id}
        tendency={props.tendency}
        series={props.chart.series}
      />;
    }

    return (
      <div className="Box-body u-center">
        {highlight}
        {delta}
        {chart}
        {representativeness}
      </div>
    );
  },

  getEmptyOutput: function() {
    return (
      <div className="Box-body is-empty u-center">
        <p className={"Box-message"}>No content to be displayed</p>
      </div>
    );
  },

  getOutput: function() {
    var output,
      props = this.props;

    if (props.empty === true) {
      output = this.getEmptyOutput();
    } else {
      output = this.validateComponents(props);
    }

    return output;
  },

  render: function() {
    return this.getOutput();
  }
});

/**
 * Componente para o valor em destaque da caixa
 */
BoxBody.Highlight = React.createClass({
  propTypes: {
    value: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      value: 0
    };
  },

  render: function() {
    return (
      <strong className="Box-highlight" title={document.location.pathname.slice(-2).toUpperCase()}>
        {formatPercent(this.props.value)}
      </strong>
    );
  }
});

/**
 * Componente para o valor de delta e tendencia da caixa
 */
BoxBody.Delta = React.createClass({
  propTypes: {
    value: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      value: 0
    };
  },

  getTendencyClass: function(value) {
    var className = "";
    value = value || this.props.value;

    if (value === 0) {
      className = "u-hidden";
    } else if (value < 0) {
      className = "tendencydown-Icon";
    } else {
      className = "tendencyup-Icon";
    }

    return className;
  },

  render: function() {
    var value = this.props.value;

    return (
      <span className="Box-delta u-bold" title="Delta">
        <span>
          <span title="Delta">{formatPercent(Math.abs(value))}</span>
        </span>
        <i
          className={this.getTendencyClass(value)}
          title={value >= 0 ? "Above Target" : "Below Target"}>
          {value}
        </i>
      </span>
    );
  }
});

/**
 * Componente para a representatividade da caixa
 */
BoxBody.Representativeness = React.createClass({
  propTypes: {
    limit: React.PropTypes.number,
    value: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      limit: 0,
      value: 0
    };
  },

  getClassList: function(props) {
    var className;

    props = props || this.props;

    if (props.value >= props.limit) {
      className = "Box-up-representativenessvalue";
    } else {
      className = "Box-down-representativenessvalue";
    }

    return className;
  },

  getRepresentativenessWidth: function(value) {
    value = value || formatPercent(this.props.value);

    if (is.percent(value) === false) {
      throw new Error(
        "BoxBody.Representativeness.getRepresentativenessWidth(): Value with wrong format"
      );
    }

    return {
      width: "#width".replace("#width", value)
    };
  },

  render: function() {
    var props = this.props,
      FRACTION_DIGITS = 0,
      valueConfig = {
        style: "percent",
        minimumFractionDigits: FRACTION_DIGITS,
        maximumFractionDigits: FRACTION_DIGITS
      },
      value = formatPercent(props.value, valueConfig);

    return (
      <div
        className="Box-representativeness"
        title={"Representativeness: #value".replace("#value", value)}>
        <div
          className={this.getClassList(props)}
          style={this.getRepresentativenessWidth(value)}>
          <div
            className="Box-representativeness-inner-label">
            {value}
          </div>
        </div>
        <div
          className="Box-representativeness-label">
          {value}
        </div>
      </div>
    );
  }
});

BoxBody.Target = React.createClass({
  propTypes: {
    value: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      value: 0
    }
  },

  render: function() {
    return (
      <div>
        <span
          className={"Box-delta u-uppercase"}>
          Target
        </span>

        <strong
          className={"Box-small-highlight"}
          title={"Target"}>
          {formatPercent(this.props.value)}
        </strong>
      </div>
    );
  }
});

BoxBody.Legend = React.createClass({
  render: function() {
    var props = this.props,
      isObject = is.object,
      above,
      below,
      nodata;

    if (isObject(props.above) === true) {
      above = <BoxBody.LegendItem
        type={"above"}
        title={"Above Target"}
        hash={props.above}
      />;
    }

    if (isObject(props.below) === true) {
      below = <BoxBody.LegendItem
        type={"below"}
        title={"Below Target"}
        hash={props.below}
      />;
    }

    if (isObject(props.nodata) === true) {
      nodata = <BoxBody.LegendItem
        type={"nodata"}
        title={"No Data"}
        hash={props.nodata}
      />;
    }

    return (
      <ul className={"Box-legend"}>
        {above}
        {below}
        {nodata}
      </ul>
    );
  }
});

BoxBody.LegendItem = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    hash: React.PropTypes.shape({
      quantity: React.PropTypes.number,
      percent: React.PropTypes.number
    }),
  },

  getDefaultProps: function() {
    return {
      type: "item",
      hash: {
        quantity: 0,
        percent: 0
      }
    }
  },

  getTextContent: function(hash) {
    var text = "#percent (#quantity)";
    text = text.replace("#percent", formatPercent(hash.percent, {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }));
    text = text.replace("#quantity", hash.quantity);
    return text;
  },

  render: function() {
    var props = this.props,
      hash = props.hash,
      type = props.type;

    return (
      <li
        className={"Box-#type-legenditem".replace("#type", type)}
        title={props.title}
        data-quantity={hash.quantity}
        data-percent={hash.percent}>
        {this.getTextContent(hash)}
      </li>
    );
  }
});

module.exports = BoxBody;
