const React = require('react');
import {urls} from '../const';
var cx = require('classnames');

const SquareImage = React.createClass({
  render: function() {
    const championName = this.props.champion;
    const size = this.props.size;
    const imgUrl = urls.square(championName);
    const classes = cx({
        circle: this.props.circle
    });

    return (
      <img
        className={classes}
        src={imgUrl}
        height={size || '120'}
        width={size || '120'}
      />
    );
  }
});

module.exports = SquareImage;
