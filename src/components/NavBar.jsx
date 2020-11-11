import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from './UserIcon.jsx';
import '../styles/NavBar.scss';
import Dropdown from './Dropdown.jsx';

const links = {
    home: 'Home',
    blog: 'Blog',
    resume: 'Resume'
}

const dropdown = {
    LOGOUT: 'Logout',
    PROFILE_INFO: 'Profile Info',

}

const NavBar = (props) => {
    const [isShowingDropdown, showDropdown] = useState(false);
    
    return (
        <div className='NAV_BAR'>
            {Object.keys(links).map(link => {
                const selected = props.selected === link ? ' NAV_BAR__LINK--SELECTED' : '';

                if (link === 'home') {
                    return (
                        <Link
                            key={link}
                            className={`NAV_BAR__LINK${selected}`} 
                            to='/'
                        >
                            Home
                        </Link>
                    );
                }
                return (
                    <Link 
                        key={link}
                        className={`NAV_BAR__LINK${selected}`}
                        to={`/${link}`}
                    >
                        {links[link]}
                    </Link>
                );
            })}
            
            <UserIcon 
                tabIndex='0' 
                onBlur={()=> setTimeout(() => showDropdown(false), 200)} 
                    // this setTimout() allows the dropdown to be clicked. 
                    // Without it on blur will stop showing the dropdown before 
                    // the click registers
                onClick={() => showDropdown(true)}
            />

            {isShowingDropdown && <Dropdown />}
        </div>
    );
}

export default NavBar;