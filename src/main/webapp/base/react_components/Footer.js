"use strict"

var React = require("react");

var Footer = React.createClass({
    render: function(){
        return(
            <footer className="emb-footer" >
                <div className="emb-footer-brand" >
                    <span className="emb-slogan" >FOR THE JOURNEY</span>
                    <img className="emb-logo" src="../base/images/Embraer_logo_white.svg" />
                </div>
                <span className="emb-copy" >
                    COPYRIGHT 2015 EMBRAER SA.
                </span>
            </footer>
        );
    }
});

module.exports = Footer;