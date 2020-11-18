import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import { Toast } from '../../../services/toast.service'
import { updateExerciseFailure, updateExerciseSuccess } from './actions'
import exerciseService from '../../../services/exercise.service'
import { ExerciseTypes } from './types'

const toastService = Toast.getInstance()

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
      takeLatest(ExerciseTypes.UPDATE_REQUEST, update),
  ])
}