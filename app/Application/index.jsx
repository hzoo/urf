var React = require("react");
var RouteHandler = require("react-router").RouteHandler;
var MainMenu = require("./MainMenu.jsx");
var Footer = require("./Footer.jsx");

require("./style.css");

var Application = React.createClass({
    render: function() {
        return <div>
            <MainMenu />
            <RouteHandler />
            <Footer />
        </div>;
    }
});
module.exports = Application;
