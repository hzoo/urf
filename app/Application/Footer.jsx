const React = require("react");
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const Link = require("react-router").Link;
import {title} from '../const';

const moreLolLink = 'https://www.reddit.com/r/leagueoflegends/comments/30oz5r/useful_lol_websites_everyone_should_know_about/';
const riotAPILink = 'https://developer.riotgames.com/discussion/riot-games-api/show/bX8Z86bm';
const githubLink = 'https://github.com/hzoo/urf';

const Footer = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        const color = this.props.color;
        const classes = `page-footer darken-1 ${color}`;
        return (
            <footer className={classes}>
                <div className="footer-copyright">
                    <div className="container">
                        by <b><a className="grey-text text-lighten-4" href={githubLink}>Henry Zhu</a></b>
                        <a className="grey-text text-lighten-4 right" href={riotAPILink}>using ~180k matches from NA, EUW, EUNE, KR, LAS, OCE.</a>
                    </div>
                </div>
            </footer>
        );
    }
});

module.exports = Footer;
