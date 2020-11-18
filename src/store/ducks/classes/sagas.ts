import { all, put, apply, takeLatest } from 'redux-saga/effects'
import { Toast } from '../../../services/toast.service'
import { IActionType } from '../root.types'
import { createClassesFailure, createClassesSuccess, loadClassesSuccess } from './actions'
import classesService from '../../../services/classes.service'
import { ClassesTypes } from './types'

const toastService = Toast.getInstance()

function* create(action: IActionType) {
  const { classe } = action.payload
  try {
    yield apply(classesService, classesService.create, [classe])
    yield put<any>(createClassesSuccess(classe))
    toastService.show('success', 'Registro de aula adicionado', '')
  } catch (error) {
    yield put<any>(createClassesFailure(error))
  }
}

function* getBySubjectId(action: IActionType) {
  const { subjectId } = action.payload
  try {
    const response = yield apply(classesService, classesService.getBySubject, [subjectId])
    yield put<any>(loadClassesSuccess(response))
  } catch (error) {

  }
}

export default function* classesSaga() {
  return yield all([
    takeLatest(ClassesTypes.CREATE_REQUEST, create),
    takeLatest(ClassesTypes.LOAD_REQUEST, getBySubjectId)
  ])
}