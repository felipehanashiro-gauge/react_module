var React = require("react"),
    Api = require("./../javascripts/modules/api");


var GoHorseRender = React.createClass({
    contentHeight: 0,
    style: {
        'border': '0',
        'overflow':'hidden',
        'width': '100%'
    },
    getInitialState: function(){
        return{
            resizable: false,
            resizeTimes: 30
        }
    },
    setDefaultProps: function(){
        return{
            toRemove: [],
            height: 750,
            url: ""
        }
    },
    componentWillMount: function(){
        this.setState({
            resizable: (this.props.resizable || false),
            resizeTimes: (this.props.resizeTimes || 30)
        });
    },
    startView: function(){
        $('.goHorseIframe').contents().find('body > .glowing').addClass('goHorseViewContainer').removeClass('glowing');
        $('.goHorseIframe').contents().find('.homepage').css({'padding-top':'10px'});
        $('.goHorseIframe').contents().find('#container').css({'padding-bottom':'10px'});
        this.hideElements();
    },
    hideElements: function(){
        var contentHeight = $('.goHorseIframe').contents().find('.goHorseViewContainer').height();
        if(this.contentHeight !== contentHeight){
            this.contentHeight = contentHeight;
            var elements = this.props.toRemove.join(',');
            $('.goHorseIframe').contents().find(elements).hide();
            $('.goHorseIframe').css({'height': contentHeight+'px'});
        }
        if(this.state.resizable || this.state.resizeTimes--) {
            setTimeout(this.hideElements, 1000);
        }
    },
    render: function(){
        var props = this.props;
        return(
            <div>
                <iframe src={props.url} height={props.height} scrolling="no" seamless="seamless" className="goHorseIframe" onLoad={this.startView} style={this.style} ></iframe>
            </div>
        );
    }
});


module.exports = GoHorseRender;