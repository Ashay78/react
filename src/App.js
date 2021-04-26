import React from 'react';
import Broker from './component/Broker/Broker';
import SensorDetail from './component/SensorDetail/SensorDetail';
import './App.css';
import mqtt from "mqtt";
import {BrowserRouter, Link, Route} from "react-router-dom";

class Sensor {
    constructor(id, name, value, type) {
        this.id = id;
        this.name = name;
        this.values = [value];
        this.type = type;
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            client: null,
            sensors: []
        };

        this.chargerUrlBroker = this.chargerUrlBroker.bind(this);
    }


    chargerUrlBroker(url) {

        if(this.state.client) {
            this.state.client.end();
        }

        try {
        const client = mqtt.connect(url);

        client.on("connect", () => {
            client.subscribe("value/#", () => {
            });
        });

        client.on("message", (topic, message) => {
            const id = topic.substring(6);

            const objSensor = JSON.parse(message.toString());

            const sensorFind = this.state.sensors.find(element => element.id === id);
            if (sensorFind === undefined) {
                this.state.sensors.push(new Sensor(id, objSensor.name, objSensor.value, objSensor.type));
                this.setState({sensors: this.state.sensors});
            } else {
                sensorFind.values.push(objSensor.value);
                this.setState({sensors: this.state.sensors});
            }
            this.setState({client: client});
        });
        } catch (e) {
            console.log("erreur")
        }
    }


    render() {
        const listItems = this.state.sensors.map((sensor) =>
            <li className="elem" key={sensor.id}>
                <Link to={"/"+sensor.name} >{sensor.name}</Link>
            </li>
        );
        return (<div className="App">
            <header>coucou</header>
            <body>
            <Broker chargerUrlBroker={this.chargerUrlBroker}/>
            <BrowserRouter>
            {listItems}
                <Route path={`/:name`}  render={({match}) => (
                    <SensorDetail sensor={this.state.sensors.find(sens => sens.name === match.params.name)} />
                )}/>
            </BrowserRouter>
            </body>
        </div>)
    };
}
