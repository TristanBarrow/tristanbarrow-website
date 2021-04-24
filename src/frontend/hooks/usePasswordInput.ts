import { useState } from 'react';

export const usePasswordInput = (initValue: string, placeholder: string) => {
    const [value, setValue] = useState(initValue);

    return {
        value,
        clear: () => setValue(''),
        bind: {
            type: 'password',
            value,
            placeholder,
            onChange: (event: { target: { value: string } }) => {
                setValue(event.target.value); 
            }
        }
    } 
}

