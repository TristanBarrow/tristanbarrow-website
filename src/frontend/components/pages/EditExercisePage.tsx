import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import jsonParser from '../../../backend/middleware/jsonParser';
import { UpdateExerciseRequest } from '../../../types/network/gen/exercise';
import { useTextInput } from '../../hooks/useTextInput';
import { useCreateExercise } from '../../requests/gen/exercise/useCreateExercise';
import { useExercisesData } from '../../requests/gen/exercise/useExercisesData';
import LoadingBoundary from '../boundaries/LoadingBoundary';

const Container = styled.div`
    font-family: sans-serif;
    padding: 3rem;
`;

const ExerciseForm = styled.div`

`;

const Title = styled.div`
    font-size: 2rem;
`;

const EditExercisePage = () => {
    const { isSuccess, data, isLoading, refetch } = useExercisesData();
    const createExercise = useCreateExercise();
    const [canDisplayMessage, setCanDisplayMessage] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const name = useTextInput('');
    const description = useTextInput('');
    
    useEffect(() => {
        if (createExercise.isFetched === true) {
            refetch();
            name.clear();
            description.clear();
        }
    }, [createExercise.isFetched]);

    const onAdd = () => {
        if (name.value === '' || description.value === '') {
            setHasError(true);
            return;
        }
        createExercise.makeRequest({
            name: name.value,
            description: description.value
        });
    } 

    const clearMessages = () => {
        setCanDisplayMessage(false);
        setHasError(false);
    }
    
    if (isLoading) return <LoadingBoundary />
    return (
        <Container>
            <Title>Exercises:</Title>
            {isSuccess && data.map((exercise: UpdateExerciseRequest) => {
                return <div key={exercise.id}>{`${exercise.name}: ${exercise.description}`}</div>
            })}
            <ExerciseForm>
                <input onFocus={clearMessages} {...name.bind} />
                <input onFocus={clearMessages} {...description.bind} />
                <button onClick={onAdd}>Add</button>
            </ExerciseForm>
            {hasError && <div style={{ color: 'red' }}>Invalid data</div>}
            {canDisplayMessage && <div>Success!</div>}
        </Container>
    );
}

export default EditExercisePage;