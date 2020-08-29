import { Reducer } from 'redux'
import { AuthTypes, IAuthState } from './types'
import AccessToken from '../../application/models/user/access.token'

const INITIAL_STATE: IAuthState = {
    login: {
        credentials: { email: '', password: '' },
        data: new AccessToken(),
        error: false,
        loading: false
    }
}

const reducer: Reducer<IAuthState> = (state: IAuthState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case AuthTypes.CHANGE_EMAIL:
            const { email } = action.payload
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: false,
                    credentials: { ...state.login.credentials, email }
                }
            }

        case AuthTypes.CHANGE_PASSWORD:
            const { password } = action.payload
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: false,
                    credentials: { ...state.login.credentials, password }
                }
            }

        case AuthTypes.LOGIN_SUCCESS:
            return INITIAL_STATE

        case AuthTypes.LOGIN_REQUEST:
            return { ...state, login: { ...state.login, loading: true } }

        case AuthTypes.LOGIN_FAILURE:
            const loginError = action.payload.error
            return { ...state, login: { ...state.login, loading: false, error: true, data: loginError } }

        default:
            return state;
    }
}

export default reducer