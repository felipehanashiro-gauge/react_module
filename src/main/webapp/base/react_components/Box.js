/* eslint-env node */
/*
 * Componente para as caixas de visao de frota.
 * Podem ser do tipo Operator, Region e Worldwide.
 */

"use strict";

var React = require("react"),
  BoxHeader = require("./BoxHeader"),
  BoxBody = require("./BoxBody"),
  BoxMixin = require("./mixins/Box"),
  request = require("../javascripts/modules/request"),
  is = require("../javascripts/modules/is");


var Box = React.createClass({
  mixins: [BoxMixin],

  render: function() {
    var props = this.props,
      id = props.id,
      data = this.state.data;

    return (
      <article
        className={"Box"}
        role={"article"}
        id={"box-#id".replace("#id", id)}>

        <BoxHeader
          id={id}
          name={props.name}
          selected={data.countSelected}
          total={data.countTotal}
          totalGeral={data.countTotalGeral}
          empty={data.empty}
        />

        <BoxBody ref={"boxBody"} {...data} id={id} />
      </article>
    );
  }
});

module.exports = Box;
