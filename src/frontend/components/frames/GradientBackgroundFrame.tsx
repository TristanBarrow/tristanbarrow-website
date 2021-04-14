import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to top right, #333ad5, #338bd5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

type GradientBackgroundFrameProps = {
    children: ReactChild | ReactChildren | null
}

const GradientBackgroundFrame = (props: GradientBackgroundFrameProps) => {
    return (
        <Container> 
            {props.children}
        </Container>
    )
}

export default GradientBackgroundFrame;