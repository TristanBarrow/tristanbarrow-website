import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';
import UserStatus from './UserStatus';

export type SiteHeaderTheme = {
    linkColor: string
    textSize: string
    headerBackgroundColor: string
    font: string
}

type CompType = {
    theme: SiteHeaderTheme
}

const DEFAULT_THEME = {
    theme: {
        linkColor: 'black',
        textSize: '1.6rem',
        font: 'sans-serif',
        headerBackgroundColor: 'lightgray'
    } as SiteHeaderTheme
}

const Container = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 5rem;
    background-color: ${(props: CompType) => props.theme.headerBackgroundColor};
    padding-right: 4rem;
    padding-left: 4rem;
    // TODO: add media queries for shrinking bar
`;

const ExternalLinks = styled.div`
    display: flex;
    flex-direction: row;
`;

const InternalLinks = styled.div``;


const linkStyle = css`
    font-size: ${(props: CompType) => props.theme.textSize};
    color: ${(props: CompType) => props.theme.linkColor};
    font-family: ${(props: CompType) => props.theme.font};
    padding-left: 2rem;
    padding-right: 2rem;
    text-decoration: none;
    // TODO: add responsive design

`;

const UserStatusWrapper = styled.div`
    margin-left: 2.5rem;
`;

const Link = styled(RouterLink)`
    ${linkStyle}
`;
Link.defaultProps = DEFAULT_THEME;

const A = styled.a`
    ${linkStyle}
`;
A.defaultProps = DEFAULT_THEME;

enum LinkType {
    EXTERNAL = 'EXTERNAL',
    INTERNAL = 'INTERNAL',
}

type HeaderLink = {
    type: LinkType
    ref: string
    text: string
    shouldShow: boolean
}

const links: HeaderLink[] = [
    {
        text: 'LinkedIn',
        ref: 'https://www.linkedin.com/in/tristanmbarrow',
        type: LinkType.EXTERNAL,
        shouldShow: true,
    },
    {
        text: 'GitHub',
        ref: 'https://github.com/TristanBarrow',
        type: LinkType.EXTERNAL,
        shouldShow: true,
    },
];

// links

// home logo?
// courses
// blog
// projects
// resume
// linked-in
// github

type SiteHeaderProps = {
    themeSetter: ReactNode
}

const SiteHeader = (props: SiteHeaderProps) => {
    return (
        <Container>
            <Link to='/home'>Home</Link>
            <InternalLinks>
                <Link to='/courses'>Courses</Link>
                <Link to='/blog'>Blog</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/resume'>Resume</Link>
            </InternalLinks>
            <ExternalLinks>
                <A href='https://www.linkedin.com/in/tristanmbarrow'>LinkedIn</A>
                <A href='https://github.com/TristanBarrow'>GitHub</A>
                {props.themeSetter}
                <UserStatusWrapper>
                    <UserStatus />
                </UserStatusWrapper>
            </ExternalLinks>
        </Container> 
    );
}

export default SiteHeader;