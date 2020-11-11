import { JsonUtils } from '../utils/json.util'
import User from './user/user'

export default class Subjects {
    private _id: string | undefined
    private _created_at: string | undefined
    private _name: string | undefined
    private _shift: string | undefined
    private _schedule: string | undefined
    private _period: string | undefined
    private _teacherId: string | undefined
    private _listStudent: User[] | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._name = ''
        this._shift = ''
        this._schedule = ''
        this._period = ''
        this._teacherId = ''
        this._listStudent = []
    }

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }

    get created_at(): string | undefined {
        return this._created_at
    }

    set created_at(value: string | undefined) {
        this._created_at = value
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get shift(): string | undefined {
        return this._shift
    }

    set shift(value: string | undefined) {
        this._shift = value
    }

    get schudule(): string | undefined {
        return this._schedule
    }

    set schudule(value: string | undefined) {
        this._schedule = value
    }

    get period(): string | undefined {
        return this._period
    }

    set period(value: string | undefined) {
        this._period = value
    }

    get teacherId(): string | undefined {
        return this._teacherId
    }

    set teacherId(value: string | undefined) {
        this._teacherId = value
    }

    get listStudent(): User[] | undefined {
        return this._listStudent
    }

    set listStudent(value: User[] | undefined) {
        this._listStudent = value
    }

    public fromJSON(json: any): Subjects {
        if (!json) {
            return this
        }

        if (typeof json === 'string') {
            if (!JsonUtils.isJSONString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) {
            this._id = json.id
        }

        if (json.created_at !== undefined) {
            this._created_at = json.created_at
        }

        if (json.name !== undefined) {
            this._name = json.name
        }

        if (json.shift !== undefined) {
            this._shift = json.shift
        }

        if (json.schedule !== undefined) {
            this._schedule = json.schedule
        }

        if (json.period !== undefined) {
            this._period = json.period
        }

        if (json.teacherId !== undefined) {
            this._teacherId = json.teacherId
        }

        if (json.listStudent !== undefined) {
            this._listStudent = json.listStudent
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            name: this.name ? this.name : undefined,
            shift: this.shift ? this.shift : undefined,
            schedule: this.schudule ? this.schudule : undefined,
            period: this.period ? this.period : undefined,
            teacherId: this.teacherId ? this.teacherId : undefined,
            listStudent: this.listStudent ? this.listStudent : undefined
        }
    }

}