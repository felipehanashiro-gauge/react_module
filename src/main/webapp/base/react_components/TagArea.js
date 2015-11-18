/* eslint-env node */
/*
 * Componente para area de tags
 */

"use strict"

var React = require("react"),
    ReactDOM = require('react-dom'),
    TagList = require("./TagList"),
    TagExpander = require("./TagExpander"),
    Fetch = require("./mixins/Fetch"),
    throttle = require("../javascripts/modules/throttle"),
    is = require("../javascripts/modules/is"),
    EventEmitter = require("events").EventEmitter;

var TagArea = React.createClass({
  mixins: [Fetch],
  
  statics: {
	  filter:{},
	setFilter:function(_filter){
		this.filter =_filter;
	},
	getFilter: function(){
		return this.filter;
	}
  },

  propTypes: {
    url: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      /**
       * URL para buscar as tags
       * @type {String}
       */
      url: "api/tag"
    };
  },

  getInitialState: function() {
    return {
      /**
       * Lista de tags estaticas, que nao podem ser removidas da tela
       * @type {Array}
       */
      staticTagList: [],
      /**
       * Lista de tags dinamicas, que podem ser removidas
       * @type {Array}
       */
      dynamicTagList: []
    };
  },

  componentDidMount: function() {
    var props = this.props;

    /*this.fetch({
      url: props.url,
      success: this.updateState
    });*/

      console.warn("MOCK - tagarea filter")
      this.updateState({"requiredFilters":[{"name":"dashboard","value":"SR","title":"SR"},{"name":"chargeableType","value":"CHARGEABLE","title":"CHARGEABLE"},{"name":"family","value":"EJETS","title":"E-JETS FAMILY"},{"name":"period","value":64,"title":"L12M"},{"name":"referenceDate","value":1435719600000,"title":"2015-07"}],"optionalFilters":null});

      window.Channel.on("settings:submit", this.listener);
  },

  componentWillUnmount: function() {
      window.Channel.removeListener("settings:submit", this.listener);
  },

  componentDidUpdate: function() {
    this.toggleExpander();
  },

  /**
   * FIXME Refatorar
   */
  toggleExpander: function() {
    var refs = this.refs,
      expander = ReactDOM.findDOMNode(refs.expander),
      lastTag = ReactDOM.findDOMNode(refs.list).querySelector("li:last-child"),
      tagArea = ReactDOM.findDOMNode(this),
      HEIGHT_TAGAREA = 40;

    if (lastTag && expander.classList) {
      if (lastTag.getBoundingClientRect().bottom > (tagArea.getBoundingClientRect().top + HEIGHT_TAGAREA)) {
        expander.classList.remove("u-hidden");
      } else {
        expander.classList.add("u-hidden");
      }
    }
  },

  listener: function(data) {
    this.fetch({
      url: this.props.url,
      params: data,
      success: this.updateState
    });

  },

  updateState: function(data) {
	  TagArea.setFilter(data);
    var requiredFilters,
      optionalFilters;

    if (is.object(data) !== true) {
      throw new TypeError(
        "TagArea.updateState(): param 'data' is not an Object."
      );
    }

    requiredFilters = data.requiredFilters || [];
    optionalFilters = data.optionalFilters || [];

    this.setState({
      staticTagList: requiredFilters,
      dynamicTagList: optionalFilters
    });
  },

  countTags: function(firstList, secondList) {
    var isArray = is.array;

    if (isArray(firstList) === false) {
      throw new TypeError(
        "TagArea.countTags(): param 'firstList' is not an Array."
      );
    }

    if (isArray(secondList) === false) {
      throw new TypeError(
        "TagArea.countTags(): param 'secondList' is not an Array."
      );
    }

    return firstList.concat(secondList).length;
  },

  handleMouseOver: function() {
    throttle(function() {
      ReactDOM.findDOMNode(this.refs.list).classList.add("is-visible");
    }, this)();
  },

  handleMouseLeave: function() {
    var classList = ReactDOM.findDOMNode(this.refs.list).classList;

    if (classList.contains("is-visible")) {
      throttle(function() {
        classList.remove("is-visible");
      }, this)();
    }
  },

  render: function() {
    var props = this.props,
      state = this.state,
      staticTagList = state.staticTagList,
      dynamicTagList = state.dynamicTagList;

    return (
      <section
        className={"Tag-area"}
        onMouseLeave={this.handleMouseLeave}>
        <TagList
          staticTagList={state.staticTagList}
          dynamicTagList={state.dynamicTagList}
          ref={"list"}
        />
        <TagExpander
          count={this.countTags(staticTagList, dynamicTagList)}
          handleMouseOver={this.handleMouseOver}
          ref={"expander"}
        />
        {props.children}
      </section>
    );
  }
});

module.exports = TagArea;
