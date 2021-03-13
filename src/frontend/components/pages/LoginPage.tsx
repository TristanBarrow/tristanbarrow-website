import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Input from '../atomic/Input';
import Button from '../atomic/Button';
import { useTextInput } from '../../hooks/useTextInput';
import { usePasswordInput } from '../../hooks/usePasswordInput';
import { useLoginRequest } from '../../fetch-req/user/useLoginRequest';

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to top right, #333ad5, #338bd5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

/* 
$login-short: 25rem;
$login-long: $login-short * 1.618;

.PAGE {
    width: 100%;
    height: inherit;
    background-image: linear-gradient(
            to top right, 
            colors.$light-30,
            colors.$light
        );
    display: flex;
    align-items: center;
    justify-content: center;

}

.LOGIN {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30rem;
    background-color: white;
    padding: 3rem;

    &__TITLE {
        @include font.title_basic;
        margin-bottom: size.$small;
    }

    &__BUTTON {
        @include comp.button();
        @include comp.button_text();
        margin-bottom: size.$small;
    }

    &__INPUT {
        @include comp.input_main;
        margin-bottom: size.$small;
        padding-left: size.$xx-small;
    }

    &__LINK {
        @include comp.link_main;
        // margin-bottom: size.$small;
    }

    &__ERROR {
        color: red;
        font-size: size.$small;
        padding-bottom: size.$xx-small;
    }

}

*/
const LoginInput = styled(Input)`
    margin-bottom: 1.6rem; // small
    padding-left: .8rem; // xx small
`;


type LoginPageProps = {
    history: {
        push: (path: string) => void
    }
}

const LoginPage = (props: LoginPageProps) => {
    const {
        error,
        bindUsername,
        bindPassword,
        onLogin,
    } = useLoginPage();
    return (
            <Page>
                <div className='LOGIN'>
                    <div className='LOGIN__TITLE'>Login</div>
                    {!error.success && <div className='LOGIN__ERROR'>{error.message}</div>}
                    <LoginInput {...bindUsername} />
                    <LoginInput {...bindPassword} />
                    <button onClick={onLogin}>
                        Login
                    </button>
                    <Link 
                        className='LOGIN__LINK' 
                        to='/create_account'
                    >
                        Create Account
                    </Link>
                </div>
            </Page>
        );

        /* TODO: Forgot Password... 
            <Link className='LOGIN__FORGOT-PASSWORD'>Forgot Password</Link> 
        */
}

const useLoginPage = () => {
    const loginBinding = useLoginRequest();
    const { value:username, bind: bindUsername } = useTextInput('', 'Username');
    const { value:password, bind: bindPassword } = usePasswordInput('', 'Password');

    const [error, setError] = useState({success: true, message: null})
    const clearError = () => setError({success: true, message: null})

    const onLogin = () => {
        loginBinding.login(username, password);
    }

    return {
        error,
        bindUsername: {
            ...bindUsername,
            onFocus: clearError,
        },
        bindPassword: {
            ...bindPassword,
            onFocus: clearError,
        },
        onLogin,
        setError,
        clearError,
    }
}

export default withRouter(LoginPage);