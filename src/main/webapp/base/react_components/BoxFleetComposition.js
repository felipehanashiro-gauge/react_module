/* eslint-env node */
/*
 * Componente para a caixa de Fleet Composition
 */

"use strict"

var React = require("react"),
  formatPercent = require("./../javascripts/modules/formatPercent"),
  is = require("./../javascripts/modules/is"),
  classNames = require("classnames"),
  TabList = require("./TabList"),
  Settings = require("./Settings"),
  BoxHeader = require("./BoxHeader"),
  BoxBody = require("./BoxBody"),
  GaugeChart = require("./GaugeChart"),
  BoxMixin = require("./mixins/Box");

var BoxFleetComposition = React.createClass({
  mixins: [BoxMixin],

  changeTab: function(href) {
    this.addLoading();
    this.fetch({
      url: href,
      params: Settings.getParams()
    });
  },

  getClassList: function(data) {
    var isEmpty,
      hasTabs;

    isEmpty = data.empty;
    hasTabs = is.array(data.tabsList) && data.tabsList.length > 0;

    return classNames(
      "Box-large-body", {
        "has-tabs": hasTabs,
        "is-empty": isEmpty,
        "u-center": isEmpty
      }
    );
  },

  getOutput: function(data) {
    var output;

    if (data.empty === true) {
      output = (
        <p className={"Box-message"}>No content to be displayed</p>
      );
    } else {
      output = (
        <section className={"Box-large-wrapper l-space-between l-align-center"}>
          <BoxBody.Target value={data.target} />
          <GaugeChart data={data.operatorsMap} title={"Oper"} />
          <BoxBody.Legend {...data.operatorsMap} />
          <GaugeChart data={data.aircraftMap} title={"Fleet"} />
          <BoxBody.Legend {...data.aircraftMap} />
        </section>
      );
    }

    return output;
  },

  render: function() {
    var props = this.props,
      state = this.state,
      data = state.data;

    return (
      <article
        role={"article"}
        className={"large-Box"}
        id={"box-#id".replace("#id", props.id)}>

        <BoxHeader
          id={props.id}
          name={props.name}
          totalGeral={data.countTotalGeral}
        />

        <div ref={"boxBody"} className={this.getClassList(data)}>
          <TabList
            list={data.tabsList}
            parentHandler={this.changeTab}
          />
          {this.getOutput(data)}
        </div>

        {props.children}
      </article>
    );
  }
});

module.exports = BoxFleetComposition;
