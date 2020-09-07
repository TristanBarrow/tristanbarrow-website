import React, { Component } from 'react';
import Resume from './Resume.jsx';
import Sciptures from './Scriptures.jsx';
import HomePage from './HomePage.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import '../styles/App.scss';
import Login from './Login.jsx';
import CreateAccount from './CreateAccount.jsx';

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
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/create_account'>
                        <CreateAccount />
                    </Route>
                    <Route path='/home'>
                        <HomePage />
                    </Route>
                    <Route>
                        <Resume />
                    </Route>
                </Switch>
            </Router>
            
        );
    }
}

export default App;