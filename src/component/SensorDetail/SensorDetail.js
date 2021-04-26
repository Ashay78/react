import React from 'react';

export default class SenorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor: null
        };
        console.log("les props")
        console.log(props)
    }

    render() {
        return <p>oui</p>;
    }
}
