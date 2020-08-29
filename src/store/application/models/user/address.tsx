import { JsonUtils } from '../../utils/json.util'

export enum FuTypes {
    PARAIBA = 'paraiba'
}

export enum CityTypes {
    CAMPINA_GRANDE = 'campina grande'
}

export default class Address {
    private _id: string | undefined
    private _created_at: string | undefined
    private _street: string | undefined
    private _number: string | undefined
    private _zip_code: string | undefined
    private _neighborhood: string | undefined
    private _city: CityTypes | undefined
    // _fu -> Federation unity
    private _fu: FuTypes | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._street = ''
        this._zip_code = ''
        this._neighborhood = ''
        this._city = '' as CityTypes
        this._fu = '' as FuTypes
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

    get street(): string | undefined {
        return this._street
    }

    set street(value: string | undefined) {
        this._street = value
    }

    get number(): string | undefined {
        return this._number
    }

    set number(value: string | undefined) {
        this._number = value
    }

    get zip_code(): string | undefined {
        return this._zip_code
    }

    set zip_code(value: string | undefined) {
        this._zip_code = value
    }

    get neighborhood(): string | undefined {
        return this._neighborhood
    }

    set neighborhood(value: string | undefined) {
        this._neighborhood = value
    }

    get city(): CityTypes | undefined {
        return this._city
    }

    set city(value: CityTypes | undefined) {
        this._city = value
    }

    get fu(): FuTypes | undefined {
        return this._fu
    }

    set fu(value: FuTypes | undefined) {
        this._fu = value
    }

    public fromJSON(json: any): Address {
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

        if (json.street !== undefined) {
            this._street = json.street
        }

        if (json.number !== undefined) {
            this._number = json.number
        }

        if (json.zip_code !== undefined) {
            this._zip_code = json.zip_code
        }

        if (json.neighborhood !== undefined) {
            this._neighborhood = json.neighborhood
        }

        if (json.city !== undefined) {
            this._city = json.city
        }

        if (json.fu !== undefined) {
            this._fu = json.fu
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            street: this.street ? this.street : undefined,
            number: this.number ? this.number : undefined,
            zip_code: this.zip_code ? this.zip_code : undefined,
            neighborhood: this.neighborhood ? this.neighborhood : undefined,
            city: this.city ? this.city : undefined,
            fu: this.fu ? this.fu : undefined
        }
    }
}