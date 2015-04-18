const React = require("react");
import {title} from '../const';
const Link = require("react-router").Link;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const MainMenu = React.createClass({
    mixins: [PureRenderMixin],
    componentDidMount: function() {
         $(".button-collapse").sideNav({
             closeOnClick: true
         });
    },
    render: function() {
        var navContent = (
            <span>
                <Link to="home" className="brand-logo">
                    <span>&nbsp;{title}</span>
                </Link>
                <a data-activates="mobile-demo" className="button-collapse">
                    <i className="mdi-navigation-menu"></i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <Link to="table">
                      <span>Table</span>
                  </Link>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <Link to="table">
                      <span>Table</span>
                  </Link>
                </ul>
            </span>
        );
        return (
            <div>
                <nav>
                  <div className="nav-wrapper">
                    {navContent}
                  </div>
                </nav>
            </div>
        );
    }
});

module.exports = MainMenu;
