import { UserTypes } from "../../application/models/user/user";

/**
 * Action types
 */
export enum AuthTypes {
    CHANGE_USERNAME = '@auth/CHANGE_EMAIL',
    CHANGE_PASSWORD = '@auth/CHANGE_PASSWORD',
    CHANGE_ICON_PASSWORD = '@auth/CHANGE_ICON_PASSWORD',
    CHANGE_ICON_CONFIRM_PASSWORD = '@auth/CHANGE_ICON_CONFIRM_PASSWORD',
    CHANGE_FORGOT_MODAL = '@auth/CHANGE_FORGOT_MODAL',

    LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
    LOGIN_FAILURE = '@auth/LOGIN_FAILURE',

    FORGOT_REQUEST = '@auth/FORGOT_REQUEST',
    FORGOT_SUCCESS = '@auth/FORGOT_SUCCESS',
    FORGOT_FAILURE = '@auth/FORGOT_FAILURE',

    CHANGE_CONFIRM_PASSWORD = '@auth/CHANGE_CONFIRM_PASSWORD',
    CHANGE_PASSWORD_REQUEST = '@auth/CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS = '@auth/CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILURE = '@auth/CHANGE_PASSWORD_FAILURE'
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
    username: string
    password: string
}

export interface IChangePassword {
    email: string
    old_password?: string
    new_password: string
    confirm_password: string
}

/**
 * Login State
 */
export interface ILoginState {
    readonly credentials: IAuth
    readonly data: IAccessToken
    readonly loading: boolean
    readonly error: boolean,
    readonly passwordIcon: string
}

/**
 * Forgot State
 */
export interface IForgotState {
    readonly email: string
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

/**
 * Change Password State
 */
export interface IChangePasswordState {
    readonly credentials: IChangePassword
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean,
    readonly confirmPasswordIcon: string,
    readonly matchPasswords: boolean
    readonly validatePasswords: boolean
}

/**
 * State type
 */
export interface IAuthState {
    readonly login: ILoginState
    readonly forgot: IForgotState
    readonly changePassword: IChangePasswordState
}