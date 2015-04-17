var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

import {socketUrl, championNames} from '../const';
var io = require('socket.io');

require('fixed-data-table/dist/fixed-data-table.min.css');

import SquareImage from './SquareImage.jsx';
import AverageComponent from '../Components/AverageComponent.jsx';

const ImageWrapper = React.createClass({
    render: function() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <SquareImage
                    champion={this.props.data}
                    size={'42'}
                    circle={true}>
                </SquareImage>
                <div style={{marginLeft: 4}}>{championNames[this.props.data]}</div>
            </div>
        );
    }
});

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

const renderAverageComponent = (data, key, rowData) => {
    return <AverageComponent data={data} games={rowData.games} />;
};

// https://github.com/facebook/fixed-data-table/issues/67
var TableWrapper = React.createClass({
    getInitialState: function() {
        return {
            rows: [],
            sortBy: 'year',
            sortDir: SortTypes.DESC,
            filteredRows: null,
            filterBy: null
        };
    },
    componentWillMount: function() {
        this.socket = io();
        this._filterRowsBy(this.state.filterBy);
    },
    componentDidMount: function() {
        if (this.state.rows.length === 0) {
            this.socket.emit('dashboardQuery', {});
            this.socket.on('dashboardQuery', (res) => {
                if (this.isMounted()) {
                    this.setState({
                        rows: res
                    }, function() {
                        this._filterRowsBy(this.state.filterBy);
                    });
                }
            });
        }
    },
    _rowGetter: function(rowIndex) {
        return this.state.filteredRows[rowIndex];
    },
    _filterRowsBy: function(filterBy) {
        var rows = this.state.rows.slice();
        var filteredRows = filterBy
            ? rows.filter(row => row.championName.toLowerCase().indexOf(filterBy.toLowerCase()) >= 0)
            : rows;

        this.setState({
            filteredRows,
            filterBy,
        });
    },
    _onFilterChange: function(e) {
        this._filterRowsBy(e.target.value);
    },
    _sortRowsBy: function(cellDataKey) {
        var sortDir = this.state.sortDir;
        var sortBy = cellDataKey;
        if (sortBy === this.state.sortBy) {
            sortDir = this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
        } else {
            sortDir = SortTypes.DESC;
        }

        var filteredRows = this.state.filteredRows.slice();
        filteredRows.sort((a, b) => {
            var sortVal = 0;
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }

            if (sortDir === SortTypes.ASC) {
                sortVal = sortVal * -1;
            }

            return sortVal;
        });

        this.setState({
            filteredRows,
            sortBy,
            sortDir,
        });
    },
    _renderHeader: function(label, cellDataKey) {
        return (
            <a href="#" onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</a>
        );
    },
    render: function() {
        var sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
        var numGames = this.state.filteredRows[0]
        return (
            <div>
                <div className="col s12" style={{padding: '8', paddingBottom: '0'}}>
                    <div className="input-field">
                        <i className="mdi-action-search prefix"></i>
                        <input
                            onChange={this._onFilterChange}
                            id="icon_prefix"
                            type="text" />
                        <label htmlFor="icon_prefix">Filter by Champion</label>
                    </div>
                </div>
                <Table
                    rowHeight={50}
                    rowGetter={this._rowGetter}
                    rowsCount={this.state.filteredRows.length}
                    overflowX="hidden"
                    width={1920}
                    height={800}
                    headerHeight={40}>
                    <Column
                        cellRenderer={(data) => <ImageWrapper data={data} />}
                        headerRenderer={this._renderHeader}
                        label={'Champion' + (this.state.sortBy === 'championName' ? sortDirArrow : '')}
                        fixed={true}
                        width={140}
                        dataKey='championName'
                    />
                    <Column
                        headerRenderer={this._renderHeader}
                        label={'Games' + (this.state.sortBy === 'games' ? sortDirArrow : '')}
                        width={100}
                        dataKey='games'
                    />
                    <Column
                        headerRenderer={this._renderHeader}
                        label={'Bans' + (this.state.sortBy === 'bans' ? sortDirArrow : '')}
                        width={100}
                        dataKey='bans'
                    />
                    <Column
                        headerRenderer={this._renderHeader}
                        label={'Wins' + (this.state.sortBy === 'winner' ? sortDirArrow : '')}
                        width={100}
                        dataKey='winner'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Time' + (this.state.sortBy === 'matchDuration' ? sortDirArrow : '')}
                        width={100}
                        dataKey='matchDuration'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Kills' + (this.state.sortBy === 'kills' ? sortDirArrow : '')}
                        width={100}
                        dataKey='kills'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Deaths' + (this.state.sortBy === 'deaths' ? sortDirArrow : '')}
                        width={100}
                        dataKey='deaths'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Assists' + (this.state.sortBy === 'assists' ? sortDirArrow : '')}
                        width={100}
                        dataKey='assists'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Level' + (this.state.sortBy === 'champLevel' ? sortDirArrow : '')}
                        width={100}
                        dataKey='champLevel'
                    />
                    <Column
                        cellRenderer={renderAverageComponent}
                        headerRenderer={this._renderHeader}
                        label={'AVG Gold' + (this.state.sortBy === 'goldEarned' ? sortDirArrow : '')}
                        width={100}
                        dataKey='goldEarned'
                    />
                </Table>
            </div>
        );
    }
});

module.exports = TableWrapper;
