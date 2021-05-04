import React from 'react';
import { useWorkoutsData } from '../../requests/gen/workout/useWorkoutsData';
import { UpdateWorkoutRequest } from '../../../types/network/gen/workout';
import Link from '../atomic/Link';
import styled from 'styled-components';
import ErrorBoundary from '../boundaries/ErrorBoundary';
import { useUserStatus } from '../../hooks/network/useUserStatus';
import { useCreateWorkout } from '../../requests/gen/workout/useCreateWorkout';
import ButtonModal, { useWithButtonModal } from '../cellular/ButtonModal';

const Container = styled.div`
    font-family: sans-serif;
    padding-top: 1.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
`;

const WorkoutManagerPage = () => {
    const modal = useWithButtonModal({ 
        message: 'hello modal',
        buttons: [{
            text: 'Add Workout',
            action: () => {modal.close()}
        }]
    }); 
    const {isSuccess: userIsSuccess, data: userData } = useUserStatus();
    const { isSuccess, data, isError, error } = useWorkoutsData();
    if (userIsSuccess) console.log(userData.isAdmin);
    if (isError) return <ErrorBoundary error={{success: false, message: JSON.stringify(error)}} />
    if (data && data.error) return <ErrorBoundary error={data.error} />
    const workouts: UpdateWorkoutRequest[] = isSuccess ? [] : [];

    return (
        <Container>
            <Header>
                <div>Your Workouts</div>
                {userIsSuccess && userData.isAdmin && (
                    <Link to='/edit_exercise'>Add Exercises</Link>
                )}
                <button onClick={modal.open}>Add Workout</button>
            </Header>
            {workouts.length === 0 && <div>No Workouts</div>}
            {workouts.map((workout) => (
                <div>
                    {`${workout.date} ${workout.workout_type}`}
                </div>
            ))}
            <ButtonModal {...modal.bind} />
        </Container>
    );
}

export default WorkoutManagerPage;