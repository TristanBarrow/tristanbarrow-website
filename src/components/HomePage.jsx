import React from 'react';
import NavBar from './NavBar.jsx';
import HomePageRow from './HomePageRow.jsx';

const HomePage = (props) => {
    return (
        <div>
            <NavBar selected='home'/>
            <HomePageRow />
        </div>
    );
}

export default HomePage;