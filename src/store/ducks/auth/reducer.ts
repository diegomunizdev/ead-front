import { Reducer } from 'redux'
import { AuthTypes, IAuthState } from './types'
import AccessToken from '../../application/models/user/access.token'

const INITIAL_STATE: IAuthState = {
    login: {
        credentials: { username: '', password: '' },
        data: new AccessToken(),
        error: false,
        loading: false,
        passwordIcon: 'fa-eye-slash'
    },
    forgot: {
        email: '',
        data: new ErrorEvent(''),
        error: false,
        success: false,
        loading: false
    },
    changePassword: {
        credentials: { email: '', old_password: '', new_password: '', confirm_password: '' },
        data: new ErrorEvent(''),
        error: false,
        success: false,
        loading: false,
        matchPasswords: false,
        validatePasswords: true,
        confirmPasswordIcon: 'fa-eye-slash'
    }
}

const reducer: Reducer<IAuthState> = (state: IAuthState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case AuthTypes.CHANGE_USERNAME:
            const { username } = action.payload
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: false,
                    credentials: { ...state.login.credentials, username }
                },
                forgot: {
                    ...state.forgot,
                    loading: false,
                    error: false,
                    username
                },
                changePassword: {
                    ...state.changePassword,
                    loading: false,
                    error: false,
                    credentials: { ...state.changePassword.credentials, username }
                }
            }

        case AuthTypes.CHANGE_PASSWORD:
            const { password } = action.payload
            const validatePasswords = validatePassword(password)
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: false,
                    credentials: { ...state.login.credentials, password }
                }, changePassword: {
                    ...state.changePassword,
                    credentials: { ...state.changePassword.credentials, new_password: password },
                    matchPasswords: password === state.changePassword.credentials.confirm_password,
                    validatePasswords
                }
            }

        case AuthTypes.CHANGE_CONFIRM_PASSWORD:
            const { confirm_password } = action.payload
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    credentials: { ...state.changePassword.credentials, confirm_password },
                    matchPasswords: state.changePassword.credentials.new_password === confirm_password
                }
            }

        case AuthTypes.CHANGE_ICON_PASSWORD:
            const { icon } = action.payload
            return { ...state, login: { ...state.login, loading: false, error: false, passwordIcon: icon } }

        case AuthTypes.CHANGE_ICON_CONFIRM_PASSWORD:
            const { confirmPasswordIcon } = action.payload
            return {
                ...state,
                changePassword: { ...state.changePassword, loading: false, error: false, confirmPasswordIcon }
            }

        case AuthTypes.CHANGE_FORGOT_MODAL:
            const { success } = action.payload
            return { ...state, forgot: { ...state.forgot, success } }

        case AuthTypes.LOGIN_SUCCESS:
            return INITIAL_STATE

        case AuthTypes.LOGIN_REQUEST:
            return { ...state, login: { ...state.login, loading: true } }

        case AuthTypes.LOGIN_FAILURE:
            const loginError = action.payload.error
            return { ...state, login: { ...state.login, loading: false, error: true, data: loginError } }

        case AuthTypes.FORGOT_REQUEST:
            return { ...state, forgot: { ...state.forgot, loading: true } }

        case AuthTypes.FORGOT_SUCCESS:
            return { ...INITIAL_STATE, forgot: { ...INITIAL_STATE.forgot, success: true } }

        case AuthTypes.FORGOT_FAILURE:
            const forgotError = action.payload.error
            return { ...state, forgot: { ...state.forgot, loading: false, error: true, data: forgotError } }

        case AuthTypes.CHANGE_PASSWORD_REQUEST:
            return { ...state, changePassword: { ...state.changePassword, loading: true } }

        case AuthTypes.CHANGE_PASSWORD_SUCCESS:
            return { ...INITIAL_STATE, changePassword: { ...INITIAL_STATE.changePassword, success: true } }

        case AuthTypes.CHANGE_PASSWORD_FAILURE:
            const changeError = action.payload.error
            return {
                ...state,
                changePassword: { ...state.changePassword, loading: false, error: true, data: changeError }
            }

        default:
            return state;
    }
}

export const validatePassword = (password: string): boolean => {
    const len = password.length;
    const letter = password.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').length
    const num = password.replace(/[^\d]+/g, '').length
    const sym = password.replace(/[A-Za-z0-9_]/gi, '').length
    return !(len < 6 || letter <= 0 || num <= 0 || sym <= 0)
}

export default reducer