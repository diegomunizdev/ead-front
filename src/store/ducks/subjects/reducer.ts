import { Reducer } from 'redux'
import Subject from '../../application/models/subjects.model'
import { ISubjectState, SubjectsTypes } from './types'

const INITIAL_STATE: ISubjectState = {
    createSubject: {
        subject: new Subject(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false
    },
    listSubjects: {
        subjects: [],
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
    removeSubject: {
        visibilityModal: false,
        idForRemove: '',
        loading: false,
        error: false,
        success: false
    }
}

const reducer: Reducer<ISubjectState> = (state: ISubjectState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SubjectsTypes.RESET_CREATE_SUBJECT:
            return {
                ...state,
                createSubject: INITIAL_STATE.createSubject
            }

        case SubjectsTypes.CHANGE_SUBJECT:
            const { subject } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    loading: false,
                    error: false,
                    success: false,
                    subject: new Subject().fromJSON(subject)
                }
            }

        case SubjectsTypes.CHANGE_PAGINATOR:
            const { paginator } = action.payload
            return {
                ...state,
                listSubjects: {
                    ...state.listSubjects,
                    paginator
                }
            }

        case SubjectsTypes.CREATE_REQUEST:
            const { sucject: subjectCreateRequest } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    loading: true,
                    subject: subjectCreateRequest
                }
            }

        case SubjectsTypes.CREATE_SUCCESS:
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    subject: new Subject(),
                    success: true
                }
            }

        case SubjectsTypes.CREATE_FAILURE:
            const { error: createError } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    error: true,
                    data: createError
                }
            }

        case SubjectsTypes.FIND_REQUEST:
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    loading: true
                }
            }

        case SubjectsTypes.FIND_SUCCESS:
            const { subject: subjectFound } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    subject: new Subject().fromJSON(subjectFound)
                }
            }

        case SubjectsTypes.FIND_FAILURE:
            const { error: findError } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    error: true,
                    data: findError
                }
            }

        case SubjectsTypes.LOAD_REQUEST:
            return {
                ...state,
                listSubjects: {
                    ...state.listSubjects,
                    loading: true
                }
            }

        case SubjectsTypes.LOAD_SUCCESS:
            const { subjects, headers } = action.payload
            return {
                ...state,
                listSubjects: {
                    ...state.listSubjects,
                    subjects,
                    paginator: {
                        ...state.listSubjects.paginator,
                        totalRecords: parseInt(headers['x-total-count'], 10)
                    }
                }
            }

        case SubjectsTypes.LOAD_FAILURE:
            const { error: loadError } = action.payload
            return {
                ...state,
                listSubjects: {
                    ...state.listSubjects,
                    error: true,
                    data: loadError
                }
            }

        case SubjectsTypes.UPDATE_REQUEST:
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    loading: true
                }
            }

        case SubjectsTypes.UPDATE_SUCCESS:
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    loading: false
                }
            }

        case SubjectsTypes.UPDATE_FAILURE:
            const { error: updateError } = action.payload
            return {
                ...state,
                createSubject: {
                    ...state.createSubject,
                    error: true,
                    data: updateError
                }
            }

        case SubjectsTypes.CHANGE_REMOVE_MODAL:
            const { visibilityModal, idForRemove } = action.payload
            return {
                ...state,
                removeSubject: {
                    ...state.removeSubject,
                    visibilityModal,
                    idForRemove
                }
            }

        case SubjectsTypes.REMOVE_REQUEST:
            return {
                ...state,
                removeSubject: {
                    ...state.removeSubject,
                    loading: true
                }
            }

        case SubjectsTypes.REMOVE_SUCCESS:
            return {
                ...state,
                removeSubject: {
                    ...state.removeSubject,
                    success: true,
                    idForRemove: ''
                }
            }

        case SubjectsTypes.REMOVE_FAILURE:
            return {
                ...state,
                removeSubject: {
                    ...state.removeSubject,
                    error: true,
                    visibilityModal: true
                }
            }

        default:
            return state;
    }
}

export default reducer