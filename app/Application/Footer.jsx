const React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const Link = require("react-router").Link;
import {title} from '../const';

const moreLolLink = 'https://www.reddit.com/r/leagueoflegends/comments/30oz5r/useful_lol_websites_everyone_should_know_about/';
const riotAPILink = 'https://developer.riotgames.com/discussion/riot-games-api/show/bX8Z86bm';
const githubLink = 'https://developer.riotgames.com/discussion/riot-games-api/show/bX8Z86bm';

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
                 <div className="col l4 offset-l2 s12">
                   <h5 className="white-text">Awesome Sites</h5>
                   <ul>
                     <li><a className="grey-text text-lighten-3" href="http://www.champion.gg/">champion.gg </a></li>
                     <li><a className="grey-text text-lighten-3" href="http://www.probuilds.net/">Pro Builds</a></li>
                     <li><a className="grey-text text-lighten-3" href="http://www.op.gg/">OP.gg</a></li>
                   </ul>
                 </div>
               </div>
             </div>
             <div className="footer-copyright">
               <div className="container">
               © 2015 <b><a className="grey-text text-lighten-4" href="https://github.com/hzoo">Henry Zhu</a></b>
               <a className="grey-text text-lighten-4 right" href={moreLolLink}>More LoL Links</a>
               </div>
             </div>
           </footer>
        );
    }
});

module.exports = Footer;
