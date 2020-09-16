import { all, apply, put, takeLatest, } from 'redux-saga/effects'
import { Toast } from '../../../services/toast'
import { IActionType } from '../root.types'
import gameService from '../../../services/game'
import { loadGameFailure, loadGameSuccess } from './actions'
import { GameActionTypes } from './types'


const toastService = Toast.getInstance()

function* getAll(action: IActionType) {
    try {
        const { paginator } = action.payload
        const response = yield apply(gameService, gameService.getAll, [paginator])
        yield put<any>(loadGameSuccess(response))
    } catch (err) {
        yield put(loadGameFailure(err))
    }
}

export default function* gameSaga() {
    return yield all([
        takeLatest(GameActionTypes.LOAD_REQUEST, getAll)
    ])
}