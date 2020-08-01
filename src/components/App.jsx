import React, { Component } from 'react';
import Resume from './Resume.jsx';
import '../styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Resume />
            
        );
    }
}

export default App;