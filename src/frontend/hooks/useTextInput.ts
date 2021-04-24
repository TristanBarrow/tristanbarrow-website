import { useState } from 'react';

export const useTextInput = (initValue: string, placeholder: string = '') => {
    const [value, setValue] = useState(initValue);
    return {
        value,
        clear: () => setValue(''),
        bind: {
            type: 'text',
            value,
            placeholder,
            onChange: (event: { target: { value: string } }) => {
                setValue(event.target.value);
            }
        }
    }
}

