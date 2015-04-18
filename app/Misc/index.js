const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const TableWrapper = require('../Components/TableWrapper');
const SquareImage = require('../Components/SquareImage');
import {formatNumber, rand, urls, numSkins, championNames} from '../const';
import {miscItemsData} from './Data';

const Card = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState: function() {
        return {
            height: 350
        }
    },
    componentDidMount: function() {
        this.setState({
            height: this.refs.cardContent.getDOMNode().offsetHeight
        });
    },
    render: function() {
        const championName = String(this.props.data[0].championName);
        const statName = String(this.props.stat);
        const height = this.state.height;

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
              <p key={i} style={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
                <SquareImage champion={name} size={'60'} circle={true} flex={true}></SquareImage>
                <a href={url} style={{marginLeft: 5}}>
                    <span style={{fontSize: '18'}} className="title">
                        {championNames[name]}: {Number(stat).toFixed(2)} {`(${formatNumber(otherStat)})`}
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
                        background: `url(${urls.splash(championName, rand(numSkins[championName]))}) no-repeat center center`,
                        backgroundSize: 'cover',
                        height: height
                      }}></div>
                      <span className="card-title">
                        {itemImageRender}
                        {statName}
                      </span>
                    </div>
                    <div ref="cardContent" className="card-content" style={{flex: '0 0 270px'}}>
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
            <div style={{marginTop: 20, marginBottom: -20}}>
                {miscItemsData.map((card, i) => {
                    return <Card key={i}
                    stat={card.stat}
                    titleImage={card.titleImage}
                    data={card.data}
                    />;
                })}
            </div>
        );
    }
});
