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
        className={classes}
        src={imgUrl}
        height={size || '120'}
        width={size || '120'}
      />
    );
  }
});

module.exports = SquareImage;
