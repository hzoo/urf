const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const BackgroundImage = require('../Components/BackgroundImage');
import {urls} from '../const';

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
