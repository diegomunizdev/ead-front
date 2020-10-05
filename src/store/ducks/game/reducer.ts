import { Reducer } from 'redux'
import { IGameState, GameActionTypes } from './types'
import Game from '../../application/models/game.model'

const INITIAL_STATE: IGameState = {
    createGame: {
        game: new Game(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false
    },
    listGames: {
        games: [],
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
    removeGame: {
        visibilityModal: false,
        idForRemove: '',
        loading: false,
        error: false,
        success: false
    }
}

const reducer: Reducer<IGameState> = (state: IGameState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case GameActionTypes.RESET_CREATE_GAME:
            return {
                ...state,
                createGame: INITIAL_STATE.createGame
            }

        case GameActionTypes.CHANGE_GAME:
            const { game } = action.payload
            return {
                ...state,
                createGame: {
                    ...state.createGame,
                    loading: false,
                    error: false,
                    success: false,
                    game: new Game().fromJSON(game)
                }
            }



        case GameActionTypes.CHANGE_PAGINATOR:
            const { paginator } = action.payload
            return {
                ...state,
                listGames: {
                    ...state.listGames,
                    paginator
                }
            }

        case GameActionTypes.LOAD_REQUEST:
            return {
                ...state,
                listGames: {
                    ...state.listGames,
                    loading: true
                }
            }

        case GameActionTypes.LOAD_SUCCESS:
            const { games, headers } = action.payload
            return {
                ...state,
                listGames: {
                    ...state.listGames,
                    loading: false,
                    error: false,
                    success: false,
                    games,
                    paginator: {
                        ...state.listGames.paginator,
                        totalRecords: parseInt(headers['x-total-count'], 10)
                    }
                }
            }

        case GameActionTypes.LOAD_FAILURE:
            const { error: loadError } = action.payload
            return {
                ...state,
                listGames: {
                    ...state.listGames,
                    loading: false,
                    success: false,
                    error: true,
                    data: loadError
                }
            }

        case GameActionTypes.UPDATE_REQUEST:
            return {
                ...state,
                createGame: {
                    ...state.createGame,
                    loading: true
                }
            }

        case GameActionTypes.UPDATE_SUCCESS:
            return {
                ...state,
                createGame: {
                    ...state.createGame,
                    loading: false,
                }
            }

        case GameActionTypes.UPDATE_FAILURE:
            const { error: updateError } = action.payload
            return {
                ...state,
                createGame: {
                    ...state.createGame,
                    loading: false,
                    error: true,
                    success: false,
                    data: updateError
                }
            }


        default:
            return state;
    }
}

export default reducer