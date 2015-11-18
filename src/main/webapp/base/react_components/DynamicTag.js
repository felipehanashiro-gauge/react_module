/* eslint-env node */
/*
 * Componente para tags dinamicas, que podem ser removidas da tela
 */

"use strict"

var React = require("react"),
  DynamicTagIcon = require("./DynamicTagIcon"),
  DynamicTagRemove = require("./DynamicTagRemove"),
  EventEmitter = require("events").EventEmitter;

var DynamicTag = React.createClass({
  propTypes: {
    channel: React.PropTypes.instanceOf(EventEmitter).isRequired,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    value: React.PropTypes.any
  },

  getDefaultProps: function() {
    return {
      name: "dynamicTag",
      title: "Dynamic Tag",
      value: "dynamic"
    };
  },

  remove: function() {
    var props = this.props;
      window.Channel.emit("tag:remove", {
      tagName: props.name,
      tagValue: props.value
    });
  },

  render: function() {
    var props = this.props,
      id = "tag-" + props.title;

    return (
      <li
        className={"dynamic-Tag"}
        title={props.title}
        id={id.replace(" ", "").toLowerCase()}>
        <span className={"Tag-hole"}></span>
        <DynamicTagIcon name={props.name} />
        <span className={"Tag-value"}>{props.title}</span>
        <DynamicTagRemove remove={this.remove} />
      </li>
    );
  }
});

module.exports = DynamicTag;
