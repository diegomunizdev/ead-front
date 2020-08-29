import { UserTypes } from "../../application/models/user/user";

/**
 * Action types
 */
export enum AuthTypes {
    CHANGE_EMAIL = '@auth/CHANGE_EMAIL',
    CHANGE_PASSWORD = '@auth/CHANGE_PASSWORD',

    LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
    LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
}

/**
 * Data types
 */
export interface IAccessToken {
    id: string
    exp: number
    iat: number
    type: UserTypes
}

export interface IAuth {
    email: string
    password: string
}

/**
 * Login State
 */
export interface ILoginState {
    readonly credentials: IAuth
    readonly data: IAccessToken
    readonly loading: boolean
    readonly error: boolean,
}

/**
 * State type
 */
export interface IAuthState {
    readonly login: ILoginState
}