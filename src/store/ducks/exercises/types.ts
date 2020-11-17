import Exercise from '../../application/models/exercise.model'
import { IComponentState, IPaginator } from '../root.types'

export enum ExerciseTypes {
  RESET_CREATE_EXERCISE = '@exercise/RESET_CREATE_EXERCISE',
  CHANGE_EXERCISE = '@exercise/CHANGE_EXERCISE',
  CHANGE_PAGINATOR = '@exercise/CHANGE_PAGINATOR',

  CREATE_REQUEST = '@exercise/CREATE_REQUEST',
  CREATE_SUCCESS = '@exercise/CREATE_SUCCESS',
  CREATE_FAILURE = '@exercise/CREATE_FAILURE',

  FIND_REQUEST = '@exercise/FIND_REQUEST',
  FIND_SUCCESS = '@exercise/FIND_SUCCESS',
  FIND_FAILURE = '@exercise/FIND_FAILURE',

  LOAD_REQUEST = '@exercise/LOAD_REQUEST',
  LOAD_SUCCESS = '@exercise/LOAD_SUCCESS',
  LOAD_FAILURE = '@exercise/LOAD_FAILURE',

  UPDATE_REQUEST = '@exercise/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@exercise/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@exercise/UPDATE_FAILURE',

  CHANGE_REMOVE_MODAL = '@exercise/CHANGE_REMOVE_MODAL',
  REMOVE_REQUEST = '@exercise/REMOVE_REQUEST',
  REMOVE_SUCCESS = '@exercise/REMOVE_SUCCESS',
  REMOVE_FAILURE = '@exercise/REMOVE_FAILURE',
}

interface ICreateState extends IComponentState {
  readonly exercise: Exercise
  readonly data: ErrorEvent
}

interface IListState extends IComponentState {
  readonly exercises: Exercise[]
  readonly data: ErrorEvent
  readonly paginator: IPaginator
}

interface IRemoveState extends IComponentState {
  readonly data: ErrorEvent
  readonly visibilityModal: boolean
  readonly idForRemove: string
}

export interface IExerciseState {
  readonly createExercise: ICreateState
  readonly listExercise: IListState
  readonly removeExercise: IRemoveState
}