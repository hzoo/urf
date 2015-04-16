var React = require('react');
import AverageComponent from './AverageComponent.jsx';
import SquareImage from './SquareImage.jsx';

const SquareImageWrapper = React.createClass({
    render: function() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <SquareImage
                    champion={this.props.data}
                    size={'42'}
                    circle={true}>
                </SquareImage>
                <div style={{marginLeft: 4}}>{this.props.data}</div>
            </div>
        );
    }
})

export const dashboardColumnsData = [
    {
        'columnName': 'championName',
        'order': 0,
        'locked': true,
        'displayName': 'Champion',
        "customComponent": SquareImageWrapper
    },
    {
        'columnName': 'games',
        'order': 1,
        'displayName': 'Games'
    },
    {
        'columnName': 'bans',
        'order': 2,
        'displayName': 'Bans'
    },
    {
        'columnName': 'winner',
        'order': 3,
        'displayName': 'Wins'
    },
    {
        'columnName': 'matchDuration',
        'order': 4,
        'displayName': 'AVG Duration',
        "customComponent": AverageComponent
    },
    {
        'columnName': 'kills',
        'order': 5,
        'displayName': 'AVG Kills',
        "customComponent": AverageComponent
    },
    {
        'columnName': 'deaths',
        'order': 6,
        'displayName': 'AVG Deaths',
        "customComponent": AverageComponent
    },
    {
        'columnName': 'assists',
        'order': 7,
        'displayName': 'AVG Assists',
        "customComponent": AverageComponent
    },
    {
        'columnName': 'champLevel',
        'order': 8,
        'displayName': 'AVG Level',
        "customComponent": AverageComponent
    },
    {
        'columnName': 'goldEarned',
        'order': 9,
        'displayName': 'AVG Gold',
        "customComponent": AverageComponent
    }
];
