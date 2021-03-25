import React, { useState, useEffect } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { withRouter } from 'react-router-dom';
import '../styles/UserIcon.scss';

const getUser = require('../../requests/user/getUser.js');

const LOGIN = 'Login';

const UserIcon = (props) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(LOGIN);
    const [isAdmin, setIsAdminTo] = useState(false);
    const [isLoggedIn, setLoginStatusTo] = useState(false);
   
    
    useEffect(() => {
        // setLoading(true);
        getUser((data) => {
            if (data.success) {
                setUsername(data.user);
                setIsAdminTo(data.isAdmin);
                setLoginStatusTo(true);
            } else {
                setUsername(LOGIN);
                setIsAdminTo(false);
            }
            setLoading(false);
        });
    });


    if (loading) {
        return (
            <SyncLoader 
                css={{ margin: 10 }}
                size={7}
                color='#aaa'
                loading={loading}
            />
        );
    } else if (!isLoggedIn) {
            return (
                <div 
                    className={`USER_ICON`} 
                    onClick={() => props.history.push('/login')} 
                >
                    <Person className={`USER_ICON__ICON`} fontSize={'large'}/>
                    <div className={`USER_ICON__NAME`}>{username}</div>
                </div>
            );
    } else {
        const adminClass = isAdmin ? '--ADMIN' : '';
        return (
            <div 
                className={`USER_ICON${adminClass}`} 
                onClick={props.onClick} 
                onBlur={props.onBlur}
                tabIndex={props.tabIndex}
            >
                <Person className={`USER_ICON__ICON${adminClass}`} fontSize={'large'}/>
                <div className={`USER_ICON__NAME${adminClass}`}>{username}</div>
            </div>
        );
    }
    
}

export default withRouter(UserIcon);