import { all, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import authService from '../../../services/auth.service'
import { AxiosResponse } from 'axios'
import {
    loginFailure,
    loginSuccess
} from './actions'
import { IActionType } from '../root.types'
import { AuthTypes, IAuth } from './types'

export function* authenticate(action: IActionType<AxiosResponse<IAuth>>) {
    try {
        const { data } = action.payload
        const response = yield call(authService.login, data)
        yield put(loginSuccess(response))
        yield put(push(`/ead/main`))
    } catch (err) {
        yield put(loginFailure(err))
    }
}

export default function* authSaga() {
    return yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, authenticate),
    ])
}