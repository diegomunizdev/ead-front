import { action } from 'typesafe-actions'
import Classes from '../../application/models/classes.model'
import { IAxiosResponse, IPaginator } from '../root.types'
import { ClassesTypes } from './types'

export const resetClasse = () => action(ClassesTypes.RESET_CREATE_CLASSES, {})

export const changeClasse = (classe: Classes) => action(ClassesTypes.CHANGE_CLASSES, { classe })

export const changePaginator = (subjectId: string, paginator?: IPaginator) => [
    action(ClassesTypes.CHANGE_PAGINATOR, {
        subjectId,
        paginator
    })
]

/* Actions for create classes */
export const createClassesRequest = (classe: Classes) => action(ClassesTypes.CREATE_REQUEST, { classe })

export const createClassesSuccess = (classe: Classes) => action(ClassesTypes.CREATE_SUCCESS, { classe })

export const createClassesFailute = (error: ErrorEvent) => action(ClassesTypes.CREATE_FAILURE, { error })

/* Actions for find classes */
export const findClassesRequest = (classesId: string) => action(ClassesTypes.FIND_REQUEST, { classesId })

export const findClassesSuccess = (response: IAxiosResponse<Classes[]>) => action(ClassesTypes.FIND_SUCCESS, {
    classe: response.data,
    headers: response.headers
})

export const findClassesFailure = (error: ErrorEvent) => action(ClassesTypes.FIND_FAILURE, { error })

/* Actions for laod classes */
export const loadClassesRequest = (subjectId: string, paginator?: IPaginator) => action(ClassesTypes.LOAD_REQUEST, {
    subjectId,
    paginator
})

export const loadClassesSuccess = (response: IAxiosResponse<Classes[]>) => action(ClassesTypes.LOAD_SUCCESS, {
    classes: response.data,
    headers: response.headers
})

export const loadClassesFailute = (error: ErrorEvent) => action(ClassesTypes.LOAD_FAILURE, { error })

/* Actions for update classes */
export const updateClassesRequest = (classe: Classes) => action(ClassesTypes.UPDATE_REQUEST, { classe })

export const updateClassesSuccess = (classe: Classes) => action(ClassesTypes.UPDATE_SUCCESS, { classe })

export const updateClassesFailure = (error: ErrorEvent) => action(ClassesTypes.UPDATE_FAILURE, { error })

/* Actions for remove */
export const removeClassesRequest = (idForRemove: string) => action(ClassesTypes.REMOVE_REQUEST, { idForRemove })

export const removeClassesSuccess = () => action(ClassesTypes.REMOVE_SUCCESS, {})

export const removeClassesFailure = (error: ErrorEvent) => action(ClassesTypes.REMOVE_FAILURE, { error })