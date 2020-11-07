import Subjects from '../../application/models/subjects.model'
import { IComponentState, IPaginator } from '../root.types';

export enum SubjectsTypes {
    RESET_CREATE_SUBJECT = '@subject/RESET_CREATE_SUBJECT',
    CHANGE_SUBJECT = '@subject/CHANGE_SUBJECT',
    CHANGE_PAGINATOR = '@subject/CHANGE_PAGINATOR',

    CREATE_REQUEST = '@subject/CREATE_REQUEST',
    CREATE_SUCCESS = '@subject/CREATE_SUCCESS',
    CREATE_FAILURE = '@subject/CREATE_FAILURE',

    FIND_REQUEST = '@subject/FIND_REQUEST',
    FIND_SUCCESS = '@subject/FIND_SUCCESS',
    FIND_FAILURE = '@subject/FIND_FAILURE',

    LOAD_REQUEST = '@subject/LOAD_REQUEST',
    LOAD_SUCCESS = '@subject/LOAD_SUCCESS',
    LOAD_FAILURE = '@subject/LOAD_FAILURE',

    UPDATE_REQUEST = '@subject/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@subject/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@subject/UPDATE_FAILURE',

    CHANGE_REMOVE_MODAL = '@subject/CHANGE_REMOVE_MODAL',
    REMOVE_REQUEST = '@subject/REMOVE_REQUEST',
    REMOVE_SUCCESS = '@subject/REMOVE_SUCCESS',
    REMOVE_FAILURE = '@subject/REMOVE_FAILURE',
}

interface ICreateState extends IComponentState {
    readonly subject: Subjects
    readonly data: ErrorEvent
}

interface IListState extends IComponentState {
    readonly subjects: Subjects[]
    readonly data: ErrorEvent
    readonly paginator: IPaginator
}

interface IRemoveState extends IComponentState {
    readonly visibilityModal: boolean
    readonly idForRemove: string
}

export interface ISubjectState {
    readonly createSubject: ICreateState
    readonly listSubjects: IListState
    readonly removeSubject: IRemoveState
}