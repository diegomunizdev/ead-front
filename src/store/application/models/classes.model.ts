import { JsonUtils } from '../utils/json.util'

export default class Classes {
    private _id: string | undefined
    private _created_at: string | undefined
    private _record: string | undefined
    private _date: string | undefined
    private _subjectId: string | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._record = ''
        this._date = ''
        this._subjectId = ''
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

    get record(): string | undefined {
        return this._record
    }

    set record(value: string | undefined) {
        this._record = value
    }

    get date(): string | undefined {
        return this._date
    }

    set date(value: string | undefined) {
        this._date = value
    }

    get subjectId(): string | undefined {
        return this._subjectId
    }

    set subjectId(value: string | undefined) {
        this._subjectId = value
    }

    public fromJSON(json: any): Classes {
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

        if (json.record !== undefined) {
            this._record = json.record
        }

        if (json.date !== undefined) {
            this._date = json.date
        }

        if (json.subjectId !== undefined) {
            this._subjectId = json.subjectId
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            record: this.record ? this.record : undefined,
            date: this.date ? this.date : undefined,
            subjectId: this.subjectId ? this.subjectId : undefined
        }
    }
}