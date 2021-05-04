// import { useState } from "react";
// import { CreateExerciseRequest, UpdateExerciseRequest } from "../../types/network/gen/exercise";
// import { CreateWorkoutSetRequest } from "../../types/network/gen/workoutSet";
// import { useTextInput, TextInputBinding } from "./useTextInput"
// import { useNumberInput } from "./useNumberInput"
// import ListInput from "../components/molecular/ListInut";
// import { useListInput } from "./component-hooks/useListInput";
// import { useExercisesData } from "../requests/gen/exercise/useExercisesData";

// export const useEditableWorkoutSet = (workout: number): any => {
//     const { isSuccess, data, isLoading, } = useExercisesData();
//     const exerciseData: UpdateExerciseRequest[] = data;
//     const exerciseList: string[] = isSuccess ? exerciseData.map(ex => ex.name) : [];
//     const exerciseInput = useListInput({
//         list: exerciseList, 
//         noValuePlaceholder: isLoading ? 'Loading...' : '--'
//     });
    
//     const sideInputList = [''];

//     const [workoutOrder, setWorkoutOrder] = useState<number>(1);
//     const resistanceInput = useNumberInput(0);
//     const repsInput = useNumberInput(0);
//     const sideInput = useListInput({ list: sideInputList });
//     const notesInput = useTextInput('', '');

//     const onSetWorkoutSet = (callback: (workout: CreateWorkoutSetRequest) => void) => {
//         exerciseInput.value

//         const workoutSet: CreateWorkoutSetRequest = {
//             workout,
//             exercise: ex

//         }

//         callback(workoutSet);
//     } 

//     return {
//         isLoadingExercises: isLoading,
//         resistanceBinding: resistanceInput.bind,
//         repsBinding: repsInput.bind,
//         sideBinding: sideInput.bind,
//         notesBinding: notesInput.bind,
//         clear: () => {},
//         setWorkoutOrder: (order: number) => {}
//     }
// }

// type UseEditableWorkoutSetBinding = {
//     exerciseBinding: TextInputBinding
//     resistanceBinding: TextInputBinding
//     repsBinding: TextInputBinding
//     sideBinding: TextInputBinding
//     notesBinding: TextInputBinding
//     clear: () => void
//     incOrder: () => void
// }