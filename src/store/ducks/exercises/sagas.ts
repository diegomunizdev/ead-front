import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import { Toast } from '../../../services/toast.service'
import { createExerciseFailure, createExerciseSuccess, loadExerciseFailure, loadExerciseSuccess, updateExerciseFailure, updateExerciseSuccess } from './actions'
import exerciseService from '../../../services/exercise.service'
import { ExerciseTypes } from './types'

const toastService = Toast.getInstance()

function* create(action: IActionType) {
  const { exercise } = action.payload
  try {
    const response = yield apply(exerciseService, exerciseService.create, [exercise])
    yield put<any>(createExerciseSuccess(response.data))
    toastService.show('success', 'Exercício criado com sucesso.', '')
  } catch (error) {
    yield put(createExerciseFailure(error))
  }
}

function* getBySubjectId(action: IActionType) {
  const { subjectId, paginator } = action.payload
  try {
    const response = yield apply(exerciseService, exerciseService.getBySubjectId, [subjectId, paginator])
    yield put<any>(loadExerciseSuccess(response))
  } catch (error) {
    yield put<any>(loadExerciseFailure(error))
  }
}

function* update(action: IActionType) {
  const { exercise } = action.payload
  try {
    yield apply(exerciseService, exerciseService.update, [exercise])
    yield put<any>(updateExerciseSuccess(exercise))
    toastService.show('success', 'Exercício atualizado com sucesso', '')
  } catch (error) {
    yield put<any>(updateExerciseFailure(error))
  }
}

export default function* exerciseSaga() {
  return yield all([
    takeLatest(ExerciseTypes.CREATE_REQUEST, create),
    takeLatest(ExerciseTypes.UPDATE_REQUEST, update),
    takeLatest(ExerciseTypes.LOAD_REQUEST, getBySubjectId)
  ])
}