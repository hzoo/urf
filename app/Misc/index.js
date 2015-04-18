var React = require('react');
var TableWrapper = require('../Components/TableWrapper');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

import {urls, numSkins, championNames} from '../const';
var SquareImage = require('../Components/SquareImage');

const rand = num => Math.floor(Math.random() * (num - 1));

const Card = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        const championName = String(this.props.data[0][0]);
        const statName = String(this.props.stat);
        const list = this.props.data.map((obj, i) => {
            var name = obj[0];
            var stat = obj[1];
            var stat2 = obj[2];
            return (
              <p key={i} style={{display: 'flex', alignItems: 'center', padding: '3'}}>
                <SquareImage champion={name} size={'60'} circle={true}></SquareImage>
                <span style={{marginLeft: '4', fontSize: '18'}} className="title">{championNames[name]}: {Number(stat).toFixed(2)} ({stat2})</span>
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
                      <span className="card-title">
                        <div style={{
                            backgroundImage: `url(${urls.item(this.props.titleImage)})`,
                            height: 64,
                            width: 64
                          }}></div>
                        <div>{statName}</div>
                      </span>
                    </div>
                    <div className="card-content" style={{flex: '0 0 350px'}}>
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

const cards = [
    {
        stat: 'Most Deathcaps Bought Per Match (Total)',
        titleImage: '3089',
        data: [
            ['Karthus', '1.126', '30746'],
            ['Veigar', '1.0321', '23361'],
            ['Lux', '1.0099', '57010'],
            ['Ziggs', '0.9951', '24279'],
            ['Syndra', '0.9855', '14719'],
            ['Xerath', '0.9779', '13020'],
            ['Orianna', '0.9612', '11534'],
            ['Nidalee', '0.9603', '84387'],
            ['Ahri', '0.9450', '37085'],
            ['Karma', '0.9300', '23683']
        ]
    },
    {
        stat: 'Most Infinity Edges Bought Per Match (Total)',
        titleImage: '3031',
        data: [
            ['Draven', '0.9721', '5707'],
            ['Graves', '0.9328', '8093'],
            ['Sivir', '0.8864', '15418'],
            ['Gangplank', '0.8836', '25804'],
            ['Jinx', '0.8795', '55524'],
            ['Caitlyn', '0.8747', '8714'],
            ['Varus', '0.8583', '9707'],
            ['Lucian', '0.8296', '32038'],
            ['Yasuo', '0.8151', '17249'],
            ['Quinn', '0.8031', '7009'],
        ]
    },
    {
        stat: `Most Warmog's Bought Per Match (Total)`,
        titleImage: '3083',
        data: [
            ['DrMundo', '0.9580', '11964'],
            ['Volibear', '0.6518', '5173'],
            ['Zac', '0.6284', '3046'],
            ['Sion', '0.5849', '8548'],
            ['Garen', '0.4588', '10660'],
            ['Braum', '0.4113', '2862'],
            ['Nautilus', '0.3667', '8919'],
            ['Singed', '0.3405', '8623'],
            ['Sejuani', '0.3373', '13131'],
            ['Yorick', '0.3061', '6296'],
        ]
    },
    {
        stat: `Most Trinity Forces Bought Per Match (Total)`,
        titleImage: '3078',
        data: [
            ['Irelia', '0.8581', '6737'],
            ['Hecarim', '0.7837', '58330'],
            ['Poppy', '0.7113', '12099'],
            ['Udyr', '0.6667', '8094'],
            ['Jax', '0.6513', '28483'],
            ['Vi', '0.6352', '19989'],
            ['Yorick', '0.5897', '6296'],
            ['Skarner', '0.5677', '4781'],
            ['Nasus', '0.5665', '32152'],
            ['Gangplank', '0.5455', '25804'],
        ]
    }
];



module.exports = React.createClass({
    render: function() {
        return (
            <div>
                {cards.map((card, i) => {
                    return <Card key={i} stat={card.stat} titleImage={card.titleImage} data={card.data} />;
                })}
            </div>
        );
    }
});
