import { useState } from 'react';

export const useTextInput = (initValue, placeholder) => {
    const [value, setValue] = useState(initValue);
    return {
        value,
        clear: () => setValue(''),
        bind: {
            type: 'text',
            value,
            placeholder,
            onChange: event => {
                setValue(event.target.value)
            }
        }
    }
}

