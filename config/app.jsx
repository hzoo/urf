var async = require("async");
var React = require("react");
var Router = require("react-router");
var routes = require("../app/" + __resourceQuery.substr(1) + "Routes");
var withTimeout = require("./withTimeout");

// react-router handles location
Router.run(routes, Router.HistoryLocation, function(Application, state) {

    // try to fetch data for a defined timespan
    // when the data is not fully fetched after the timeout components are rendered (with missing/old data)
    withTimeout(async.forEach.bind(async, state.routes, function(route, callback) {
        callback();
    }), 600, function() {
        React.render(<Application />, document.getElementById("content"));
    });
});
