import { action } from 'typesafe-actions'
import { SubjectsTypes } from './types'
import Subject from '../../application/models/subjects.model'
import { IAxiosResponse, IPaginator } from '../root.types'

export const resetSubject = () => action(SubjectsTypes.RESET_CREATE_SUBJECT, {})

export const changeSubject = (subject: Subject) => action(SubjectsTypes.CHANGE_SUBJECT, { subject })

export const changePaginator = (teacherId: string, paginator?: IPaginator) => [
    action(SubjectsTypes.CHANGE_PAGINATOR, { paginator }),
    loadSubjectRequest(teacherId, paginator),
    loadAllSubjectRequest(paginator)
]

/* Actions for create subjects */
export const createSubjectRequest = (subject: Subject) => action(SubjectsTypes.CREATE_REQUEST, { subject })

export const createSubjectSuccess = (subject: Subject) => action(SubjectsTypes.CREATE_SUCCESS, { subject })

export const createSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.CREATE_FAILURE, { error })

/* Action for find subject */
export const findSubjectRequest = (subjectId: string) => action(SubjectsTypes.FIND_REQUEST, { subjectId })

export const findSubjectSuccess = (response: IAxiosResponse<Subject[]>) => action(SubjectsTypes.FIND_SUCCESS, {
    subject: response.data,
    headers: response.headers
})

export const findSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.FIND_FAILURE, { error })

/* Actions for load all */
export const loadAllSubjectRequest = (paginator?: IPaginator) => action(SubjectsTypes.LOAD_ALL_REQUEST, { paginator })

export const loadAllSubjectSuccess = (response: IAxiosResponse<Subject[]>) => action(SubjectsTypes.LOAD_ALL_SUCCESS, {
    subjectsAll: response.data,
    headers: response.headers
})

export const loadAllSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.LOAD_ALL_FAILURE, { error })

/* Actions for load */
export const loadSubjectRequest = (teacherId: string, paginator?: IPaginator) => action(SubjectsTypes.LOAD_REQUEST, { teacherId, paginator })

export const loadSubjectSuccess = (response: IAxiosResponse<Subject[]>) => action(SubjectsTypes.LOAD_SUCCESS, {
    subjects: response.data,
    headers: response.headers
})

export const loadSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.LOAD_FAILURE, { error })

/* Actions for update */
export const updateSubjectRequest = (subject: Subject) => action(SubjectsTypes.UPDATE_REQUEST, { subject })

export const updateSubjectSuccess = (subject: Subject) => action(SubjectsTypes.UPDATE_SUCCESS, { subject })

export const updateSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.UPDATE_FAILURE, { error })

/*  Actions for remove */
export const removeSubjectRequest = (idForRemove: string) => [
    action(SubjectsTypes.REMOVE_REQUEST, { idForRemove }),
    loadAllSubjectRequest()
]

export const removeSubjectSuccess = () => action(SubjectsTypes.REMOVE_SUCCESS, {})

export const removeSubjectFailure = (error: ErrorEvent) => action(SubjectsTypes.REMOVE_FAILURE, { error })