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
        var list = data.map((d, i) =>
            <li key={i} className="collection-item avatar" style={{paddingTop: '21'}}>
              <SquareImage champion={d.championName} size={'42'} circle={true}></SquareImage>
              <span className="title">{d.championName}</span>
              <p>
                {d.games}
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
