import React from 'react';
import styled from 'styled-components';
import Link from '../atomic/Link';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.6rem;

`;

const ProjectLink = styled.div`
    background-color: darkgray;
    border-radius: .5rem;
    padding: 1rem; 
    margin: 1rem;
`;

const ProjectsPage = () => {
    return (
        <Container>
            <ProjectLink>
                <Link to='/todos'>Todo's</Link>
            </ProjectLink>
            <ProjectLink>
                <Link to='/workout_manager'>Workout Manager</Link>
            </ProjectLink>
        </Container>
    );
}

export default ProjectsPage;