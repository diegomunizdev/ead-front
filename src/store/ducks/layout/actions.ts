
import { action } from 'typesafe-actions'
import { LayoutTypes } from './types'

export const changeUsername = (data: string) => action(LayoutTypes.CHANGE_USERNAME, { username: data })
