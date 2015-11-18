/* Componente para Benchmark */

"use strict";

var React = require("react"),
  TabList = require("./TabList"),
  Chart = require("./Chart"),
  Settings = require("./Settings"),
  SettingsFormChart = require("./SettingsFormChart"),
  SettingsFieldsetAction = require("./SettingsFieldsetAction"),
  BaseComponentWithTabs = require("./mixins/BaseComponentWithTabs");

var Benchmark;

Benchmark = React.createClass({
  mixins: [BaseComponentWithTabs],

  changeTypeHandler: function(type) {
    this.changeType(type, {
      id: "benchmark"
    });
  },

  changeViewHandler: function(view) {
    this.changeView(view, {
      id: "benchmark"
    });
  },

  render: function() {
    var props = this.props,
      channel = window.Channel;

    return (
      <section
        ref="benchmark"
        className="top-Gutter Chart-wrapper Benchmark-panel">

        <section className={"Panel-area"}>
          <TabList
            ref="chartData"
            className = {"benchmark-Tabs"}
            channel={channel}
            list={props.typeTabList}
            parentHandler={this.changeTypeHandler}
          />
          <TabList
            ref="chartType"
            className={"chartBenchmark-Tabs chart-Tabs"}
            channel={channel}
            list={props.viewTabList}
            parentHandler={this.changeViewHandler}
          />
          <Settings channel={channel} id={"basicformChart"}>
          	<SettingsFormChart channel={channel} id={"basicformChart"} />
          </Settings>
        </section>

        <div>
          <Chart initialUrl={"chart/period/bar"} initialType={"bar"} channel={channel} id="benchmark" />
        </div>
      </section>
    );
  }
});

module.exports = Benchmark;
