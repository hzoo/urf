var React = require('react');
import {socketUrl} from '../const';
var io = require('socket.io');
var cx = require('classnames');
var SquareImage = require('../Components/SquareImage');
var Griddle = require('griddle-react');
import {dashboardColumnsData} from '../Components/DashboardData';
import _ from 'lodash';

function pluckAll(objects, arr) {
    return _.map(objects,_.partialRight(_.pick, arr));
}

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentWillMount: function() {
        this.socket = io.connect(socketUrl);
    },
    componentDidMount: function() {
        if (this.state.data.length === 0) {
            this.socket.emit('dashboardQuery', {});
            this.socket.on('dashboardQuery', (data) => {
                if (this.isMounted()) {
                    this.setState({
                        data: data
                    });
                }
            });
        }
    },
    render: function() {
        var columnsToShow = [
            'championName','games','bans','matchDuration','winner',
            'kills','deaths','assists',
            'champLevel','goldEarned'
        ];
        var filteredData = pluckAll(this.state.data, columnsToShow);
        return <GriddleWrapper columns={columnsToShow}
            data={filteredData}
        />;
    }
});

var GriddleWrapper = React.createClass({
    getDefaultProps: function() {
        return {
            data: []
        };
    },
    render: function() {
        var data = this.props.data;
        var columns = this.props.columns;
        return (
            <Griddle
                columns={columns}
                columnMetadata={dashboardColumnsData}
                filterPlaceholderText={'Filter by Champion Name here...'}
                results={data}
                resultsPerPage={20}
                showFilter={true}
            />
        );
    }
});
