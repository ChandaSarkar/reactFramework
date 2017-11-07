/*export default class HomeModule {
    constructor() {
        this.name = "Home";
    }

    log() {
        alert(this.name);
    }
}*/

let Home = React.createClass({
    render: function() {
        return (
            <div>
                <Main name="Alex"/>
            </div>
        );
    }
});

let Main = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    Hello {this.props.name}!
                </div>
            </div>
        );
    }
});

module.exports = Home;

