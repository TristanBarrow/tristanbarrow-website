import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export type SiteHeaderTheme = {
    linkColor: string
    linkHoverColor: string
    textSize: string
    font: string
}

type CompType = {
    theme: SiteHeaderTheme
}

const DEFAULT_THEME = {
    theme: {
        linkColor: '#338bd5',
        linkHoverColor: '#333ad5',
        textSize: '1.6rem',
        font: 'sans-serif',
    } as SiteHeaderTheme
}

const linkStyle = css`
    font-size: ${(props: CompType) => {console.log(props);return props.theme.textSize}};
    font-family: ${(props: CompType) => props.theme.font};
    padding-left: 2rem;
    padding-right: 2rem;
    text-decoration: none;
    color: ${(props: CompType) => props.theme.linkColor};

    :hover {
        color: ${(props: CompType) => props.theme.linkHoverColor};
    }

    // TODO: add responsive design

`;

export const _Link = styled(RouterLink)`
    ${linkStyle}
`;
_Link.defaultProps = DEFAULT_THEME;

export const A = styled.a`
    ${linkStyle}
`;
A.defaultProps = DEFAULT_THEME;

type LinkProps = {
    to: string
    isExternal?: boolean
    children: string
}

const Link = ({
    to,
    children,
    isExternal = false
}: LinkProps) => {
    if (!isExternal && to.substring(0,4) === 'http') {
        throw new Error('You Cannot use http with an internal link')
    }
    return (
        <>
            {isExternal && <A href={to}>{children}</A>}
            {!isExternal && <_Link to={to}>{children}</_Link>}
        </>
    );
}

export default Link;