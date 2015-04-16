var React = require("react");
import {championNames, toTitleCase} from '../const.js';

var Champion = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    statics: {
        willTransitionTo : function(transition, params) {
            if (championNames.hasOwnProperty(toTitleCase(params.champion))) {
                return;
            } else {
                transition.redirect('champions');
            }
        }
    },
    render: function() {
        return <div>
            <h2>Champion</h2>
            <h3>{this.context.router.getCurrentParams().champion}</h3>
        </div>;
    }
});
module.exports = Champion;
