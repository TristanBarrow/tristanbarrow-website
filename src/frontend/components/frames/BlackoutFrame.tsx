import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,.5);
`;

const ContentContainer = styled.div`
    opacity: 1;
`;

type GradientBackgroundFrameProps = {
    children: ReactChild | ReactChildren | null
}

const BlackoutFrame = (props: GradientBackgroundFrameProps) => {
    return (
        <Container>
            <ContentContainer>
                {props.children}
            </ContentContainer>
        </Container>
    )
}

export default BlackoutFrame;