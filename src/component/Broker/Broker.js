import React from 'react';

export default class Broker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'ws://random.pigne.org:9001'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.chargerUrlBroker(this.state.url);
    }

    handleInputChange(event) {
        this.setState({ url: event.target.value });
        this.props.chargerUrlBroker(this.state.url);
    }

    render() {
        return(
            <div className="App-url-broker">
                <h3>URL du Broker : </h3>
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.state.url}
                               onChange={this.handleInputChange}
                               type="text"
                               placeholder="Broker address" />
                    </form>
            </div>
        );
    }
}
