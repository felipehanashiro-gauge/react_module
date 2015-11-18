"use strict"

var View = null;

var HomeStore = {
    init: function(view){
        View = view;
        this.init = function(){console.log('Store already started!!!')};
        return this;
    }
}

module.exports = HomeStore;