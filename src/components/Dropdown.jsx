import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'; 
import '../styles/Dropdown.scss';

const logout = require('../fetch-req/user/logout.js');

const Dropdown = (props) => {
    const history = useHistory();

    const arr = [
        {
            text: 'Logout', 
            action: () => {
                logout((data)=> {
                    if (data.success) {
                        history.go(0);
                    } else {
                        props.history.push('/404');
                    }
                })
            }
        },
    ];
    return (
        <div className='DROPDOWN'>
            {arr.map((item) => {
                return (
                    <div 
                        key={item.text}
                        className='DROPDOWN__ITEM'
                        onClick={item.action}
                    >
                        {item.text}
                    </div>
                );
            })}
        </div>
    );
}

export default withRouter(Dropdown);
