var React = require('react');
import {socketUrl} from '../const';
var io = require('socket.io');
var cx = require('classnames');
var SquareImage = require('../Components/SquareImage');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentWillMount: function() {
        this.socket = io.connect(socketUrl);
        this.socket.on('query:AVGstatPerMinQuery', (data) => {
            this.setState({
                data: data
            });
        });
        this.socket.emit('query', {
            name: 'AVGstatPerMinQuery',
            stat: 'goldEarned',
            region: 'NA',
            sort: 'DESC'
        });
    },
    render: function() {
        return <MyComponent
            data={this.state.data}
        />;
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
        var list = data.map((d) =>
            <li className="collection-item avatar" style={{paddingTop: '21'}}>
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
