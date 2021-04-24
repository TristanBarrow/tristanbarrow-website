export type CreateWorkoutSetRequest = {
    workout: number
    exercise: number
    order: number
    resistance: number
    reps: number
    side: string
    notes: string
}

export type UpdateWorkoutSetRequest = {
    id: number
    workout: number
    exercise: number
    order: number
    resistance: number
    reps: number
    side: string
    notes: string
}

export type DeleteWorkoutSetRequest = {
    id: number
}