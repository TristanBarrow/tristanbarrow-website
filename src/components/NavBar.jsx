import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';

const links = {
    home: 'Home',
    blog: 'Blog',
    resume: 'Resume'
}

const NavBar = (props) => {
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
            {/* 
            <Link className='NAV_BAR__LINK' to='/blog'>Blog</Link>
            <Link className='NAV_BAR__LINK' to='/resume'>Resume</Link> */}
        </div>
    );
}

export default NavBar;