/* eslint-env node */
/*
 * Item do Breadcrumb
 */

"use strict"

var React = require("react"),
    classNames = require("classnames"),
    ReactRouter = require("react-router"),
    Link = ReactRouter.Link;

var BreadcrumbItem = React.createClass({
  getDefaultProps: function() {
    return {
      id: "item",
      isActive: false,
      name: "Breadcrumb-item"
    }
  },

  getClassList: function(props) {
    props = props || this.props;

    return classNames(
      "Breadcrumb-item",
      "Breadcrumb-" + props.id + "-item",
      { "is-active": props.isActive }
    );
  },

  getSpanOutput: function(props) {
    props = props || this.props;

    return (
      <span
        className={this.getClassList(props)}
        id={props.id}
        aria-checked={props.isActive}>
        {props.name}
      </span>
    );
  },

  getLinkOutput: function(props) {
    props = props || this.props;
    return (
            <Link to={props.href}
                className={this.getClassList(props)}
                id={props.id}
                title={props.name}
                aria-checked={props.isActive}>{props.name}</Link>
    );
  },

  /**
   * BreadcrumbItem ativo deve ser elemento Span e nao Link porque nao deve
   * redirecionar a nenhum lugar.
   */
  getOutput: function(props) {
    var output;
    props = props || this.props;

    if (props.isActive) {
      output = this.getSpanOutput(props);
    } else {
      output = this.getLinkOutput(props);
    }

    return output;
  },

  render: function() {
    return this.getOutput();
  }
});

module.exports = BreadcrumbItem;
