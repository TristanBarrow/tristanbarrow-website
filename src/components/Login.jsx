import React, { useState } from 'react';
import { useTextInput, usePasswordInput } from '../hooks/input.js';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';

const login = require('../fetch-req/user/login.js');

const Login = (props) => {
    const { value:username, bind: bindUsername, clear:clearUsername } = useTextInput('', 'Username');
    const { value:password, bind: bindPassword, clear:clearPassword } = usePasswordInput('', 'Password');

    const [error, setError] = useState({success: true, message: null})
    const clearError = () => setError({success: true, message: null})
    const onLogin = () => {
        if (username !== '' && password !== '') {
            login(username, password, (data) => {
                if (!data.success) {
                    setError(data)
                } else {

                }
            })
        } else {
            setError({
                success: false, 
                message: 'You are missing either Username or Password'
            });
        }

    }

    return (
            <div className='PAGE'>
                <div className='LOGIN'>
                    <div className='LOGIN__TITLE'>Login</div>
                    {!error.success && <div className='LOGIN__ERROR'>{error.message}</div>}
                    <input className='LOGIN__INPUT' onFocus={clearError} {...bindUsername} />
                    <input className='LOGIN__INPUT' onFocus={clearError} {...bindPassword} />
                    <button 
                        className={'LOGIN__BUTTON'} 
                        onClick={onLogin}
                    >
                        Login
                    </button>
                    <Link 
                        className='LOGIN__LINK' 
                        to='/create_account'
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        );

        /* TODO: Forgot Password... 
            <Link className='LOGIN__FORGOT-PASSWORD'>Forgot Password</Link> 
        */


    
}

export default Login;