import { IAccessToken } from '../../../ducks/auth/types'
import { UserTypes } from './user'


export default class AccessToken implements IAccessToken {
    private _id: string
    private _exp: number
    private _iat: number
    private _type: UserTypes

    constructor() {
        this._id = ''
        this._exp = 0
        this._iat = 0
        this._type = '' as UserTypes
    }

    get id(): string {
        return this._id
    }

    set id(value: string) {
        this._id = value
    }

    get exp(): number {
        return this._exp
    }

    set exp(value: number) {
        this._exp = value
    }

    get iat(): number {
        return this._iat
    }

    set iat(value: number) {
        this._iat = value
    }

    get type(): UserTypes {
        return this._type
    }

    set type(value: UserTypes) {
        this._type = value
    }
}