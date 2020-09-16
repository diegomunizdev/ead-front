import Game from '../../application/models/game.model'
import { IPaginator, IComponentState } from '../root.types'

export enum GameActionTypes {
    RESET_CREATE_GAME = '@games/RESET_CREATE_GAME',
    CHANGE_GAME = '@games/CHANGE_GAME',
    CHANGE_PAGINATOR = '@games/CHANGE_PAGINATOR',

    CREATE_REQUEST = '@users/CREATE_REQUEST',
    CREATE_SUCCESS = '@users/CREATE_SUCCESS',
    CREATE_FAILURE = '@users/CREATE_FAILURE',

    FIND_REQUEST = '@games/FIND_REQUEST',
    FIND_SUCCESS = '@games/FIND_SUCCESS',
    FIND_FAILURE = '@games/FIND_FAILURE',

    LOAD_REQUEST = '@games/LOAD_REQUEST',
    LOAD_SUCCESS = '@games/LOAD_SUCCESS',
    LOAD_FAILURE = '@games/LOAD_FAILURE',

    UPDATE_REQUEST = '@games/UPDATE_REQUEST',
    UPDATE_SUCCESS = '@games/UPDATE_SUCCESS',
    UPDATE_FAILURE = '@games/UPDATE_FAILURE',

    CHANGE_REMOVE_MODAL = '@games/CHANGE_REMOVE_MODAL',
    REMOVE_REQUEST = '@games/REMOVE_REQUEST',
    REMOVE_SUCCESS = '@games/REMOVE_SUCCESS',
    REMOVE_FAILURE = '@games/REMOVE_FAILURE',
}

interface ICreateState extends IComponentState {
    readonly game: Game
    readonly data: ErrorEvent
}

interface IListGames extends IComponentState {
    readonly games: Game[]
    readonly data: ErrorEvent
    readonly paginator: IPaginator
}

interface IRemoveState extends IComponentState {
    readonly visibilityModal: boolean
    readonly idForRemove: string
}

export interface IGameState {
    readonly createGame: ICreateState
    readonly listGames: IListGames
    readonly removeGame: IRemoveState
}