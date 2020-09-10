import { action } from 'typesafe-actions'
import { AuthTypes, IAccessToken, IAuth } from './types'

/* Actions for Change */
export const changeEmail = (data: string) => action(AuthTypes.CHANGE_EMAIL, { email: data })

export const changePassword = (data: string) => action(AuthTypes.CHANGE_PASSWORD, { password: data })

/* Actions for Login */
export const loginRequest = (data: IAuth) => action(AuthTypes.LOGIN_REQUEST, { data })

export const loginSuccess = (data: IAccessToken) => action(AuthTypes.LOGIN_SUCCESS, { data })

export const loginFailure = (error: ErrorEvent) => action(AuthTypes.LOGIN_FAILURE, { error })