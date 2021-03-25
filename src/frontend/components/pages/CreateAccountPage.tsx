import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTextInput } from '../../hooks/useTextInput';
import { usePasswordInput } from '../../hooks/usePasswordInput'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/Login.scss';
import createUser from '../../requests/user/createUser';

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to top right, #333ad5, #338bd5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

type CreateAccountProps = {
    history: {
        push: (url: string) => void 
    }
}

const CreateAccount = (props: CreateAccountProps) => {
    const { value:username, bind: bindUsername } = useTextInput('', 'Username');
    const { value:password, bind: bindPassword } = usePasswordInput('', 'Password');
    const { value:secondPass, bind: bindSecondPass } = usePasswordInput('', 'Retype Password');

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
            createUser(username, password, (data: any) => {
                if (!data.success) {
                    setError(data);
                } else {
                    props.history.push('/home');
                }
            })
        }
    }

    return (
        <Page>
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
        </Page>
    );    
}

export default withRouter(CreateAccount);