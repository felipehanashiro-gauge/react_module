"use strict"

var React = require("react"),
SummaryBoxMixin = require("./mixins/SummaryBox");

var SummaryBox = React.createClass({

  render: function() {
   return (
     <article className="summary-box" >
        <div className="box-identification" >
            <p className="box-name" >{this.props.name}</p>
        </div>
        <section className="summary-data" >
          <header className="header-data" >
            <SummaryBox.DailyUtilization  route={"daily-utilization"} url={this.props.type+"-box/daily-utilization"} type={this.props.type} />
            <SummaryBox.FleetComposition  route={"fleet-composition"} url={this.props.type+"-box/fleet-composition"} type={this.props.type} />
            <SummaryBox.DispatchReliability  url={this.props.type+"-box/dispatch-reliability"} type={this.props.type} />
          </header>
          <footer className="footer-data" >
            <SummaryBox.ComponentReliabilityMTBUR url={this.props.type+"-box/component-reliability-mtbur"} type={this.props.type} />
            <SummaryBox.SuccessRateMTX  url={this.props.type+"-box/mtx-success-rate"} type={this.props.type} />
          </footer>
        </section>
     </article>
   );
 }
});

SummaryBox.DailyUtilization = React.createClass({
    mixins: [SummaryBoxMixin],
    getOutput: function(ContentOutput) {
        var route = this.props.route ? '#'+this.props.route : '';
        var noClickClass = route ? "" : "no-click";
        return(
            <div ref={this._reactInternalInstance.getName()} className={"header-item " + noClickClass} data-date={this.state.date} >
                <a href={route} className="data-link" >
                    {ContentOutput}
                    <footer className="item-name" >DAILY UTILIZATION</footer>
                </a>
            </div>
        )
    },
    getContentOutput: function(){
        return(
            <div>
                <div className="rate" >{(this.state.utilization|| 0).toFixed(2)}</div>
                <span className="rate-description" >{this.state.utilizationDesc}</span>
            </div>
        );
    }
});

SummaryBox.FleetComposition = React.createClass({
    mixins: [SummaryBoxMixin],
    getOutput: function(ContentOutput) {
        var route = this.props.route ? '#'+this.props.route : '';
        var noClickClass = route ? "" : "no-click";
        return(
            <div ref={this._reactInternalInstance.getName()} className={"header-item " + noClickClass} data-date={this.state.date} >
                <a href={route} className="data-link" >
                    {ContentOutput}
                    <footer className="item-name" >FLEET COMPOSITION</footer>
                </a>
            </div>
        )
    },
    getContentOutput: function(){
        return(
            <div>
                <div className="rate">{this.state.acftInService}</div>
                <span className="rate-description">IN SERVICE OF {this.state.acftTotalFleet}</span>
            </div>
        );
    }
});

SummaryBox.DispatchReliability = React.createClass({
    mixins: [SummaryBoxMixin],
    getOutput: function(ContentOutput) {
        var route = this.props.route ? '#'+this.props.route : '';
        var noClickClass = route ? "" : "no-click";
        return(
            <div ref={this._reactInternalInstance.getName()} className={"header-item " + noClickClass} data-date={this.state.date} >
                <a href={route} className="data-link" >
                    {ContentOutput}
                    <footer className="item-name" >DISPATCH RELIABILITY</footer>
                </a>
            </div>
        )
    },
    getContentOutput: function(){
        return(
            <div>
                <div className="rate">{(this.state.srcrValue || 0).toFixed(2)}</div>
                <span className="rate-description">{this.state.type}</span>
            </div>
        );
    }
});

SummaryBox.ComponentReliabilityMTBUR = React.createClass({
    mixins: [SummaryBoxMixin],
    getOutput: function(ContentOutput) {
        var route = this.props.route ? '#'+this.props.route : '';
        var noClickClass = route ? "" : "no-click";
        return(
            <div ref={this._reactInternalInstance.getName()} className={"footer-item " + noClickClass} data-date={this.state.date}  >
                <a href={route} className="data-link" >
                    {ContentOutput}
                    <footer className="item-name" >COMPONENT RELIABILITY - MTBUR</footer>
                </a>
            </div>
        )
    },
    getContentOutput: function(){
        return(
            <div>
                <div className="rate" data-rate="HIGHEST" data-rate-sign="+">{this.state.highMtbur}%</div>
                <div className="rate-description">{this.state.highMtburDesc}</div>
                <div className="rate" data-rate="LOWEST" data-rate-sign="-">{this.state.lowMtbur}%</div>
                <div className="rate-description">{this.state.lowMtburDesc}</div>
            </div>
        );
    }
});

SummaryBox.SuccessRateMTX = React.createClass({
    mixins: [SummaryBoxMixin],
    getOutput: function(ContentOutput) {
        var route = this.props.route ? '#'+this.props.route : '';
        var noClickClass = route ? "" : "no-click";
        return(
            <div ref={this._reactInternalInstance.getName()} className={"footer-item " + noClickClass} data-date={this.state.date}  >
                <a href={route} className="data-link" >
                    {ContentOutput}
                    <footer className="item-name" >MXS SUCCESS RATE</footer>
                </a>
            </div>
        )
    },
    getContentOutput: function(){
        return(
            <div>
                <div className="rate" data-rate="HIGHEST" data-rate-sign="+">{this.state.highSuccessRate}%</div>
                <div className="rate-description" >{this.state.highTaskNumber}</div>
                <div className="rate" data-rate="LOWEST" data-rate-sign="-">{this.state.lowSuccessRate}%</div>
                <div className="rate-description" >{this.state.lowTaskNumber}</div>
            </div>
        );
    }
});

module.exports = SummaryBox;
