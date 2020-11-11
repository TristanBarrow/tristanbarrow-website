import React from 'react';
import Resume from './Resume.jsx';
import Scriptures from './Scriptures.jsx';
import HomePage from './HomePage.jsx';
import Page404 from './Page404.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import '../styles/App.scss';
import Login from './Login.jsx';
import CreateAccount from './CreateAccount.jsx';

const App = {
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
                    <Route path='/s'>
                        <Scriptures />
                    </Route>
                    <Route path='/404'>
                        <Page404 />
                    </Route>
                    <Route path='/home'>
                        <HomePage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;