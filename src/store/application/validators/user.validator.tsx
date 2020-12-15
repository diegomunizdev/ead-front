import * as Yup from 'yup'
import { UserTypes } from '../models/user/user'

export class UserValidator {
    // NOTE Deixar apena name da conflito com 'Function.name'
    private static _names: Yup.StringSchema<string> = Yup.string()
        .required('Nome é obrigatório')

    private static _email: Yup.StringSchema<string> = Yup.string()
        .required('Email é obrigatório')

    private static _password: Yup.StringSchema<string> = Yup.string()
        .required("Senha é obrigatória")

    private static _type: Yup.StringSchema<string> = Yup.string()
        .required('Tipo de usuário é obrigatório')
        .oneOf(Object.values(UserTypes))

    private static _period: Yup.StringSchema<string> = Yup.string()
        .required('Período é obrigatório')

    private static _gamePoints: Yup.NumberSchema<number | undefined> = Yup.number()
        .notRequired()

    private static _noteOne: Yup.NumberSchema<number | undefined> = Yup.number()
        .notRequired()

    private static _noteTwo: Yup.NumberSchema<number | undefined> = Yup.number()
        .notRequired()

    private static _noteThree: Yup.NumberSchema<number | undefined> = Yup.number()
        .notRequired()

    private static _noteFour: Yup.NumberSchema<number | undefined> = Yup.number()
        .notRequired()

    static get names(): Yup.StringSchema<string> {
        return this._names
    }

    static get email(): Yup.StringSchema<string> {
        return this._email
    }

    static get password(): Yup.StringSchema<string> {
        return this._password
    }

    static get type(): Yup.StringSchema<string> {
        return this._type
    }

    static get period(): Yup.StringSchema<string> {
        return this._period
    }

    static get gamePoints(): Yup.NumberSchema<number | undefined> {
        return this._gamePoints
    }

    static get noteOne(): Yup.NumberSchema<number | undefined> {
        return this._noteOne
    }

    static get noteTwo(): Yup.NumberSchema<number | undefined> {
        return this._noteTwo
    }

    static get noteThree(): Yup.NumberSchema<number | undefined> {
        return this._noteThree
    }

    static get noteFour(): Yup.NumberSchema<number | undefined> {
        return this._noteFour
    }

    static get ValidationSchema(): Yup.ObjectSchema<object | undefined> {
        return Yup
            .object()
            .shape({
                name: this.names,
                email: this.email,
                password: this.password,
                type: this.type,
                period: this.period,
                gamePoints: this.gamePoints,
                noteOne: this.noteOne,
                noteTwo: this.noteTwo,
                noteThree: this.noteThree,
                noteFour: this.noteFour
            })
    }

}