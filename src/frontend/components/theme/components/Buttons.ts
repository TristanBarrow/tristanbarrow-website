import styled, { StyledComponent } from 'styled-components';

export type StyledButtonType = StyledComponent<'button', any, {}, never>;

const defaultButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: blue; // base color
    height: 2.8rem; // x large
    border: 0;
    border-radius: 3px;
    transition: .15s;

    :hover {
        background-color: blue; // hover color
        cursor: pointer;
        box-shadow: 0 2px 3px #888888;
        transform: translate(0, -2px);
        transition: .15s;
    } 

    :active {
        transform: translate(0, -1px);
        box-shadow: 0 1px 1px #888888;
        background-color: blue; // active color
    }

    :focus {
        border: 0;
        transition: .15s;
    }
    // font 
    font-family: Verdana, Geneva, Tahoma, sans-serif; // basic font
    font-size: 1.6rem; // small
    color: white;
    user-select: none;
    margin-bottom: 1.6rem; // small
`;

type ButtonTypesObj = {
    defaultButton: StyledButtonType
}

export const buttons: ButtonTypesObj = {
    defaultButton
}
