import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTextInput, usePasswordInput } from '../hooks/input.js';
import { withRouter } from 'react-router-dom';
import '../styles/Login.scss';

const createUser = require('../fetch-req/user/createUser.js');

const CreateAccount = (props) => {
    const { value:username, bind: bindUsername, clear:clearUsername } = useTextInput('', 'Username');
    const { value:password, bind: bindPassword, clear:clearPassword } = usePasswordInput('', 'Password');
    const { value:secondPass, bind: bindSecondPass, clear:clearSecondPass } = usePasswordInput('', 'Retype Password');

    const [error, setError] = useState({success: true, message: null})

    const onCreateAccount = () => {
        if (username === '' || password === '' || secondPass === '') {
            setError({
                success: false, 
                message: 'You are missing a field'
            });
        } else if (password !== secondPass) {
            setError({
                success: false, 
                message: 'The passwords provided do not match'
            });
        } else {
            createUser(username, password, (data) => {
                if (!data.success) {
                    setError(data);
                } else {
                    props.history.push('/home');
                }
                console.log(data)
            })
        }
    }

    return (
        <div className='PAGE'>
            <div className='LOGIN'>
            <div className='LOGIN__TITLE'>Create Account</div>
                {!error.success && <div className='LOGIN__ERROR'>{error.message}</div>}
                <input 
                    className='LOGIN__INPUT'
                    {...bindUsername}
                />
                <input 
                    className='LOGIN__INPUT'
                    {...bindPassword}
                />
                <input 
                    className='LOGIN__INPUT'
                    {...bindSecondPass}
                />
                <button 
                    className={'LOGIN__BUTTON'} 
                    onClick={onCreateAccount}
                >
                    Create Account
                </button>
                <Link 
                    className='LOGIN__LINK' 
                    to='/login'
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );    
}

export default withRouter(CreateAccount);