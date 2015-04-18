var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// polyfill
if (!Object.assign)
    Object.assign = React.__spread;

// export routes
module.exports = (
    <Route name="app" path="/" handler={require("./Application")}>
        <Route name="home" path="/home" handler={require("./Home")} />
        <Route name="table" path="/table" handler={require("./Table")} />
        <Route name="misc" path="/misc" handler={require("./Misc")} />
        <DefaultRoute handler={require("./Home")} />
        <NotFoundRoute handler={require("./NotFound")} />
    </Route>
);
