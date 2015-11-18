"use strict"

 var React = require("react"),
     TagArea = require("../../base/react_components/TagArea"),
     TabList = require("../../base/react_components/TabList.js"),
     Settings = require("../../base/react_components/Settings.js"),
     SettingsForm = require("../../base/react_components/SettingsForm"),
     SettingsFieldset = require("../../base/react_components/SettingsFieldset"),
     SettingsFieldsetAction = require("../../base/react_components/SettingsFieldsetAction"),
     SelectComponent = require("../../base/react_components/Select"),
     DatePicker = require("../../base/react_components/DatePicker"),
     Multiselect = require("../../base/react_components/Multiselect"),
     HomeStore = require("../stores/homeStore");

 var channel = window.Channel;

var tabsSettings = [
    {
        "name": "Regions",
        "id": "operators",
        "href": "region"
    },
    {
        "name": "Operators",
        "id": "regions",
        "href": "operator"
    }
];


var HomeView = React.createClass({

    Store: null,

    componentWillMount: function(){
        this.Store = HomeStore.init(this);
    },

    getInitialState: function(){
        return {
            Clients: {
                data: {name: ""},
                list: []
            },
            selected: ""
        }
    },

    render: function() {
     return (
       <section>
         <section className={"Panel-area"}>
             <TabList ref="aircraftFamily" className="panel-Tabs" urlUpdate={"families-by-operator"}/>
             <TagArea url={"getFilterBar"}>
                 <Settings url={"comboSettings"} id={"basicform"}>
                     <SettingsForm id={"basicform"}>
                         <SettingsFieldset>
                             <SelectComponent label={"Family"} name={"family"} componentName="SelectComponent" />
                             <DatePicker label={"Reference Date"} name={"referenceDate"} componentName="DatePicker" />
                         </SettingsFieldset>
                         <SettingsFieldsetAction />
                     </SettingsForm>
                 </Settings>
             </TagArea>
         </section>
         <section className="top-Gutter Grid">
         </section>
       </section>
     );
    }
});


module.exports = HomeView;