export type CreateExerciseRequest = {
    name: string
    description: string
}

export type UpdateExerciseRequest = {
    id: number
    name: string
    description: string
}

export type DeleteExerciseRequest = {
    id: number
}