import { JsonUtils } from '../../utils/json.util'

export enum UserTypes {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    TUTOR = 'tutor',
    STUDENT = 'student'
}

export default class User {
    private _id: string | undefined
    private _created_at: string | undefined
    private _name: string | undefined
    private _email: string | undefined
    private _password: string | undefined
    private _avatar: string | undefined
    private _type: UserTypes | undefined
    private _period: string | undefined
    private _gamePoints: number | undefined
    private _noteOne: number | undefined
    private _noteTwo: number | undefined
    private _noteThree: number | undefined
    private _noteFour: number | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._name = ''
        this._email = ''
        this._password = ''
        this._avatar = ''
        this._type = '' as UserTypes
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

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }


    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    get password(): string | undefined {
        return this._password
    }

    set password(value: string | undefined) {
        this._password = value
    }

    get avatar(): string | undefined {
        return this._avatar
    }

    set avatar(value: string | undefined) {
        this._avatar = value
    }

    get type(): UserTypes | undefined {
        return this._type
    }

    set type(value: UserTypes | undefined) {
        this._type = value
    }

    get period(): string | undefined {
        return this._period
    }

    set period(value: string | undefined) {
        this._period = value
    }

    get gamePoints(): number | undefined {
        return this._gamePoints
    }

    set gamePoints(value: number | undefined) {
        this._gamePoints = value
    }

    get noteOne(): number | undefined {
        return this._noteOne
    }

    set noteOne(value: number | undefined) {
        this._noteOne = value
    }

    get noteTwo(): number | undefined {
        return this._noteTwo
    }

    set noteTwo(value: number | undefined) {
        this._noteTwo = value
    }

    get noteThree(): number | undefined {
        return this._noteThree
    }

    set noteThree(value: number | undefined) {
        this._noteThree = value
    }

    get noteFour(): number | undefined {
        return this._noteFour
    }

    set noteFour(value: number | undefined) {
        this._noteFour = value
    }

    public fromJSON(json: any): User {
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

        if (json.email !== undefined) {
            this._email = json.email
        }

        if (json.password !== undefined) {
            this._password = json.password
        }

        if (json.avatar !== undefined) {
            this._avatar = json.avatar
        }

        if (json.type !== undefined) {
            this._type = json.type
        }

        if (json.period !== undefined) {
            this._period = json.period
        }

        if (json.gamePoints !== undefined) {
            this._gamePoints = json.gamePoints
        }

        if (json.noteOne !== undefined) {
            this._noteOne = json.noteOne
        }

        if (json.noteTwo !== undefined) {
            this._noteTwo = json.noteTwo
        }

        if (json.noteThree !== undefined) {
            this._noteThree = json.noteThree
        }

        if (json.noteFour !== undefined) {
            this._noteFour = json.noteFour
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            name: this.name ? this.name : undefined,
            email: this.email ? this.email : undefined,
            password: this.password ? this.password : undefined,
            avatar: this.avatar ? this.avatar : undefined,
            type: this.type ? this.type : undefined,
            period: this.period ? this.period : undefined,
            gamePoints: this.gamePoints ? this.gamePoints : undefined,
            noteOne: this.noteOne ? this.noteOne : undefined,
            noteTwo: this.noteTwo ? this.noteTwo : undefined,
            noteThree: this.noteThree ? this.noteThree : undefined,
            noteFour: this.noteFour ? this.noteFour : undefined
        }
    }
}

