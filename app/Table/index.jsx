const React = require('react');
const TableWrapper = require('../Components/TableWrapper');
import {pluckAll} from '../const';
import {tableMetaData} from './Data';

function query() {
    this.socket.emit('c:dashboardQuery', {});
    this.socket.on('s:dashboardQuery', function(res) {
        if (this.isMounted()) {

            var metaData = this.props.table;
            var filteredResult = pluckAll(res, _.pluck(metaData, 'dataKey'));

            filteredResult.forEach((r) => {
                r.matchDuration = Math.floor(r.matchDuration);
                r.largestCriticalStrike = Math.floor(r.largestCriticalStrike);
                r.totalTimeCrowdControlDealt = Math.floor(r.totalTimeCrowdControlDealt);
            });

            this.setState({
                rows: filteredResult
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
