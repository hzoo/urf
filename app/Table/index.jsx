var React = require('react');
var TableWrapper = require('../Components/TableWrapper');

var tableMetaData = [{
    dataKey: 'championName',
    label: 'Champion',
    width: 140,
    fixed: true,
    image: true
}, {
    dataKey: 'games',
    label: 'Picks',
    width: 100
}, {
    dataKey: 'bans',
    label: 'Bans',
    width: 100
}, {
    dataKey: 'relevance',
    label: 'Pick/Ban %',
    width: 110
}, {
    dataKey: 'winner',
    label: 'Win %',
    width: 100
}, {
    dataKey: 'matchDuration',
    label: 'AVG Time',
    width: 100
}, {
    dataKey: 'kills',
    label: 'AVG Kills',
    width: 100
}, {
    dataKey: 'deaths',
    label: 'AVG Deaths',
    width: 110
}, {
    dataKey: 'assists',
    label: 'AVG Assists',
    width: 115
}, {
    dataKey: 'champLevel',
    label: 'AVG Level',
    width: 100
}, {
    dataKey: 'goldEarned',
    label: 'AVG Gold',
    width: 95
}, {
    dataKey: 'minionsKilled',
    label: 'AVG CS',
    width: 85
}, {
    dataKey: 'towerKills',
    label: 'AVG Towers',
    width: 115
}, {
    dataKey: 'inhibitorKills',
    label: 'AVG Inhibs',
    width: 110
}];

module.exports = React.createClass({
    render: function() {
        return <TableWrapper table={tableMetaData}/>;
    }
});
