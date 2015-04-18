const React = require("react");
const Router = require("react-router");
const routes = require("../app/" + __resourceQuery.substr(1) + "Routes");

// react-router handles location
Router.run(routes, Router.HistoryLocation, function(Application, state) {
    React.render(<Application />, document.getElementById("content"));
});
