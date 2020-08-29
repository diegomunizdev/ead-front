import { JsonUtils } from '../../utils/json.util'

export enum UserTypes {
    ADMIN = 'admin',
    CLIENT = 'client',
    PERSONAL_TRAINER = 'personal_trainer'
}

export default class User {
    private _id: string | undefined
    private _created_at: string | undefined
    private _name: string | undefined
    private _username: string | undefined
    private _cpf: string | undefined
    private _email: string | undefined
    private _password: string | undefined
    private _type: UserTypes | undefined
    private _genre: string | undefined
    private _date_of_birth: string | undefined
    private _phone: string | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._name = ''
        this._username = ''
        this._cpf = ''
        this._email = ''
        this._password = ''
        this._type = '' as UserTypes
        this._genre = ''
        this._date_of_birth = ''
        this._phone = ''
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

    get username(): string | undefined {
        return this._username
    }

    set username(value: string | undefined) {
        this._username = value
    }

    get cpf(): string | undefined {
        return this._cpf
    }

    set cpf(value: string | undefined) {
        this._cpf = value
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

    get type(): UserTypes | undefined {
        return this._type
    }

    set type(value: UserTypes | undefined) {
        this._type = value
    }

    get genre(): string | undefined {
        return this._genre
    }

    set genre(value: string | undefined) {
        this._genre = value
    }

    get date_of_birth(): string | undefined {
        return this._date_of_birth
    }

    set date_of_birth(value: string | undefined) {
        this._date_of_birth = value
    }

    get phone(): string | undefined {
        return this._phone
    }

    set phone(value: string | undefined) {
        this._phone = value
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

        if (json.username !== undefined) {
            this._username = json.username
        }

        if (json.cpf !== undefined) {
            this._cpf = json.cpf
        }

        if (json.type !== undefined) {
            this._type = json.type
        }

        if (json.email !== undefined) {
            this._email = json.email
        }

        if (json.password !== undefined) {
            this._password = json.password
        }

        if (json.type !== undefined) {
            this._type = json.type
        }

        if (json.genre !== undefined) {
            this._genre = json.genre
        }

        if (json.date_of_birth !== undefined) {
            this._date_of_birth = json.date_of_birth
        }

        if (json.phone !== undefined) {
            this._phone = json.phone
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            name: this.name ? this.name : undefined,
            username: this.username ? this.username : undefined,
            cpf: this.cpf ? this.cpf : undefined,
            email: this.email ? this.email : undefined,
            password: this.password ? this.password : undefined,
            type: this.type ? this.type : undefined,
            genre: this.genre ? this.genre : undefined,
            date_of_birth: this.date_of_birth ? this.date_of_birth : undefined,
            phone: this.phone ? this.phone : undefined
        }
    }
}

