import { GenericResponse } from "../../types/core/GenericResponse"

export const USER_CREATED: GenericResponse = {
    success: true, 
    message: 'Your account has been created'
}

export const USER_ALREADY_EXISTS: GenericResponse = {
    success: false, 
    message: 'Username already exists'
}

export const USER_LOGGED_IN: GenericResponse = {
    success: true, 
    message: 'Logged In'
}

export const USER_PASSWORD_INCORRECT: GenericResponse = {
    success: false, 
    message: "Password is incorrect"
}