import React from 'react';
import Broker from './component/Broker/Broker';
import SensorDetail from './component/SensorDetail/SensorDetail';
import './App.css';
import mqtt from "mqtt";
import {BrowserRouter, Link} from "react-router-dom";

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
        const client = mqtt.connect(url, {
            reconnectPeriod: 0,
            connectTimeout: 1000,
        });

        if (this.state.client) {
            this.state.client.end();
        }
        this.setState({client: client, err: false, sensors: []});
        client.on("connect", () => {
            client.subscribe("value/#", () => {
                console.log("subscribing...");
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
        });
    }


    render() {
        const listItems = this.state.sensors.map((sensor) =>
            <li className="elem" key={sensor.id}>
                <Link to={"/"+sensor.name.replace(/ /g, "_").toLowerCase()} >{sensor.name}</Link>
            </li>
        );
        return (<div className="App">
            <header>coucou</header>
            <body>
            <Broker chargerUrlBroker={this.chargerUrlBroker}/>
            <BrowserRouter>
            {listItems}
            </BrowserRouter>
            <SensorDetail sensors={this.state.sensors}/>
            </body>
        </div>)
    };
}
