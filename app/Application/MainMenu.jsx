var React = require("react");
var Link = require("react-router").Link;
import {title} from '../const';

var MainMenu = React.createClass({
    render: function() {
        return (
            <nav>
              <div className="nav-wrapper">
                <a href="#" className="brand-logo center">{title}</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                  <li><Link to="home">Home</Link></li>
                  <li><Link to="champions">Champions</Link></li>
                </ul>
              </div>
            </nav>
        );
    }
});

module.exports = MainMenu;
