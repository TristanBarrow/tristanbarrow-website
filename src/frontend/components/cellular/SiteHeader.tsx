import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import Link from '../atomic/Link';
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

const UserStatusWrapper = styled.div`
    margin-left: 2.5rem;
`;

type HeaderLink = {
    isExternal: boolean
    ref: string
    text: string
    shouldShow: boolean
}

const links: HeaderLink[] = [
    {
        text: 'LinkedIn',
        ref: 'https://www.linkedin.com/in/tristanmbarrow',
        isExternal: true,
        shouldShow: true,
    },
    {
        text: 'GitHub',
        ref: 'https://github.com/TristanBarrow',
        isExternal: true,
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
                <Link to='https://www.linkedin.com/in/tristanmbarrow' isExternal >LinkedIn</Link>
                <Link to='https://github.com/TristanBarrow' isExternal >GitHub</Link>
                {props.themeSetter}
                <UserStatusWrapper>
                    <UserStatus />
                </UserStatusWrapper>
            </ExternalLinks>
        </Container> 
    );
}

export default SiteHeader;