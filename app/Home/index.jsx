var React = require('react');
var TableWrapper = require('../Components/TableWrapper');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

import {urls, numSkins, championNames} from '../const';
var SquareImage = require('../Components/SquareImage');

import {mostXData} from './Data';

const rand = num => Math.floor(Math.random() * (num - 1));

const Card = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        const championName = String(this.props.data[0][0]);
        const statName = String(this.props.stat);
        const list = this.props.data.map((obj, i) => {
            var name = obj[0];
            var stat = obj[1];
            var matchId = obj[2];
            var region = obj[3];
            return (
              <p key={i} style={{display: 'flex', alignItems: 'center', padding: '3'}}>
                <SquareImage champion={name} size={'60'} circle={true}></SquareImage>
                <a href={urls.matchDetails(region, matchId)}>
                    <span style={{marginLeft: '4', fontSize: '18'}} className="title">{championNames[name]}: {stat}</span>
                </a>
              </p>
            );
        });
        return (
            <div className="row">
                <div style={{maxWidth: '1280px', margin: 'auto'}}>
                  <div className="card" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <div className="card-image"style={{
                        flex: '1'
                    }}>
                      <div style={{
                        backgroundImage: `url(${urls.splash(championName, rand(numSkins[championName]))})`,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center top',
                        height: '260px'
                      }}></div>
                      <span className="card-title">{statName}</span>
                    </div>
                    <div className="card-content" style={{flex: '0 0 270px'}}>
                        {list}
                    </div>
                  </div>
                </div>
            </div>
        );
    }
});

// mostX(kills, 'DESC')
const mostX = (stat, sort) => `
    SELECT championName, players.${stat} as stat, players.matchId, players.region
    FROM players, champions
    WHERE players.championId = champions.championId
    ORDER BY stat ${sort}
    LIMIT 10
`;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                {mostXData.map((card, i) => {
                    return <Card key={i} stat={card.stat} data={card.data} />;
                })}
            </div>
        );
    }
});
