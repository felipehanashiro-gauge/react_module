/* eslint-env node */

/**
 * Mixin para componente Dropdown
 */

var React = require("react"),
    ReactDOM = require('react-dom'),
  throttle = require("../../javascripts/modules/throttle"),
  eventListener = require("../../javascripts/modules/eventListener"),
  traverse = require("../../javascripts/modules/traverse");

var Dropdown = {
  componentDidMount: function() {
    var addListener = eventListener.add,
      handler = this.handler;

    addListener(document, "keyup", handler);
    addListener(document, "click", handler);
  },

  componentWillUnmount: function() {
    var remove = eventListener.remove,
      handler = this.handler;

    remove(document, "keyup", handler);
    remove(document, "click", handler);
  },

  handler: function(e) {
    e.stopPropagation();

    if (this.state.isOpen === true) {
      this[e.type](e);
    }
  },

  keyup: function(e) {
    if (e.keyCode === 27) {
      this.toggle();
    }
  },

  click: function(e) {
    var node = ReactDOM.findDOMNode(this.refs.form);

    traverse(function(element) {
      if (node === element) {
        return true;
      }

      if (element === null) {
        this.toggle();
        return true;
      }

      return false;
    }.bind(this))(e.target);
  },

  toggle: function() {
	/*if(this.props.id == "basicformChart"){
	  this.props.channel.emit("Settings:toggle", {self: this, throttle: throttle});
	}else{*/
	    throttle(function() {
	      this.setState({ isOpen: !this.state.isOpen });
	    }, this)();
	//}
  }
};

module.exports = Dropdown;
