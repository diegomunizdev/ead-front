import { all, apply, put, takeLatest } from 'redux-saga/effects'

import usersService from '../../../services/user'
import {
    createFailure,
    createSuccess,
    findFailure,
    findSuccess,
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    removeFailure,
    removeSuccess,
    updateFailure,
    updateSuccess
} from './actions'
import { IActionType, IAxiosResponse } from '../root.types'
// import User from '../../application/models/user/user'
import { Toast } from '../../../services/toast'
import { UserActionTypes } from './types'

const toastService = Toast.getInstance()

function* create(action: IActionType) {
    try {
        const { user } = action.payload
        const response = yield apply(usersService, usersService.create, [user])
        yield put<any>(createSuccess(response.data))
        toastService.show('success', 'Usuário criado com sucesso', '')
    } catch (err) {
        yield put(createFailure(err))
    }
}

function* getAll(action: IActionType) {
    const { userType, paginator } = action.payload
    try {
        const response: IAxiosResponse = yield apply(usersService, usersService.getAll, [userType, paginator])
        yield put(loadUsersSuccess(userType, response.data))
    } catch (err) {
        yield put(loadUsersFailure(userType, err))
    }
}

function* getById(action: IActionType) {
    const { userId } = action.payload
    try {
        const response = yield apply(usersService, usersService.getById, [userId])
        yield put(findSuccess(response.data))
    } catch (err) {
        yield put(findFailure(err))
    }
}

function* update(action: IActionType) {
    const { user } = action.payload
    try {
        yield apply(usersService, usersService.update, [user])
        yield put<any>(updateSuccess(user))
        // yield put(changeUsername(`${user.name}`))
        // localStorageService.setItem('user', JSON.stringify(user))
        toastService.show('success', 'Usuário atualizado com sucesso', '')
    } catch (err) {
        yield put(updateFailure(err))
    }
}

function* remove(action: IActionType) {
    const { userIdForRemove, userType } = action.payload
    try {
        yield apply(usersService, usersService.remove, [userIdForRemove])
        yield put(removeSuccess())
        yield put(loadUsers(userType))
        toastService.show('success', 'Usuário removido com sucesso', '')
    } catch (err) {
        yield put(removeFailure(err))
    }
}

export default function* userSaga() {
    return yield all([
        takeLatest(UserActionTypes.CREATE_REQUEST, create),
        takeLatest(UserActionTypes.LOAD_USERS_REQUEST, getAll),
        takeLatest(UserActionTypes.FIND_REQUEST, getById),
        takeLatest(UserActionTypes.UPDATE_REQUEST, update),
        takeLatest(UserActionTypes.REMOVE_REQUEST, remove)
    ])
}