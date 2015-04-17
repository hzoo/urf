const React = require("react");
const Link = require("react-router").Link;
import {title} from '../const';
const $ = require('jQuery');

const MainMenu = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            searching: false
        };
    },
    submitHandler: function(e) {
        e.preventDefault();
        var name = this.refs.searchInput.getDOMNode().value;
        this.setState({
            searching: !this.state.searching
        }, function() {
            this.context.router.transitionTo(`/champions/${name}`);
            // this.context.router.transitionTo('champions', { champion: name });
        });
    },
    searchHandler: function() {
        this.setState({
            searching: !this.state.searching
        }, function() {
            React.findDOMNode(this.refs.searchInput).focus();
        });
    },
    closeHandler: function() {
        this.setState({
            searching: !this.state.searching
        }, function() {
            $(".button-collapse").sideNav({
                closeOnClick: true
            });
        });
    },
    componentDidMount: function() {
         $(".button-collapse").sideNav({
             closeOnClick: true
         });
    },
    render: function() {
        var navContent;

        if (this.state.searching) {
            navContent = (
                <form onSubmit={this.submitHandler}>
                    <div className="input-field">
                        <input id="search" type="search" required ref="searchInput"/>
                        <label htmlFor="search"><i className="mdi-action-search"></i></label>
                        <i onClick={this.closeHandler} className="mdi-navigation-close"></i>
                    </div>
                </form>
            );
        } else {
            navContent = (
                <span>
                    <Link to="home" className="brand-logo">
                        <span>&nbsp;{title}</span>
                    </Link>
                    <a data-activates="mobile-demo" className="button-collapse">
                        <i className="mdi-navigation-menu"></i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                      <li onClick={this.searchHandler}>Search&nbsp;</li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                      <li><a onClick={this.searchHandler}>Search&nbsp;</a></li>
                    </ul>
                </span>
            );
        }
        return (
            <div className="">
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
