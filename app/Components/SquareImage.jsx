const React = require('react');
const cx = require('classnames');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
import {urls} from '../const';

const SquareImage = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const championName = this.props.champion;
    const itemId = this.props.item;
    const size = this.props.size;

    let input;
    let getUrl;
    let style = {};

    if (this.props.flex) {
        style.flex = `0 0 ${size}px`;
    }

    if (championName) {
        input = championName;
        getUrl = urls.square;
    } else {
        input = itemId;
        getUrl = urls.item;
    }

    const imgUrl = getUrl(input);
    const classes = cx({
        circle: this.props.circle
    });

    return (
      <img
        style={style}
        className={classes}
        src={imgUrl}
        height={size || '120'}
        width={size || '120'}
      />
    );
  }
});

module.exports = SquareImage;
