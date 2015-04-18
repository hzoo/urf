var React = require("react");
var RouteHandler = require("react-router").RouteHandler;
var MainMenu = require("./MainMenu.jsx");
var Footer = require("./Footer.jsx");

require("./style.css");

const randNum = Math.floor(Math.random() * 2);
const randColor = randNum === 1 ? 'purple' : 'blue';

var Application = React.createClass({
    componentDidMount: function() {
         React.render(<Footer color={randColor}/>, document.getElementById("contentFooter"));
    },
    render: function() {
        return <div>
            <MainMenu color={randColor}/>
            <RouteHandler />
        </div>;
    }
});
module.exports = Application;
