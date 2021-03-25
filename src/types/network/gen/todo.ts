export type CreateTodoRequest = {
    name: string
    description: string
    is_finished: boolean
}

export type UpdateTodoRequest = {
    id: number
    name: string
    description: string
    is_finished: boolean
}

export type DeleteTodoRequest = {
    id: number
}