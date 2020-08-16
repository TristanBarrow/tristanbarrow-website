import React, { Component } from 'react';
import Resume from './Resume.jsx';
import Sciptures from './Scriptures.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import '../styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename='/app'>
                <Switch>
                    <Route path='/resume'>
                        <Resume />
                    </Route>
                    {/* <Route path='/scriptures'>
                        <Sciptures />
                    </Route> */}
                    <Route path='/'>
                        <div>home</div>
                    </Route>
                </Switch>
            </Router>
            
        );
    }
}

export default App;