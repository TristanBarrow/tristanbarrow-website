export type CreateProjectRequest = {
    title: string
    sub_title: string
    description: string
    link: string
}

export type UpdateProjectRequest = {
    id: number
    title: string
    sub_title: string
    description: string
    link: string
}

export type DeleteProjectRequest = {
    id: number
}