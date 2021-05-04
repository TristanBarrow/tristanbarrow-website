import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 15rem;
    height: 20px;
    position: relative;
    border: 1px solid black;
    border-radius: 3px;
    color: black;
`;

const Value = styled.div`
    position: relative;
`;

const Options = styled.div`
    background-color: white;
    border: 1px solid gray;
    position: absolute;
    max-height: 40rem;
    width: 15rem;
    overflow-y: scroll;
`;

const Option = styled.div`
    width: inherit;

`;

type DropdownProps<T> = {
    options: T[]
    value: T
    placeholder?: string
    onFocus?: () => void
    resolve: (arg: T | null) => { key: string, name: string }
    setValue: (value: T | null) => void
}

const Dropdown = <T extends unknown>({
    options,
    value,
    placeholder = '--',
    setValue,
    resolve,
    onFocus = () => {},
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const setVal = (value: T | null) => {
        setValue(value);
        setIsOpen(false);
    }

    return (
        <Container tabIndex={0} onFocus={onFocus} onBlur={() => setIsOpen(false)}>
            <Value onClick={() => setIsOpen(!isOpen)}>{resolve(value).name}</Value>
            {isOpen && (
                <Options>
                    <Option onClick={() => setVal(null)}>
                        {placeholder}
                    </Option>
                    {options.map((option: T) => {
                        const { key, name } = resolve(option);
                        return (
                            <Option key={key} onClick={() => setVal(option)}>
                                {name}
                            </Option>
                        );
                    })}
                </Options>
            )}
        </Container>
    );
}

type UseWithDropdownArgs<T> = {
    options: T[]
    placeholder?: string
    resolve: (arg: T | null) => { key: string, name: string }
}

export const useWithDropdown = <T extends unknown>({
    options,
    placeholder = '--',
    resolve,
}: UseWithDropdownArgs<T>): UseWithDropdownBinding<T> => {
    const [value, setValue] = useState<T | null>(null);
    const stringValue = value !== null ? resolve(value).name : placeholder;
    const clear = () => setValue(null);
    return {
        value,
        stringValue,
        clear,
        bind: {
            placeholder,
            value,
            options,
            resolve,
            setValue,
        }
    }

}

type UseWithDropdownBinding<T> = {
    value: T
    clear: () => void
    stringValue: string
    bind: DropdownProps<T>
}

export default Dropdown;