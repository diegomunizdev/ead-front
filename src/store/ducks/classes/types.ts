import Classes from '../../application/models/classes.model'
import { IComponentState, IPaginator } from '../root.types'

export enum ClassesTypes {
    RESET_CREATE_CLASSES = '@classes/RESET_CREATE_CLASSES',
    CHANGE_CLASSES = '@classes/CHANGE_CLASSES',
    CHANGE_PAGINATOR = '@classes/CHANGE_PAGINATOR',

    CREATE_REQUEST = '@classes/CREATE_REQUEST',
    CREATE_SUCCESS = '@classes/CREATE_SUCCESS',
    CREATE_FAILURE = '@classes/CREATE_FAILURE',

    FIND_REQUEST = '@classes/FIND_REQUEST',
    FIND_SUCCESS = '@classes/FIND_SUCCESS',
    FIND_FAILURE = '@classes/FIND_FAILURE',

    LOAD_REQUEST = '@classes/LOAD_REQUEST',
    LOAD_SUCCESS = '@classes/LOAD_SUCCESS',
    LOAD_FAILURE = '@classes/LOAD_FAILURE',

    UPDATE_REQUEST = '@classes/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@classes/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@classes/UPDATE_FAILURE',

    CHANGE_REMOVE_MODAL = '@classes/CHANGE_REMOVE_MODAL',
    REMOVE_REQUEST = '@classes/REMOVE_REQUEST',
    REMOVE_SUCCESS = '@classes/REMOVE_SUCCESS',
    REMOVE_FAILURE = '@classes/REMOVE_FAILURE'
}

interface ICreateState extends IComponentState {
    readonly classe: Classes
    readonly data: ErrorEvent
}

interface IListState extends IComponentState {
    readonly classes: Classes[]
    readonly data: ErrorEvent
    readonly paginator: IPaginator
}

interface IRemoveState extends IComponentState {
    readonly visibilityModal: boolean
    readonly idForRemove: string
}

export interface IClassesState {
    readonly createClasses: ICreateState
    readonly listClasses: IListState
    readonly removeClasses: IRemoveState
}