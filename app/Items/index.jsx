const React = require('react');
const TableWrapper = require('../Components/TableWrapper');
import {championNames} from '../const';
import {tableMetaData} from './Data';

function query() {
    this.socket.emit('c:itemTableQuery', {});
    this.socket.on('s:itemTableQuery', (res) => {
        if (this.isMounted()) {

            var metaData = this.props.table;
            var championObjects = Object.keys(championNames).map((name) => { return {championName: name} });
            res.forEach((r, i) => {
                var objs = championObjects[Math.floor(i /6)];
                if (r.championName === objs.championName) {
                    objs[`item${(i % 6) + 1}Name`] = r.itemId;
                    objs[`item${(i % 6) + 1}Num`] = r.freq;
                }
            });

            this.setState({
                rows: championObjects
            }, function() {
                this._filterRowsBy(this.state.filterBy);
            });
        }
    });
}

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row" style={{marginBottom: 0}}>
                  <div className="card-panel blue">
                    <h6 className="white-text center-align">
                        Top 6 Items Bought
                    </h6>
                  </div>
                </div>
                <TableWrapper table={tableMetaData} query={query}/>
            </div>
        );
    }
});
