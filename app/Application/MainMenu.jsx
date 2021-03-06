const React = require("react");
const Link = require("react-router").Link;
import {title} from '../const';

const MainMenu = React.createClass({
    componentDidMount: function() {
         $(".button-collapse").sideNav({
             closeOnClick: true
         });
    },
    render: function() {
        const color = this.props.color;
        const navContent = (
            <span>
                <Link to="home" className="brand-logo">
                    <span>&nbsp;{title}</span>
                </Link>
                <a data-activates="mobile-demo" className="button-collapse">
                    <i className="mdi-navigation-menu"></i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <li><Link to="home"><span>Matches</span></Link></li>
                  <li><Link to="misc"><span>Misc</span></Link></li>
                  <li><Link to="items"><span>Items</span></Link></li>
                  <li><Link to="table"><span>Champions Table</span></Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li><Link to="home"><span>Matches</span></Link></li>
                  <li><Link to="misc"><span>Misc</span></Link></li>
                  <li><Link to="items"><span>Items</span></Link></li>
                  <li><Link to="table"><span>Champions Table</span></Link></li>
                </ul>
            </span>
        );
        return (
            <div>
                <nav className={`darken-1 ${color}`}>
                  <div className="nav-wrapper">
                    {navContent}
                  </div>
                </nav>
            </div>
        );
    }
});

module.exports = MainMenu;
