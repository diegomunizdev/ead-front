import { JsonUtils } from '../utils/json.util'

export default class Game {
    private _id: string | undefined
    private _created_at: string | undefined
    private _question: string | undefined
    private _options: string[] | undefined
    private _rightAnswers: string | undefined
    private _period: string | undefined
    private _points: number | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._question = ''
        this._options = []
        this._rightAnswers = ''
        this._period = ''
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

    get question(): string | undefined {
        return this._question
    }

    set question(value: string | undefined) {
        this._question = value
    }

    get options(): string[] | undefined {
        return this._options
    }

    set options(value: string[] | undefined) {
        this._options = value
    }

    get rightAnswers(): string | undefined {
        return this._rightAnswers
    }

    set rightAnswers(value: string | undefined) {
        this._rightAnswers = value
    }

    get period(): string | undefined {
        return this._period
    }

    set period(value: string | undefined) {
        this._period = value
    }

    get points(): number | undefined {
        return this._points
    }

    set points(value: number | undefined) {
        this._points = value
    }

    public fromJSON(json: any): Game {
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

        if (json.question !== undefined) {
            this._question = json.question
        }

        if (json.options !== undefined) {
            this._options = json.options
        }

        if (json.rightAnswers !== undefined) {
            this._rightAnswers = json.rightAnswers
        }

        if (json.period !== undefined) {
            this._period = json.period
        }

        if (json.points !== undefined) {
            this._points = json.points
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            question: this.question ? this.question : undefined,
            options: this.options ? this.options : undefined,
            rightAnswers: this.rightAnswers ? this.rightAnswers : undefined,
            period: this.period ? this.period : undefined,
            points: this.points ? this.points : undefined
        }
    }


}