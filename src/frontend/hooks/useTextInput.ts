import { useState } from 'react';

type Event = {
    target: { value: string } 
}

export type TextInputBinding = {
    type: 'text'
    value: string
    placeholder: string
    onChange: (event: Event) => void
}

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
        } as TextInputBinding
    }
}

