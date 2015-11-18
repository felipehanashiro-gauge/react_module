var React = require("react"),
    ReactDOM = require('react-dom'),
    EventEmitter = require("events").EventEmitter,
    ReactRouter = require("react-router"),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route;

/****  VIEWS ****/
var Application = require("../views/index"),
    HomeView = require("../views/homeView");

ReactDOM.render((
    <Router>
        <Route path="/" component={Application}>
            <Route path="home" component={HomeView}/>
        </Route>
    </Router>
), document.getElementById('react-app'));




/**** GLOBALS ****/
window.React = React;
window.Channel = new EventEmitter();
window.Storage = {};