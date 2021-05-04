import React from 'react';

type ListInputProps = {
    value: string | null
    list: string[]
    noValuePlaceholder?: string
}

const ListInput = ({
    value,
    list,
    noValuePlaceholder = '--',
}: ListInputProps) => {

    return (
        <div>
            <div>{value === null ? noValuePlaceholder : value}</div>
            <div>
                {list.map(item => (
                    <div>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListInput;