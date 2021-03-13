import React from 'react';
import styled, { withTheme } from 'styled-components';

import Icon, { IconType } from '../atomic/Icon';
import { useUserStatus } from '../../hooks/network/useUserStatus';
import ErrorBoundary from '../boundaries/ErrorBoundary';
import LoadingBoundary from '../boundaries/LoadingBoundary';
import { Link } from 'react-router-dom';

export type UserStatusTheme = {
    linkColor: string
}

type CompType = {
    theme: UserStatusTheme
}


const Container = styled.div`

`;

type UserStatusProps = {
    theme: UserStatusTheme
}

const UserStatus = ({ theme }: UserStatusProps) => {
    const { isLoading, error, data } = useUserStatus();

    if (isLoading) return <LoadingBoundary />;
    if (error) return <ErrorBoundary error={error} />

    return (
        <Container>
            <Link to='/login' />
            {data.success ? (
                <div></div>
            ) : (
                <Icon icon={IconType.PROFILE} color={theme.linkColor} />
            )}
        </Container>
    );
}

export default withTheme(UserStatus); 