import React from 'react';

const LabeledLink = (props) => {
    return (
        <div className={props.className}>
            <span className={`${props.className}--LABEL`}>
                {props.label} 
            </span>
            <a href={props.link}>    
                {props.value}
            </a>
        </div>
    );
}

export default LabeledLink;