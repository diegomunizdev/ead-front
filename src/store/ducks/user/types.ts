/* Action types */
import User from '../../application/models/user/user'
import { IPaginator, IComponentState } from '../root.types'

export enum UserActionTypes {
    RESET_CREATE_USER = '@users/RESET_CREATE_USER',

    CHANGE_USER = '@users/CHANGE_USER',
    CHANGE_PAGINATOR = '@users/CHANGE_PAGINATOR',
    CHANGE_SEARCH_PAGINATOR = '@users/CHANGE_SEARCH_PAGINATOR',

    CREATE_REQUEST = '@users/CREATE_REQUEST',
    CREATE_SUCCESS = '@users/CREATE_SUCCESS',
    CREATE_FAILURE = '@users/CREATE_FAILURE',

    FIND_REQUEST = '@users/FIND_REQUEST',
    FIND_SUCCESS = '@users/FIND_SUCCESS',
    FIND_FAILURE = '@users/FIND_FAILURE',

    UPDATE_REQUEST = '@users/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@users/UPDATE_SUCCESS',
    CHANGE_ACCESS_CONTROL = '@users/CHANGE_ACCESS_CONTROL',
    UPDATE_FAILURE = '@users/UPDATE_FAILURE',

    CHANGE_REMOVE_MODAL = '@users/CHANGE_REMOVE_MODAL',
    REMOVE_REQUEST = '@users/REMOVE_REQUEST',
    REMOVE_SUCCESS = '@users/REMOVE_SUCCESS',
    REMOVE_FAILURE = '@users/REMOVE_FAILURE',

    LOAD_USERS_REQUEST = '@users/LOAD_USERS_REQUEST',
    LOAD_USERS_SUCCESS = '@users/LOAD_USERS_SUCCESS',
    LOAD_USERS_FAILURE = '@users/LOAD_USERS_FAILURE',
}

interface ICreateState extends IComponentState {
    readonly user: User
    readonly data: ErrorEvent
}

interface IProfile extends IComponentState {
    readonly user: User
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

interface IRemoveState extends IComponentState {
    readonly visibilityModal: boolean
    readonly userIdForRemove: string
}

interface IListUserState extends IComponentState {
    readonly users: User[]
    readonly paginator: IPaginator
}

// State type
export interface IUserState {
    readonly createUser: ICreateState,
    readonly profile: IProfile,
    readonly removeUser: IRemoveState,
    readonly listAdmins: IListUserState,
    readonly listTeacher: IListUserState,
    readonly listTutor: IListUserState
    readonly listStudent: IListUserState
}