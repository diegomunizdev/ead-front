import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { Toast } from '../../../services/toast'
import { IActionType } from '../root.types'
import subjectService from '../../../services/subjects'
import { updateSubjectFailure, updateSubjectSuccess } from './actions'
import { SubjectsTypes } from './types'
const toastService = Toast.getInstance()

function* update(action: IActionType) {
    const { subject } = action.payload
    try {
        yield apply(subjectService, subjectService.getAll, [subject])
        yield put<any>(updateSubjectSuccess(subject))
        toastService.show('success', 'Disciplina atualizada com sucesso', '')
    } catch (err) {
        yield put<any>(updateSubjectFailure(err))
    }
}

export default function* subjectSaga() {
    return yield all([
        takeLatest(SubjectsTypes.UPDATE_REQUEST, update)
    ])
}