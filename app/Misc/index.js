var React = require('react');
var TableWrapper = require('../Components/TableWrapper');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

import {urls, numSkins, championNames} from '../const';
import {miscItemsData} from './Data';
var SquareImage = require('../Components/SquareImage');

const rand = num => Math.floor(Math.random() * (num - 1));

const Card = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        const championName = String(this.props.data[0].championName);
        const statName = String(this.props.stat);
        const height = this.props.height;

        const itemImageRender = this.props.itemImage ?
        (<div style={{
            backgroundImage: `url(${urls.item(this.props.itemImage)})`,
            height: 64,
            width: 64
        }}></div>) : '';

        const list = this.props.data.map((obj, i) => {
            var name = obj.championName;
            var stat = obj.stat;
            var otherStat = obj.otherStat;
            var matchId = obj.matchId;
            var region = obj.region;
            var url = region ? urls.matchDetails(region, matchId) : '';
            return (
              <p key={i} style={{display: 'flex', alignItems: 'center', padding: '3'}}>
                <SquareImage champion={name} size={'60'} circle={true}></SquareImage>
                <a href={url}>
                    <span style={{marginLeft: '4', fontSize: '18'}} className="title">
                        {championNames[name]}: {Number(stat).toFixed(2)} {`(${otherStat})`}
                    </span>
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
                        height: height
                      }}></div>
                      <span className="card-title">
                        {itemImageRender}
                        {statName}
                      </span>
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

// mostXBoughtPerMatch(3089)
const mostXBoughtPerMatch = (id) => `
    SELECT champions.championName,
    (SUM(IF(item0=${id},1,0))+
    SUM(IF(item1=${id},1,0))+
    SUM(IF(item2=${id},1,0))+
    SUM(IF(item3=${id},1,0))+
    SUM(IF(item4=${id},1,0))+
    SUM(IF(item5=${id},1,0))) / COUNT(1) as A, COUNT(1)
    FROM players, champions
    WHERE champions.championId = players.championId
    GROUP BY players.championId
    ORDER BY A DESC
`;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                {miscItemsData.map((card, i) => {
                    return <Card key={i}
                    stat={card.stat}
                    titleImage={card.titleImage}
                    data={card.data}
                    height='350'
                    />;
                })}
            </div>
        );
    }
});
