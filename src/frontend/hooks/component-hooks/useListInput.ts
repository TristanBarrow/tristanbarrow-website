import { useState } from 'react';

type UseListInputArgs = {
    list: string[]
    noValuePlaceholder?: string
}

export const useListInput = ({
    list,
    noValuePlaceholder = '--',
}: UseListInputArgs) => {
    const [value, setValueTo] = useState<string | null>(null); 

    const clear = () => {
        setValue(null);
    }

    const setValue = (value: string | null) => {
        if (value === null) { clear(); return; }
        if (!list.includes(value)) {
            console.error('Error: value was not found in the list in hook "useListInput"');
            return;
        }
        setValueTo(value);
    }

    return {
        value,
        binding: {
            list,
            value,
            noValuePlaceholder,
        },
        clear,
        setValue,
    }
}