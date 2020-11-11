import { strictEqual } from 'assert'
import { Reducer } from 'redux'
import Classes from '../../application/models/classes.model'
import { ClassesTypes, IClassesState } from './types'

export const INITIAL_STATE: IClassesState = {
    createClasses: {
        classe: new Classes(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false
    },
    listClasses: {
        classes: [],
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
    removeClasses: {
        visibilityModal: false,
        idForRemove: '',
        loading: false,
        error: false,
        success: false
    }
}

const reducer: Reducer<IClassesState> = (state: IClassesState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ClassesTypes.RESET_CREATE_CLASSES:
            return {
                ...state,
                createClasses: INITIAL_STATE.createClasses
            }

        case ClassesTypes.CHANGE_CLASSES:
            const { classe } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    classe: new Classes().fromJSON(classe)
                }
            }

        case ClassesTypes.CHANGE_PAGINATOR:
            const { paginator } = action.payload
            return {
                ...state,
                listClasses: {
                    ...state.listClasses,
                    paginator
                }
            }

        case ClassesTypes.CREATE_REQUEST:
            const { classe: classeCreate } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    loading: true,
                    classe: classeCreate
                }
            }

        case ClassesTypes.CREATE_SUCCESS:
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    classe: new Classes(),
                    success: true
                }
            }

        case ClassesTypes.CREATE_FAILURE:
            const { error: createError } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    error: true,
                    data: createError
                }
            }

        case ClassesTypes.FIND_REQUEST:
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    loading: true
                }
            }

        case ClassesTypes.FIND_SUCCESS:
            const { classe: classeFound } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    classe: new Classes().fromJSON(classeFound)
                }
            }

        case ClassesTypes.FIND_FAILURE:
            const { error: findError } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    error: true,
                    data: findError
                }
            }

        case ClassesTypes.LOAD_REQUEST:
            return {
                ...state,
                listClasses: {
                    ...state.listClasses,
                    loading: true
                }
            }

        case ClassesTypes.LOAD_SUCCESS:
            const { classes, headers } = action.payload
            return {
                ...state,
                listClasses: {
                    ...state.listClasses,
                    classes,
                    paginator: {
                        ...state.listClasses.paginator,
                        totalRecords: parseInt(headers['x-total-count'], 10)
                    }
                }
            }

        case ClassesTypes.LOAD_FAILURE:
            const { error: loadError } = action.payload
            return {
                ...state,
                listClasses: {
                    ...state.listClasses,
                    error: true,
                    data: loadError
                }
            }

        case ClassesTypes.UPDATE_REQUEST:
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    loading: true
                }
            }

        case ClassesTypes.UPDATE_SUCCESS:
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    loading: false
                }
            }

        case ClassesTypes.UPDATE_FAILURE:
            const { error: updateError } = action.payload
            return {
                ...state,
                createClasses: {
                    ...state.createClasses,
                    error: true,
                    data: updateError
                }
            }

        case ClassesTypes.CHANGE_REMOVE_MODAL:
            const { visibilityModal, idForRemove } = action.payload
            return {
                ...state,
                removeClasses: {
                    ...state.removeClasses,
                    visibilityModal,
                    idForRemove
                }
            }

        case ClassesTypes.REMOVE_REQUEST:
            return {
                ...state,
                removeClasses: {
                    ...state.removeClasses,
                    loading: true
                }
            }

        case ClassesTypes.REMOVE_SUCCESS:
            return {
                ...state,
                removeClasses: {
                    ...state.removeClasses,
                    success: true,
                    idForRemove: ''
                }
            }

        case ClassesTypes.REMOVE_FAILURE:
            return {
                ...state,
                removeClasses: {
                    ...state.removeClasses,
                    error: true,
                    visibilityModal: true
                }
            }

        default:
            return state
    }
}

export default reducer