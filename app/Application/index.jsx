var React = require("react");
var RouteHandler = require("react-router").RouteHandler;
var MainMenu = require("./MainMenu.jsx");
var Footer = require("./Footer.jsx");

require("./style.css");

var Application = React.createClass({
    componentDidMount: function() {
         React.render(<Footer />, document.getElementById("contentFooter"));
    },
    render: function() {
        return <div>
            <MainMenu />
            <RouteHandler />
        </div>;
    }
});
module.exports = Application;
