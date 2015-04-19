var React = require('react');
const SquareImage = require('../Components/SquareImage');
const TableWrapper = require('../Components/TableWrapper');
import {formatNumber, rand, urls, numSkins, championNames} from '../const';
import {mostXData} from './Data';

const Card = React.createClass({
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
        const championName = String(this.props.data[0][0]);
        const statName = String(this.props.stat);
        const height = this.state.height;
        const list = this.props.data.map((obj, i) => {
            var name = obj[0];
            var stat = obj[1];
            var matchId = obj[2];
            var region = obj[3];
            var content = `${championNames[name]}: ${formatNumber(stat)}`;
            return (
              <p key={i} style={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
                <SquareImage champion={name} size={'60'} circle={true} flex={true}></SquareImage>
                <a href={urls.matchDetails(region, matchId)} style={{marginLeft: 5}}>
                    <span style={{marginLeft: '4', fontSize: '18'}} className="title">{content}</span>
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
                        background: `url(${urls.splash(championName, rand(numSkins[championName]))}) no-repeat center top`,
                        backgroundSize: 'cover',
                        height: height
                      }}></div>
                      <span className="card-title">{statName}</span>
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

module.exports = React.createClass({
    render: function() {
        return (
            <div style={{marginTop: 20, marginBottom: -20}}>
                <div className="row">
                      <div className="card-panel grey">
                        <h5 className="white-text center-align">
                            Games with the...
                        </h5>
                      </div>
                    </div>
                {mostXData.map((card, i) => {
                    return <Card key={i} stat={card.stat} data={card.data} />;
                })}
            </div>
        );
    }
});
