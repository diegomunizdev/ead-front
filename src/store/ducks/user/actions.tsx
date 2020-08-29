import { action } from 'typesafe-actions'
import { ICredentials, UserActionTypes } from './types'
import { IPaginator } from '../root.types'
import User, { UserTypes } from '../../application/models/user/user'
import { IAxiosResponse } from '../root.types'

/* Actions for Reset State */
export const resetCreateUser = () => action(UserActionTypes.RESET_CREATE_USER, {})

/* Actions for Change */
export const changeUser = (user: User) => action(UserActionTypes.CHANGE_USER, { user })

export const changePaginator = (userType: UserTypes, paginator: IPaginator) => [
    action(UserActionTypes.CHANGE_PAGINATOR, {
        userType,
        paginator
    }),
    loadUsers(userType, paginator)
]

export const changeRemoveModal = (visibilityModal: boolean, userIdForRemove: string) => action(UserActionTypes.CHANGE_REMOVE_MODAL, {
    visibilityModal,
    userIdForRemove
})

/* Actions for Create User */
export const createUser = (user: User) => action(UserActionTypes.CREATE_REQUEST, { user })

export const createSuccess = (user: User) => action(UserActionTypes.CREATE_SUCCESS, { user })

export const createFailure = (error: ErrorEvent) => action(UserActionTypes.CREATE_FAILURE, { error })

/* Actions for Find User */
export const findUser = (userId: string) => action(UserActionTypes.FIND_REQUEST, { userId })

export const findSuccess = (user: User) => action(UserActionTypes.FIND_SUCCESS, { user })

export const findFailure = (error: ErrorEvent) => action(UserActionTypes.FIND_FAILURE, { error })

/* Actions for Update User */
export const updateUser = (user: User) => action(UserActionTypes.UPDATE_REQUEST, { user })

export const updateSuccess = (user: User) => action(UserActionTypes.UPDATE_SUCCESS, { user })

export const updateFailure = (error: ErrorEvent) => action(UserActionTypes.UPDATE_FAILURE, { error })

/* Actions for Remove User */
export const removeUser = (userIdForRemove: string, userType: UserTypes) => action(UserActionTypes.REMOVE_REQUEST, {
    userIdForRemove,
    userType
})

export const removeSuccess = () => action(UserActionTypes.REMOVE_SUCCESS, {})

export const removeFailure = (error: ErrorEvent) => action(UserActionTypes.REMOVE_FAILURE, { error })

/* Actions for Load User */
export const loadUsers = (userType: UserTypes, paginator?: IPaginator) => action(UserActionTypes.LOAD_USERS_REQUEST, {
    userType,
    paginator
})

export const loadUsersSuccess = (userType: UserTypes, response: IAxiosResponse<User[]>) => action(UserActionTypes.LOAD_USERS_SUCCESS, {
    userType,
    users: response.data,
    headers: response.headers
})

export const loadUsersFailure = (userType: UserTypes, error: ErrorEvent) => action(UserActionTypes.LOAD_USERS_FAILURE, {
    userType,
    error
})