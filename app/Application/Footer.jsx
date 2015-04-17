const React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const Link = require("react-router").Link;
import {title} from '../const';

const moreLolLink = 'https://www.reddit.com/r/leagueoflegends/comments/30oz5r/useful_lol_websites_everyone_should_know_about/';
const riotAPILink = 'https://developer.riotgames.com/discussion/riot-games-api/show/bX8Z86bm';
const githubLink = 'https://github.com/hzoo';

const Footer = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <div className="container">
                        © 2015 <b><a className="grey-text text-lighten-4" href={githubLink}>Henry Zhu</a></b>
                        <a className="grey-text text-lighten-4 right" href={riotAPILink}>for the Riot Games API Challenge</a>
                    </div>
                </div>
            </footer>
        );
    }
});

module.exports = Footer;
