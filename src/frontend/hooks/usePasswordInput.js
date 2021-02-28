import { useState } from 'react';


export const usePasswordInput = (initValue, placeholder) => {
    const [value, setValue] = useState(initValue);

    return {
        value,
        clear: () => setValue(''),
        bind: {
            type: 'password',
            value,
            placeholder,
            onChange: event => {
                setValue(event.target.value)
            }
        }
    } 
}

