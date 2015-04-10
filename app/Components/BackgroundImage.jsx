const React = require('react');
import {urls} from '../const';

const BackgroundImage = React.createClass({
  render: function() {
    const championName = this.props.champion;
    const imgUrl = urls.splash(championName, 1);
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
