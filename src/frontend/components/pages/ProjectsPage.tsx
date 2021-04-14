import React from 'react';
import styled from 'styled-components';
import Link from '../atomic/Link';

const Container = styled.div`
    font-size: 1.6rem;

`;

const ProjectsPage = () => {
    return (
        <Container>
            <Link to='/todos'>Todo's</Link>
        </Container>
    );
}

export default ProjectsPage;