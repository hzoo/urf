var React = require('react');
var TableWrapper = require('../Components/TableWrapper');

var tableMetaData = [{
    datakey: 'championName',
    label: 'Champion',
    width: 140,
    fixed: true,
    image: true
}, {
    datakey: 'games',
    label: 'Games',
    width: 100
}, {
    datakey: 'bans',
    label: 'Bans',
    width: 100
}, {
    datakey: 'winner',
    label: 'Win %',
    width: 100
}, {
    datakey: 'matchDuration',
    label: 'AVG Time',
    width: 100
}, {
    datakey: 'kills',
    label: 'AVG Kills',
    width: 100
}, {
    datakey: 'deaths',
    label: 'AVG Deaths',
    width: 110
}, {
    datakey: 'assists',
    label: 'AVG Assists',
    width: 115
}, {
    datakey: 'champLevel',
    label: 'AVG Level',
    width: 100
}, {
    datakey: 'goldEarned',
    label: 'AVG Gold',
    width: 95
}, {
    datakey: 'minionsKilled',
    label: 'AVG CS',
    width: 85
}, {
    datakey: 'towerKills',
    label: 'AVG Towers',
    width: 115
}, {
    datakey: 'inhibitorKills',
    label: 'AVG Inhibs',
    width: 110
}];

module.exports = React.createClass({
    render: function() {
        return <TableWrapper table={tableMetaData}/>;
    }
});
