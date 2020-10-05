import { all, apply, put, takeLatest, } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import gameService from '../../../services/game'
import { loadGameFailure, loadGameSuccess, updateGameFailure, updateGameSuccess } from './actions'
import { GameActionTypes } from './types'
import { Toast } from '../../../services/toast'

const toastService = Toast.getInstance()

function* update(action: IActionType) {
    const { game } = action.payload
    try {
        yield apply(gameService, gameService.update, [game])
        yield put<any>(updateGameSuccess(game))
        // yield put(changeUsername(`${user.name}`))
        // localStorageService.setItem('user', JSON.stringify(user))
        toastService.show('success', 'Pergunta atualizada com sucesso', '')
    } catch (err) {
        yield put(updateGameFailure(err))
    }
}

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
        takeLatest(GameActionTypes.LOAD_REQUEST, getAll),
        takeLatest(GameActionTypes.UPDATE_REQUEST, update)
    ])
}