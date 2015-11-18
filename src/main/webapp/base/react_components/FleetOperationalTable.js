"use strict"

var React = require("react");

var FleetOperationalSummaryTable = {}

FleetOperationalSummaryTable.Summary = React.createClass({
    render: function() {
        return (
            <table className="table table__dynamic" >
                <thead>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_head table__title column__2"  colSpan="2" >FLEET MONITORING</td>
                    </tr>
                </thead>
                {/* FLEET COMPOSITION */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head"  colSpan="2" >FLEET COMPOSITION</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" ><b>Aircraft in Service</b></td>
                        <td className="table__column" >190/195</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" ><b>Aircraft in Operation</b></td>
                        <td className="table__column" >190/195</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" ><b>Aircraft Delivered</b></td>
                        <td className="table__column" >190/195</td>
                    </tr>
                </tbody>
                {/* FLEET UTILIZATION */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head"  colSpan="2" >FLEET UTILIZATION</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" rowSpan="2" ><b>Total Flight</b></td>
                        <td className="table__column" >Hours</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >Cycles</td>
                    </tr>

                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" rowSpan="2" ><b>Daily Utilization</b></td>
                        <td className="table__column" >Hours</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >Cycles</td>
                    </tr>

                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" colSpan="2" ><b>Average Flight Time</b></td>
                    </tr>

                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" rowSpan="2" ><b>Fleet Leader</b></td>
                        <td className="table__column" >Hours</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >Cycles</td>
                    </tr>
                </tbody>
                {/* FLEET PERFORMANCE */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head"  colSpan="2" >FLEET PERFORMANCE</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" colSpan="2" ><b>SR - Schedule Reliability*</b></td>
                    </tr><tr className="table__row" >
                    <td className="table__column table__body_item_subhead" colSpan="2" ><b>CR - Completion Rate*</b></td>
                </tr>
                    <tr className="table__row" >
                        <td className="table__column table__body_item_subhead" colSpan="2" ><b>Last Update</b></td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

FleetOperationalSummaryTable.Data = React.createClass({
    getDefaultProps: function(){
        return{
            fleet: {
                title: '',
                composition: {
                    aircraftInService: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    },
                    aircraftInOperation: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    },
                    aircraftDelivered: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    }
                },
                utilization: {
                    totalFlight:{
                        hours:{
                            L1M: 0,
                            L12M: 0,
                            accum: 0
                        },
                        cycles:{
                            L1M: 0,
                            L12M: 0,
                            accum: 0
                        }
                    },
                    dailyUtilization:{
                        hours:{
                            L1M: 0,
                            L12M: 0,
                            accum: 0
                        },
                        cycles:{
                            L1M: 0,
                            L12M: 0,
                            accum: 0
                        }
                    },
                    averageFlightTime: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    },
                    fleetLeader: {
                        hours: '',
                        cycles: ''
                    }
                },
                performance: {
                    scheduleReliability: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    },
                    completionRate: {
                        L1M: 0,
                        L12M: 0,
                        accum: 0
                    },
                    lastUpdate: ''
                }
            }
        }
    },

    render: function() {
        var fleet = this.props.fleet,
            composition = fleet.composition,
            utilization = fleet.utilization,
            performance = fleet.performance;

        return (
            <table className="table" >
                <thead>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_head"  colSpan="3" >{fleet.title}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead" >L1M</td>
                        <td className="table__column table__column_item_subhead" >L12M</td>
                        <td className="table__column table__column_item_subhead" >ACCUM</td>
                    </tr>
                </thead>

                {/* FLEET COMPOSITION */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head no_border"  colSpan="3" ></td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{composition.aircraftInService.L1M}</td>
                        <td className="table__column" >{composition.aircraftInService.L12M}</td>
                        <td className="table__column" >{composition.aircraftInService.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{composition.aircraftInOperation.L1M}</td>
                        <td className="table__column" >{composition.aircraftInOperation.L12M}</td>
                        <td className="table__column" >{composition.aircraftInOperation.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{composition.aircraftDelivered.L1M}</td>
                        <td className="table__column" >{composition.aircraftDelivered.L12M}</td>
                        <td className="table__column" >{composition.aircraftDelivered.accum}</td>
                    </tr>
                </tbody>
                {/* FLEET UTILIZATION */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head no_border"  colSpan="3" ></td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{utilization.totalFlight.hours.L1M}</td>
                        <td className="table__column" >{utilization.totalFlight.hours.L12M}</td>
                        <td className="table__column" >{utilization.totalFlight.hours.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{utilization.totalFlight.cycles.L1M}</td>
                        <td className="table__column" >{utilization.totalFlight.cycles.L12M}</td>
                        <td className="table__column" >{utilization.totalFlight.cycles.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{utilization.dailyUtilization.hours.L1M}</td>
                        <td className="table__column" >{utilization.dailyUtilization.hours.L12M}</td>
                        <td className="table__column" >{utilization.dailyUtilization.hours.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{utilization.dailyUtilization.cycles.L1M}</td>
                        <td className="table__column" >{utilization.dailyUtilization.cycles.L12M}</td>
                        <td className="table__column" >{utilization.dailyUtilization.cycles.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{utilization.averageFlightTime.L1M}</td>
                        <td className="table__column" >{utilization.averageFlightTime.L12M}</td>
                        <td className="table__column" >{utilization.averageFlightTime.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column"  colSpan="3" >{utilization.fleetLeader.hours}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column"  colSpan="3" >{utilization.fleetLeader.cycles}</td>
                    </tr>
                </tbody>
                {/* FLEET PERFORMANCE */}
                <tbody>
                    <tr className="table__row" >
                        <td className="table__column table__column_item_subhead table__column_body_head no_border"  colSpan="3" ></td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{performance.scheduleReliability.L1M}</td>
                        <td className="table__column" >{performance.scheduleReliability.L12M}</td>
                        <td className="table__column" >{performance.scheduleReliability.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column" >{performance.completionRate.L1M}</td>
                        <td className="table__column" >{performance.completionRate.L12M}</td>
                        <td className="table__column" >{performance.completionRate.accum}</td>
                    </tr>
                    <tr className="table__row" >
                        <td className="table__column"  colSpan="3" >{performance.lastUpdate}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

module.exports = FleetOperationalSummaryTable;