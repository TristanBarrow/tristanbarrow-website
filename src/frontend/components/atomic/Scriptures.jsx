import React, { Component } from 'react';
import ScriptureList from './ScriptureList.jsx';
const getKeys = require('../../fetch-req/scriptures/getScriptureData.js');

class Scriptures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    
    componentDidMount() {
        getKeys((list) => {
            this.setState({ list });
        });
    }

    render() {
        return (
            <div>
                <ScriptureList />
            </div>
        );
    }
}

export default Scriptures;