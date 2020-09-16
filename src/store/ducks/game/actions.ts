import { action } from 'typesafe-actions'
import { GameActionTypes } from './types'
import Game from '../../application/models/game.model'
import { IAxiosResponse, IPaginator } from '../root.types'

export const resetGame = () => action(GameActionTypes.RESET_CREATE_GAME, {})

export const changeGame = (game: Game) => action(GameActionTypes.CHANGE_GAME, { game })

export const changePaginator = (period?: string, paginator?: IPaginator) => [
    action(GameActionTypes.CHANGE_PAGINATOR, {
        period,
        paginator
    }),
    loadGameRequest(paginator)
]

/* Actions for create */
export const createGameRequest = (game: Game) => action(GameActionTypes.CREATE_REQUEST, { game })

export const createGameSuccess = (game: Game) => action(GameActionTypes.CREATE_SUCCESS, { game })

export const createGameFailure = (error: ErrorEvent) => action(GameActionTypes.CREATE_FAILURE, { error })

/* Action for find */
export const findGameRequest = (period: string) => action(GameActionTypes.FIND_REQUEST, { period })

export const findGameSuccess = (response: IAxiosResponse<Game[]>) => action(
    GameActionTypes.FIND_SUCCESS, {
    game: response.data,
    headers: response.headers
})

export const findGameFailure = (error: ErrorEvent) => action(GameActionTypes.FIND_FAILURE, { error })

/* Action for load */
export const loadGameRequest = (paginator?: IPaginator) => action(GameActionTypes.LOAD_REQUEST, { paginator })

export const loadGameSuccess = (response: IAxiosResponse<Game[]>) => action(
    GameActionTypes.LOAD_SUCCESS, {
    games: response.data,
    headers: response.headers
})

export const loadGameFailure = (error: ErrorEvent) => action(GameActionTypes.LOAD_FAILURE, { error })

/* Actions for update */
export const updateGameRequest = (game: Game) => action(GameActionTypes.UPDATE_REQUEST, { game })

export const updateGameSuccess = (game: Game) => action(GameActionTypes.UPDATE_SUCCESS, { game })

export const updateGameFailure = (error: ErrorEvent) => action(GameActionTypes.UPDATE_FAILURE, { error })

/* Actions for remove */
export const removeGameRequest = (idForRemove: string) => action(GameActionTypes.REMOVE_REQUEST, { idForRemove })

export const removeGameSuccess = () => action(GameActionTypes.REMOVE_SUCCESS, {})

export const removeGameFailure = (error: ErrorEvent) => action(GameActionTypes.REMOVE_FAILURE, { error })