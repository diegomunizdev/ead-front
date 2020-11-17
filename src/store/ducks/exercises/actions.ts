import { action } from 'typesafe-actions'
import { ExerciseTypes } from './types'
import Exercise from '../../application/models/exercise.model'
import { IAxiosResponse, IPaginator } from '../root.types'

export const resetExercise = () => action(ExerciseTypes.RESET_CREATE_EXERCISE, {})

export const changeExercise = (exercise: Exercise) => action(ExerciseTypes.CHANGE_EXERCISE, { exercise })

export const changePaginator = (subjectId: string, paginator?: IPaginator) => [
  action(ExerciseTypes.CHANGE_PAGINATOR, {
    subjectId,
    paginator
  }),
  loadExercisesRequest(subjectId, paginator)
]

/* Actions for create exercise */
export const createExerciseRequest = (exercise: Exercise) => action(ExerciseTypes.CREATE_REQUEST, { exercise })

export const createExerciseSuccess = (exercise: Exercise) => action(ExerciseTypes.CREATE_SUCCESS, { exercise })

export const createExerciseFailure = (error: ErrorEvent) => action(ExerciseTypes.CREATE_FAILURE, { error })

/* Action for find exercise */
export const findExerciseRequest = (subjectId: string) => action(ExerciseTypes.FIND_REQUEST, { subjectId })

export const findExerciseSuccess = (response: IAxiosResponse<Exercise[]>) => action(ExerciseTypes.FIND_SUCCESS, {
  exercise: response.data,
  headers: response.data
})

export const findExerciseFailure = (error: ErrorEvent) => action(ExerciseTypes.FIND_FAILURE, { error })

/* Actions for load exercise */
export const loadExercisesRequest = (subjectId: string, paginator?: IPaginator) => action(ExerciseTypes.LOAD_REQUEST, {
  subjectId,
  paginator
})

export const loadExerciseSuccess = (response: IAxiosResponse<Exercise[]>) => action(ExerciseTypes.LOAD_SUCCESS, {
  exercises: response.data,
  headers: response.headers
})

export const loadExerciseFailure = (error: ErrorEvent) => action(ExerciseTypes.LOAD_FAILURE, { error })

/* Actions for update exercise */
export const updateExerciseRequest = (exercise: Exercise) => action(ExerciseTypes.UPDATE_REQUEST, { exercise })

export const updateExerciseSuccess = (exercise: Exercise) => action(ExerciseTypes.UPDATE_SUCCESS, { exercise })

export const updateExerciseFailure = (error: ErrorEvent) => action(ExerciseTypes.UPDATE_FAILURE, { error })

/* Actions for remove exercise */
export const removeExerciseRequest = (idForRemove: string) => action(ExerciseTypes.REMOVE_REQUEST, { idForRemove })

export const removeExerciseSuccess = () => action(ExerciseTypes.REMOVE_SUCCESS, {})

export const removeExerciseFailure = (error: ErrorEvent) => action(ExerciseTypes.REMOVE_FAILURE, { error })