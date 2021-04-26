import React from 'react';

export default class SenorDetail extends React.Component {
    render() {
        let cpt = 0;
        const tab = this.props.sensor.values.slice().reverse();
        return(
            <div className="App-sensor-detail">
                <div className="name">
                    <h3>{this.props.sensor.name}</h3>
                </div>
                <div className="val">
                    <h3>Valeur actuelle :</h3>
                    {tab.shift()}
                </div>
                <div className="hist">
                    <h3>Historique :</h3>
                    <ul>
                        {tab.map(value => (
                            <li key={cpt++}>{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
