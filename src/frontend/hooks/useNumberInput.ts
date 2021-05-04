import { ChangeEventHandler, useState } from 'react';

export type TextInputBinding = {
    type: 'number'
    value: number
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const useNumberInput = (initValue: number) => {
    const [value, setValue] = useState(initValue);
    return {
        value,
        clear: () => setValue(0),
        bind: {
            type: 'number',
            value,
            onChange: (event) => {
                setValue(parseFloat(event.target.value));
            }
        } as TextInputBinding
    }
}

