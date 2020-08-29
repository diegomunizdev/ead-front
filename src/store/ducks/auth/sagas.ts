import { all, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import authService from '../../../services/auth'
import { AxiosResponse } from 'axios'
import {
    changePasswordFailure,
    changePasswordSuccess,
    forgotFailure,
    forgotSuccess,
    loginFailure,
    loginSuccess
} from './actions'
import { IActionType } from '../root.types'
import { AuthTypes, IAuth, IChangePassword } from './types'
import { Toast } from '../../../services/toast'

const toastService = Toast.getInstance()

export function* authenticate(action: IActionType<AxiosResponse<IAuth>>) {
    try {
        const { data } = action.payload
        const response = yield call(authService.login, data)
        yield put(loginSuccess(response))
        yield put(push(`/app/main`))
    } catch (err) {
        yield put(loginFailure(err))
    }
}

export function* forgot(action: IActionType<AxiosResponse<{ email: string }>>) {
    try {
        const { data: { email } } = action.payload
        const response = yield call(authService.forgot, email)
        yield put(forgotSuccess(response))
    } catch (err) {
        yield put(forgotFailure(err))
    }
}

export function* changePassword(action: IActionType<AxiosResponse<IChangePassword>>) {
    try {
        const { data } = action.payload
        // delete data.confirm_password
        const response = yield call(authService.changePassword, data)
        yield put(changePasswordSuccess(response))
        yield put(push(`/login`))
        toastService.show('success', 'Senha alterarda com sucesso', 'Utilize-a nas proximas autenticações')
    } catch (err) {
        yield put(changePasswordFailure(err))
    }
}

export default function* authSaga() {
    return yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, authenticate),
        takeLatest(AuthTypes.FORGOT_REQUEST, forgot),
        takeLatest(AuthTypes.CHANGE_PASSWORD_REQUEST, changePassword)
    ])
}