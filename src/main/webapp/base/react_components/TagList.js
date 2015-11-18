/* eslint-env node */
/*
 * Componente para lista de tags
 */

"use strict"

var React = require("react"),
  StaticTag = require("./StaticTag"),
  DynamicTag = require("./DynamicTag");

var TagList = React.createClass({
  propTypes: {
    staticTagList: React.PropTypes.array,
    dynamicTagList: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      /**
       * Lista de tags estaticas
       * @type {Array}
       */
      staticTagList: [],
      /**
       * Lista de tags dinamicas
       * @type {Array}
       */
      dynamicTagList: []
    };
  },

  getTags: function(TagComponent) {
    return function(list, props) {
      list = list || [];
      return list.map(function(item, index) {
        return <TagComponent
          key={index}
          {...item}
        />;
      });
    };
  },

  render: function() {
    var props = this.props,
      getTags = this.getTags;

    return (
      <ol className={"Tag-list"}>
        {getTags(StaticTag)(props.staticTagList, props)}
        {getTags(DynamicTag)(props.dynamicTagList, props)}
      </ol>
    );
  }
});

module.exports = TagList;
