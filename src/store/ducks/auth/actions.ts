import { action } from 'typesafe-actions'
import { AuthTypes, IAccessToken, IAuth, IChangePassword } from './types'

/* Actions for Change */
export const changeUsername = (data: string) => action(AuthTypes.CHANGE_USERNAME, { username: data })

export const changePassword = (data: string) => action(AuthTypes.CHANGE_PASSWORD, { password: data })

export const changeIconPassword = (icon: string) => action(AuthTypes.CHANGE_ICON_PASSWORD, { icon })

export const changeForgotModal = (success: boolean) => action(AuthTypes.CHANGE_FORGOT_MODAL, { success })

/* Actions for Login */
export const loginRequest = (data: IAuth) => action(AuthTypes.LOGIN_REQUEST, { data })

export const loginSuccess = (data: IAccessToken) => action(AuthTypes.LOGIN_SUCCESS, { data })

export const loginFailure = (error: ErrorEvent) => action(AuthTypes.LOGIN_FAILURE, { error })

/* Actions for Forgot */
export const forgotRequest = (data: { email: string }) => action(AuthTypes.FORGOT_REQUEST, { data })

export const forgotSuccess = (response: any) => action(AuthTypes.FORGOT_SUCCESS, { response })

export const forgotFailure = (error: ErrorEvent) => action(AuthTypes.FORGOT_FAILURE, { error })

/* Actions for Change Password */
export const changePasswordRequest = (data: IChangePassword) => action(AuthTypes.CHANGE_PASSWORD_REQUEST, { data })

export const changePasswordSuccess = (response: any) => action(AuthTypes.CHANGE_PASSWORD_SUCCESS, { response })

export const changePasswordFailure = (error: ErrorEvent) => action(AuthTypes.CHANGE_PASSWORD_FAILURE, { error })

export const changeConfirmPassword = (data: string) => action(AuthTypes.CHANGE_CONFIRM_PASSWORD, { confirm_password: data })

export const changeIconConfirmPassword = (confirmPasswordIcon: string) => action(AuthTypes.CHANGE_ICON_CONFIRM_PASSWORD, { confirmPasswordIcon })