var React = require('react');
const $ = require('jQuery');
const numAbbr = require('number-abbreviate')(['k','m']);

const AverageComponent = React.createClass({
  componentDidMount: function() {
       $('.tooltipped').tooltip({delay: 50});
  },
  render: function(){
    var average = (this.props.data / this.props.rowData.games);
    if (average < 1000) {
        average = average.toFixed(2);
    } else if (average < 1000000) {
        average = Math.floor(average);
    }
    var abbreviated = numAbbr.abbreviate(average, 2);

    if (average === abbreviated) {
        return <span>{average}</span>;
    } else {
        return (
            <span className="tooltipped"
                data-position="top"
                data-delay="50"
                data-tooltip={average}>
                {abbreviated}
            </span>
        );
    }
  }
});

module.exports = AverageComponent;
