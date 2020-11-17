import { Reducer } from 'redux'
import Exercise from '../../application/models/exercise.model'
import { IExerciseState, ExerciseTypes } from './types'

export const INITIAL_STATE: IExerciseState = {
  createExercise: {
    exercise: new Exercise(),
    data: new ErrorEvent(''),
    loading: false,
    error: false,
    success: false
  },
  listExercise: {
    exercises: [],
    data: new ErrorEvent(''),
    loading: false,
    error: false,
    success: false,
    paginator: {
      first: 0,
      rows: 10,
      page: 0,
      pageCount: 0,
      totalRecords: 0,
      search: {
        key: '',
        value: ''
      }
    }
  },
  removeExercise: {
    data: new ErrorEvent(''),
    visibilityModal: false,
    idForRemove: '',
    loading: false,
    error: false,
    success: false
  }
}

const reducer: Reducer<IExerciseState> = (state: IExerciseState = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case ExerciseTypes.RESET_CREATE_EXERCISE:
      return {
        ...state,
        createExercise: INITIAL_STATE.createExercise
      }

    case ExerciseTypes.CHANGE_EXERCISE:
      const { exercise } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          exercise: new Exercise().fromJSON(exercise)
        }
      }

    case ExerciseTypes.CHANGE_PAGINATOR:
      const { paginator } = action.payload
      return {
        ...state,
        listExercise: {
          ...state.listExercise,
          paginator
        }
      }

    case ExerciseTypes.CREATE_REQUEST:
      const { exercise: exerciseCreateRequest } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          loading: true,
          exercise: exerciseCreateRequest
        }
      }

    case ExerciseTypes.CREATE_SUCCESS:
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          exercise: new Exercise(),
          success: true
        }
      }

    case ExerciseTypes.CREATE_FAILURE:
      const { error: createError } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          error: true,
          data: createError
        }
      }

    case ExerciseTypes.FIND_REQUEST:
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          loading: true
        }
      }

    case ExerciseTypes.FIND_SUCCESS:
      const { exercise: exerciseFound } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          success: true,
          exercise: new Exercise().fromJSON(exerciseFound)
        }
      }

    case ExerciseTypes.FIND_FAILURE:
      const { error: findError } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          error: true,
          data: findError
        }
      }

    case ExerciseTypes.LOAD_REQUEST:
      return {
        ...state,
        listExercise: {
          ...state.listExercise,
          loading: true
        }
      }

    case ExerciseTypes.LOAD_SUCCESS:
      const { exercises, headers } = action.payload
      return {
        ...state,
        listExercise: {
          ...state.listExercise,
          success: true,
          exercises,
          paginator: {
            ...state.listExercise.paginator,
            totalRecords: parseInt(headers['x-total-count'], 10)
          }
        }
      }

    case ExerciseTypes.LOAD_FAILURE:
      const { error: loadError } = action.payload
      return {
        ...state,
        listExercise: {
          ...state.listExercise,
          error: true,
          data: loadError
        }
      }

    case ExerciseTypes.UPDATE_REQUEST:
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          loading: true
        }
      }

    case ExerciseTypes.UPDATE_SUCCESS:
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          success: true
        }
      }

    case ExerciseTypes.UPDATE_FAILURE:
      const { error: updateError } = action.payload
      return {
        ...state,
        createExercise: {
          ...state.createExercise,
          error: true,
          data: updateError
        }
      }

    case ExerciseTypes.CHANGE_REMOVE_MODAL:
      const { visibilityModal, idForRemove } = action.payload
      return {
        ...state,
        removeExercise: {
          ...state.removeExercise,
          visibilityModal,
          idForRemove
        }
      }

    case ExerciseTypes.REMOVE_REQUEST:
      return {
        ...state,
        removeExercise: {
          ...state.removeExercise,
          loading: true
        }
      }

    case ExerciseTypes.REMOVE_SUCCESS:
      return {
        ...state,
        removeExercise: {
          ...state.removeExercise,
          success: true,
          idForRemove: ''
        }
      }

    case ExerciseTypes.REMOVE_FAILURE:
      const { error: removeError } = action.payload
      return {
        ...state,
        removeExercise: {
          ...state.removeExercise,
          error: true,
          visibilityModal,
          data: removeError
        }
      }

    default:
      return state
  }
}

export default reducer