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

const cards = [
    {
        stat: 'Most Kills',
        data: [
            ['Zed', '80', '1783139860', 'NA'],
            ['Katarina', '75', '2047448298', 'EUW'],
            ['MasterYi', '66', '1136426559', 'EUNE'],
        ]
    },
    {
        stat: 'Most Deaths',
        data: [
            ['Nidalee', '55', '1143315106', 'EUNE'],
            ['Ezreal', '53', '2043620033', 'EUW'],
            ['Annie', '46', '1137996362', 'EUNE']
        ]
    },
    {
        stat: 'Most Assists',
        data: [
            ['Janna', '127', '2043620033', 'EUW'],
            ['Jayce', '98', '2043620033', 'EUW'],
            ['Morgana', '97', '2043620033', 'EUW']
        ]
    },
    {
        stat: 'Most Gold Earned',
        data: [
            ['Azir', '67366', '2041661008', 'EUW'],
            ['Darius', '59229', '1136904616', 'EUNE'],
            ['Rengar', '59069', '2041661008', 'EUW']
        ]
    },
    {
        stat: 'Most Minions Killed',
        data: [
            ['Azir', '815', '2041661008', 'EUW'],
            ['Ezreal', '778', '2063730947', 'EUW'],
            ['Ziggs', '696', '2041661008', 'EUW']
        ]
    },
    {
        stat: 'Most Towers Killed',
        data: [
            ['Quinn', '13', '1781177280', 'NA'],
            ['Karma', '11', '2053119886', 'EUW'],
            ['Tryndamere', '11', '194724442', 'LAS']
        ]
    },
    {
        stat: 'Most Inhibitors Killed',
        data: [
            ['MonkeyKing', '13', '1793105053', 'NA'],
            ['Shaco', '12', '1139651498', 'EUNE'],
            ['Nasus', '12', '1784733478', 'NA']
        ]
    },
    {
        stat: 'Most Killing Sprees',
        data: [
            ['Poppy', '15', '1779369093', 'NA'],
            ['Katarina', '15', '2047019949', 'EUW'],
            ['Jax', '14', '1780525592', 'NA']
        ]
    },
    {
        stat: 'Largest Killing Spree ',
        data: [
            ['Varus', '62', '2043620033', 'EUW'],
            ['Ahri', '51', '1133863063', 'EUNE'],
            ['Jayce', '50', '2043620033', 'EUW']
        ]
    },
    {
        stat: 'Largest Multi Kill',
        data: [
            ['Shaco', '7', '1135960725', 'EUNE'],
            ['Sona', '7', '2043678138', 'EUW'],
            ['Ashe', '7', '1137616059', 'EUNE'],
            ['Riven', '7', '1782387655', 'NA'],
            ['Varus', '7', '2043620033', 'EUW'],
            ['Nidalee', '7', '1832345082', 'KR'],
            ['Nidalee', '7', '1143673203', 'EUNE'],
            ['Katarina', '7', '85069796', 'OCE']
        ]
    },
    {
        stat: 'Most Double Kills',
        data: [
            ['MasterYi', '20', '1136426559', 'EUNE'],
            ['Katarina', '20', '2047019949', 'EUW'],
            ['Evelynn', '17', '1138253738', 'EUNE'],
            ['Evelynn', '17', '1780817081', 'NA'],
            ['Rengar', '17', '1781096065', 'NA']
        ]
    },
    {
        stat: 'Most Triple Kills',
        data: [
            ['Fiora', '9', '85683573', 'OCE'],
            ['Evelynn', '8', '1136131094', 'EUNE'],
            ['Poppy', '8', '1134899744', 'EUNE'],
            ['Lucian', '8', '1781521431', 'NA'],
            ['Katarina', '8', '1134383290', 'EUNE'],
            ['Katarina', '8', '84482049', 'OCE'],
            ['Katarina', '8', '194728768', 'LAS'],
            ['Diana', '8', '1138003415', 'EUNE']
        ]
    },
    {
        stat: 'Most Quadra Kills',
        data: [
            ['XinZhao', '5', '1134375707', 'EUNE'],
            ['MasterYi', '5', '1133955349', 'EUNE']
        ]
    },
    {
        stat: 'Most PENTA Kills',
        data: [
            ['MasterYi', '4', '1133955349', 'EUNE'],
            ['Katarina', '4', '194667010', 'LAS'],
            ['Katarina', '3', '84447182', 'OCE'],
            ['Katarina', '3', '1137241181', 'EUNE']
        ]
    },
    {
        stat: 'Most UNREAL Kills',
        data: [
            ['Shaco', '2', '1135960725', 'EUNE'],
            ['Sona', '2', '2043678138', 'EUW'],
            ['Ashe', '2', '1137616059', 'EUNE'],
            ['Riven', '2', '1782387655', 'NA'],
            ['Varus', '2', '2043620033', 'EUW'],
            ['Nidalee', '2', '1832345082', 'KR'],
            ['Nidalee', '2', '1143673203', 'EUNE'],
            ['Katarina', '2', '85069796', 'OCE']
        ]
    },
    {
        stat: 'Most Magic Damage Dealt',
        data: [
            ['Azir', '1696495', '2041661008', 'EUW'],
            ['Ziggs', '1431647', '2041661008', 'EUW'],
            ['Kennen', '1091161', '1136904616', 'EUNE']
        ]
    },
    {
        stat: 'Most Physical Damage Dealt',
        data: [
            ['Rengar', '1261314', '2041661008', 'EUW'],
            ['Darius', '1244568', '1136904616', 'EUNE'],
            ['Nasus', '1244044', '2056588763', 'EUW']
        ]
    },
    {
        stat: 'Most Time Dealing Crowd Control',
        data: [
            ['Malphite', '32695', '2048961306', 'EUW'],
            ['Alistar', '26624', '1781458768', 'NA'],
            ['Alistar', '23733', '1781119176', 'NA']
        ]
    },
    {
        stat: 'Highest Critical Strike',
        data: [
            ['Nasus', '6951', '2056588763', 'EUW'],
            ['Nasus', '6116', '2042078779', 'EUW'],
            ['Nasus', '6090', '2054019587', 'EUW']
        ]
    },
    {
        stat: 'Most Physical Damage Taken',
        data: [
            ['DrMundo', '162960', '1139615671', 'EUNE'],
            ['Sion', '150020', '1779883407', 'NA'],
            ['MasterYi', '147389', '2041661008', 'EUW']
        ]
    },
    {
        stat: 'Most Magical Damage Taken',
        data: [
            ['DrMundo', '233849', '85355996', 'OCE'],
            ['DrMundo', '173636', '1142124806', 'EUNE'],
            ['DrMundo', '171000', '84738816', 'OCE']
        ]
    },
];

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                {cards.map((card, i) => {
                    return <Card key={i} stat={card.stat} data={card.data} />;
                })}
            </div>
        );
    }
});
