const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
import {urls} from '../const';

const BackgroundImage = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const championName = this.props.champion;
    const imgUrl = urls.splash(championName, this.props.image || 1);
    const divStyle = {
      background: 'url(' + imgUrl + ') ' + 'no-repeat center center fixed',
      backgroundSize: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: '-1'
    };

    return (
      <div style={divStyle}></div>
    );
  }
});

module.exports = BackgroundImage;
