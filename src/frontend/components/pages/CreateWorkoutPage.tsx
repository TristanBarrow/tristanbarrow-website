import React, { useState } from 'react';
import styled from 'styled-components';
import { UpdateExerciseRequest } from '../../../types/network/gen/exercise';
import { useNumberInput } from '../../hooks/useNumberInput';
import { useExercisesData } from '../../requests/gen/exercise/useExercisesData';
import Icon, { IconType } from '../atomic/Icon';
import Link from '../atomic/Link';
import ButtonModal, { useWithButtonModal } from '../cellular/ButtonModal';
import Dropdown, { useWithDropdown } from '../molecular/Dropdown';

const Container = styled.div`
    font-family: sans-serif;
    padding: 2rem;
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;    

`;

const CancelLink = styled.div``;
const SaveLink = styled.div``;

const Workout = styled.table`
    width: 100%;
    padding: .5rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border: 1px solid black;
    border-bottom: none;
`;

const WorkoutRow = styled.tr`

`;

const WorkoutHeader = styled.th`

`;

const AddExercise = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: lightblue;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border: 1px solid black;
    border-top: none; 
    transition: all .3s;
    :hover {
        background-color: lightgray;
    }
`;

const ExerciseForm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: lightblue;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border-left: 1px solid black;
    border-right: 1px solid black;

`;

const Exercise = styled.td`
    width: 14rem;
    text-align: left;
`;

const Resistance = styled.td`
    text-align: center;
`;

const Reps = styled.td`
    text-align: center;
`;

const Separator = styled.td`
    text-align: center;
`;

const ErrorMessage = styled.div`
    color: red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border-left: 1px solid black;
    border-right: 1px solid black;
`;

type WorkoutSet = {
    order: number
    exercise: string
    resistance: number
    reps: number
}

const CreateWorkoutPage = () => {
    const { isSuccess, data } = useExercisesData();
    const dropdown = useWithDropdown<UpdateExerciseRequest>({
        options: isSuccess ? data : [],
        placeholder: isSuccess ? '--' : 'Loading...',
        resolve: (arg: UpdateExerciseRequest | null) => {
            if (arg === null) return {key: '0', name: '--'}
            return ({
                key: `${arg.id}`,
                name: arg.name,
            })
        }
    });
    const [hasError, setHasError] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [isAdding, setIsAddingTo] = useState<boolean>(false);
    const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);
    const resistanceInput = useNumberInput(0);
    const repsInput = useNumberInput(0);
    let lastExercise: string = '';
    
    const saveModal = useWithButtonModal({
        message: 'Are you finished adding exercises to this workout?',
        leftButtonText: 'Close',
        rightButtonText: 'Yes, Save',
        leftButtonAction: () => saveModal.close(),
        rightButtonAction: () => { },
    });

    const onAdd = () => {
        if (dropdown.value === null || 
            repsInput.value === 0
        ) {
            setHasError(true);
            return;
        }
        clearError();
        setWorkoutSets([ ...workoutSets, {
            order: counter,
            exercise: dropdown.stringValue,
            resistance: resistanceInput.value,
            reps: repsInput.value,
        }]);
        setIsAddingTo(false);
        setCounter(counter + 1);
    }

    const clearError = () => { setHasError(false); }
    
    const onClickAddExercise = () => {
        resistanceInput.clear();
        repsInput.clear();
        dropdown.clear();
        clearError();
        setIsAddingTo(!isAdding);
    }

    const onSave = () => {
        saveModal.open();
    }

    return (
        <Container>
            <Links>
                <CancelLink>
                    <Link to='/workout_manager'>Cancel</Link>
                </CancelLink>
                <SaveLink>
                    <div onClick={onSave}>Save</div>
                </SaveLink>
            </Links>
            <Workout>
                <thead>
                    <WorkoutRow>
                        <WorkoutHeader>Exercise</WorkoutHeader>
                        <WorkoutHeader></WorkoutHeader>
                        <WorkoutHeader>Resistance</WorkoutHeader>
                        <WorkoutHeader></WorkoutHeader>
                        <WorkoutHeader>Reps</WorkoutHeader>
                    </WorkoutRow>
                </thead>
                <tbody>
                    {workoutSets.map((set: WorkoutSet) => {
                        let exe = set.exercise;
                        if (lastExercise === set.exercise) exe = '';
                        lastExercise = set.exercise;
                        return (
                            <WorkoutRow key={set.order}>
                                <Exercise>
                                    {exe}
                                </Exercise>
                                <Separator>:</Separator>
                                <Resistance>
                                    {set.resistance}
                                </Resistance>
                                <Separator>-</Separator>
                                <Reps>
                                    {set.reps}
                                </Reps>
                            </WorkoutRow>
                        );
                    })}
                </tbody>
            </Workout>
            {isAdding && (
                <ExerciseForm>
                    <Dropdown  {...dropdown.bind} onFocus={clearError} />
                    <input onFocus={clearError} {...resistanceInput.bind} />
                    <input onFocus={clearError} {...repsInput.bind} />
                    <button onClick={onAdd}>Add</button>
                </ExerciseForm>
            )}
            {hasError && <ErrorMessage>Sorry that's not valid data</ErrorMessage>}
            <AddExercise onClick={onClickAddExercise}>
                <Icon
                    icon={isAdding ? IconType.TIMES : IconType.PLUS}
                    color='#338bd5'
                />
            </AddExercise>
            <ButtonModal {...saveModal.bind}/>
        </Container>
    );
}

export default CreateWorkoutPage;