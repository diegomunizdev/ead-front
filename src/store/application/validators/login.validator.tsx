import * as Yup from 'yup'

export class LoginValidator {
    private static _username: Yup.StringSchema<string> = Yup.string()
        .required('Informe um nome de usuário válido')

    private static _password: Yup.StringSchema<string> = Yup.string()
        .required('Informe uma senha válida')

    static get ValidationScheme(): Yup.ObjectSchema<object | undefined> {
        return Yup
            .object()
            .shape({
                username: this.username,
                password: this.password
            })
    }

    static get username(): Yup.StringSchema<string> {
        return this._username
    }

    static get password(): Yup.StringSchema<string> {
        return this._password
    }
}