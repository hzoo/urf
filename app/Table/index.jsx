const React = require('react');
const TableWrapper = require('../Components/TableWrapper');
import {tableMetaData} from './Data';

module.exports = React.createClass({
    render: function() {
        return <TableWrapper table={tableMetaData}/>;
    }
});
