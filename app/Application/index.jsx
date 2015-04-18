const React = require("react");
const RouteHandler = require("react-router").RouteHandler;
const MainMenu = require("./MainMenu.jsx");
const Footer = require("./Footer.jsx");
require("./style.css");

const randNum = Math.floor(Math.random() * 2);
const randColor = randNum === 1 ? 'purple' : 'blue';

const Application = React.createClass({
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
