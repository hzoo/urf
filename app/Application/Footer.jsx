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
             <div className="container">
               <div className="row">
                 <div className="col l6 s12">
                   <h5 className="white-text">{title}</h5>
                   <p className="grey-text text-lighten-4">Created for the&nbsp;
                    <b><a className="grey-text text-lighten-3" href={riotAPILink}>Riot Games API Challenge.</a></b>
                   </p>
                 </div>
               </div>
             </div>
             <div className="footer-copyright">
               <div className="container">
               © 2015 <b><a className="grey-text text-lighten-4" href={githubLink}>Henry Zhu</a></b>
               <a className="grey-text text-lighten-4 right" href={moreLolLink}>Other Links</a>
               </div>
             </div>
           </footer>
        );
    }
});

module.exports = Footer;
