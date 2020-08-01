import React from 'react';

const LabeledText = (props) => {
    return (
        <div className={props.className}>
            <span className={`${props.className}--LABEL`}>
                {props.label} 
            </span>
            {props.value}
        </div>
    );
}

export default LabeledText;