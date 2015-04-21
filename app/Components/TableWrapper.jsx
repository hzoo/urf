const React = require('react');
const FixedDataTable = require('fixed-data-table');
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const io = require('socket.io');
import {championNames} from '../const';
import SquareImage from './SquareImage.jsx';

require('fixed-data-table/dist/fixed-data-table.min.css');

const ImageWrapper = React.createClass({
    render: function() {
        var image;

        if (this.props.item) {
            image = <SquareImage
                item={this.props.data}
                size={'42'}
                circle={true}>
            </SquareImage>;
        } else {
            image = <SquareImage
                champion={this.props.data}
                size={'42'}
                circle={true}>
            </SquareImage>
        }

        return (
            <div style={{display: 'flex', alignItems: 'center', marginLeft: 2}}>
                {image}
                <div style={{marginLeft: 4}}>{championNames[this.props.data]}</div>
            </div>
        );
    }
});

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

// https://github.com/facebook/fixed-data-table/issues/67
const TableWrapper = React.createClass({
    getInitialState: function() {
        return {
            rows: [],
            sortBy: 'championName',
            sortDir: SortTypes.ASC,
            filteredRows: null,
            filterBy: null
        };
    },
    componentWillMount: function() {
        // http://stackoverflow.com/a/29472605
        this.socket = io();
        this._filterRowsBy(this.state.filterBy);
    },
    componentDidMount: function() {
        if (this.state.rows.length === 0) {
            this.props.query.bind(this)();
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
        var numGames = this.state.filteredRows[0];

        var table = (
            <Table
                rowHeight={50}
                headerHeight={50}
                rowGetter={this._rowGetter}
                rowsCount={this.state.filteredRows.length}
                width={1280}
                height={720}>
                {this.props.table.map((column, i) => {
                    var image;

                    if (column.champion) {
                        image = (data) => <ImageWrapper data={data} />;
                    } else if (column.item) {
                        image = (data) => <ImageWrapper data={data} item={true} />;
                    } else {
                        image = null;
                    }

                    return (
                        <Column
                            key={i}
                            cellRenderer={image}
                            headerRenderer={this._renderHeader}
                            label={column.label + (this.state.sortBy === column.dataKey ? sortDirArrow : '')}
                            fixed={column.fixed}
                            width={column.width}
                            dataKey={column.dataKey}
                        />
                    );
                })}
            </Table>
        );

        return (
            <div>
                <div className="col s12" style={{
                    padding: '8',
                    paddingBottom: '0',
                    margin: 'auto',
                    width: '1280'
                }}>
                    <div className="input-field">
                        <i className="mdi-action-search prefix"></i>
                        <input
                            onChange={this._onFilterChange}
                            id="icon_prefix"
                            type="text" />
                        <label htmlFor="icon_prefix">Filter by Champion</label>
                    </div>
                </div>
                <div style={{margin: 'auto', width: '1280'}}>
                    {table}
                </div>
            </div>
        );
    }
});

module.exports = TableWrapper;
