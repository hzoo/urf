const React = require('react');
const TableWrapper = require('../Components/TableWrapper');
import {pluckAll} from '../const';
import {tableMetaData} from './Data';

function query() {
    this.socket.emit('c:dashboardQuery', {});
    this.socket.on('s:dashboardQuery', function(res) {
        if (this.isMounted()) {

            var metaData = this.props.table;
            // var filteredResult = pluckAll(res, _.pluck(metaData, 'dataKey'));
            const sumGames = res.map(r => r.games).reduce((a,b) => a + b);

            res.forEach((r) => {
                r.popularity = Math.round(r.games / sumGames * 1e4) / 1e2;
                r.relevance = Math.round((r.games + r.bans)/ sumGames * 1e4) / 1e2;
                r.matchDuration = Math.floor(r.matchDuration);
                r.largestCriticalStrike = Math.floor(r.largestCriticalStrike);
                r.totalTimeCrowdControlDealt = Math.floor(r.totalTimeCrowdControlDealt);
            });

            this.setState({
                rows: res
            }, function() {
                this._filterRowsBy(this.state.filterBy);
            });
        }
    }.bind(this));
};

module.exports = React.createClass({
    render: function() {
        return <TableWrapper table={tableMetaData} query={query}/>;
    }
});
