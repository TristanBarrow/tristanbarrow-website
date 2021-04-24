export type CreateWorkoutRequest = {
    workout_type: string
    date: string
    description: string
}

export type UpdateWorkoutRequest = {
    id: number
    workout_type: string
    date: string
    description: string
}

export type DeleteWorkoutRequest = {
    id: number
}