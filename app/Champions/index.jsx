var React = require('react');
var RouteHandler = require("react-router").RouteHandler;
import {socketUrl} from '../const';
var io = require('socket.io');
var cx = require('classnames');
var SquareImage = require('../Components/SquareImage');

var Champions = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentWillMount: function() {
        this.socket = io.connect(null, {
            transports: ['websocket']
        });
    },
    componentDidMount: function() {
        this.socket.emit('singleQuery', {
            name: 'AVGstatPerMinQuery',
            stat: 'goldEarned',
            region: 'NA',
            sort: 'DESC'
        });
        this.socket.on('singleQuery:AVGstatPerMinQuery', (data) => {
            if (this.isMounted()) {
                this.setState({
                    data: data
                });
            }
        });
    },
    render: function() {
        return (
            <div>
                <h2>Champions</h2>
                <MyComponent data={this.state.data} />
                <RouteHandler />
            </div>
        );
    }
});

var MyComponent = React.createClass({
    getDefaultProps: function() {
        return {
            data: []
        };
    },
    render: function() {
        var data = this.props.data;
        var list = data.map((d, i) =>
            <li key={i} className="collection-item avatar" style={{paddingTop: '21'}}>
              <SquareImage champion={d.championName} size={'42'} circle={true}></SquareImage>
              <span className="title">{d.championName}</span>
              <p>
                {d.goldEarnedPM}
              </p>
            </li>
        );
        return (
            <ul className="collection">
                {list}
            </ul>
        );
    }
});

module.exports = Champions;
