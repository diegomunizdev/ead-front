import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/sagas'
import userSaga from './user/sagas'
import gameSaga from './game/sagas'

export default function* rootSaga() {
    return yield all([
        fork(authSaga),
        fork(userSaga),
        fork(gameSaga)
    ])
}