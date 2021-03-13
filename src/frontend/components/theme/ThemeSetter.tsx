import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';

import { 
    ThemeSetter as ThemeSetterType,
    ThemeType,
    getThemeType,
    ThemeStringType
} from './ThemeType';
import Icon, { IconType } from '../atomic/Icon';

export type ThemeSetterTheme = {
    linkColor: string
    textSize: string
    font: string
}

type CompType = {
    theme: ThemeSetterTheme
}

const DEFAULT_THEME = {
    theme: {
        linkColor: 'black',
        textSize: '1.6rem',
        font: 'sans-serif',
    } as ThemeSetterTheme
}

const Container = styled.div`
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    border: 1px solid black;
    border-radius: 4px;
    padding-left: 1rem;
    padding-right: 3rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    background-color: white;

`;

const ThemeButton = styled.div`
    font-size: ${(props: CompType) => props.theme.textSize};
    font-family: ${(props: CompType) => props.theme.font};
    padding-top: .5rem;
    padding-bottom: .5rem;
    :hover {
        cursor: pointer;
    }
`;
ThemeButton.defaultProps = DEFAULT_THEME;

type ThemeSetterProps = {
    setTheme: ThemeSetterType
    theme: ThemeSetterTheme
}

const ThemeSetter = ({
    setTheme,
    theme = DEFAULT_THEME.theme,
}: ThemeSetterProps) => {
    const [isHovered, setIsHoveredTo] = useState(false);
    const onSetTheme = (themeString: ThemeStringType) => {
        setTheme(getThemeType(themeString))
    }

    return (
        <Container
            onMouseEnter={() => setIsHoveredTo(true)}
            onMouseLeave={() => setIsHoveredTo(false)}
        >
            <Icon icon={IconType.THEME} color={theme.linkColor}/>
            {isHovered && (
                <ButtonContainer>
                    {Object.values(ThemeType).map((themeString: string) => {
                        return (
                            <ThemeButton
                                key={themeString}
                                onClick={() => onSetTheme(themeString as ThemeStringType)}
                            >
                                {themeString}
                            </ThemeButton>
                        );
                    })}
                </ButtonContainer>
            )}
        </Container>
    )
}

export default withTheme(ThemeSetter);