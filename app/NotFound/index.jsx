var React = require('react');
import {urls} from '../const';
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var BackgroundImage = require('../Components/BackgroundImage');

module.exports = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div>
                <p style={{
                    position: 'absolute',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 300,
                    top: 40,
                    left: 0,
                    padding: '20px'
                }}>The page you requested was not found.</p>
                <BackgroundImage champion='Teemo' image='8'/>
            </div>
        );
    }
});
