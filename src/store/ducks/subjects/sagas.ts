import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { Toast } from '../../../services/toast.service'
import { IActionType } from '../root.types'
import subjectService from '../../../services/subjects.service'
import { createSubjectFailure, createSubjectSuccess, findSubjectFailure, findSubjectSuccess, loadSubjectFailure, loadSubjectSuccess, updateSubjectFailure, updateSubjectSuccess } from './actions'
import { SubjectsTypes } from './types'
const toastService = Toast.getInstance()

function* create(action: IActionType) {
    const { subject } = action.payload
    try {
        yield apply(subjectService, subjectService.create, [subject])
        yield put<any>(createSubjectSuccess(subject))
        toastService.show('success', 'Nova Disciplina', 'A disciplina foi adicionada com sucesso!')
    } catch (error) {
        yield put<any>(createSubjectFailure(error))
    }
}

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

function* getById(action: IActionType) {
    try {
        const { subjectId } = action.payload
        const response = yield apply(subjectService, subjectService.getById, [subjectId])
        yield put(findSubjectSuccess(response))
    } catch (err) {
        yield put(findSubjectFailure(err))
    }
}

function* getByTeacher(action: IActionType) {
    const { teacherId, paginator } = action.payload
    try {
        const response = yield apply(subjectService, subjectService.getByTeacher, [teacherId])
        yield put<any>(loadSubjectSuccess(response))
    } catch (err) {
        yield put<any>(loadSubjectFailure(err))
    }
}

export default function* subjectSaga() {
    return yield all([
        takeLatest(SubjectsTypes.CREATE_REQUEST, create),
        takeLatest(SubjectsTypes.UPDATE_REQUEST, update),
        takeLatest(SubjectsTypes.LOAD_REQUEST, getByTeacher),
        takeLatest(SubjectsTypes.FIND_REQUEST, getById)
    ])
}