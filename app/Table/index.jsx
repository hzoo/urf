var React = require('react');
var TableWrapper = require('../Components/TableWrapper');

var tableMetaData = [{
    datakey: 'championName',
    label: 'Champion',
    fixed: true,
    width: 140,
    image: true
}, {
    datakey: 'games',
    label: 'Games',
    fixed: false,
    width: 100
}, {
    datakey: 'bans',
    label: 'Bans',
    fixed: false,
    width: 100
}, {
    datakey: 'winner',
    label: 'Win %',
    fixed: false,
    width: 100
}, {
    datakey: 'matchDuration',
    label: 'AVG Time',
    fixed: false,
    width: 100
}, {
    datakey: 'kills',
    label: 'AVG Kills',
    fixed: false,
    width: 100
}, {
    datakey: 'deaths',
    label: 'AVG Deaths',
    fixed: false,
    width: 110
}, {
    datakey: 'assists',
    label: 'AVG Assists',
    fixed: false,
    width: 115
}];

module.exports = React.createClass({
    render: function() {
        return <TableWrapper table={tableMetaData}/>;
    }
});
