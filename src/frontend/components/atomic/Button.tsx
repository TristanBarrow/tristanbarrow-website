import React from 'react';
import { buttons, StyledButtonType } from '../theme/components/Buttons';
import styled, { StyledComponent } from 'styled-components';

enum ButtonType {
    DEFAULT = 'DEFAULT'    
}

type ButtonProps = {
    type: ButtonType
    text: string
}

const Button = ({
    type,
    text,
}: ButtonProps) => {
    let StyledButton: StyledButtonType = getButtonStyle(type);
    return (
        <StyledButton>{text}</StyledButton>
    ) 
}

const getButtonStyle = (type: ButtonType) => {
    switch(type) {
        case ButtonType.DEFAULT: 
            return buttons.defaultButton;
        default:
            return buttons.defaultButton;
    }
}


export default Button;