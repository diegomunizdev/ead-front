import * as Yup from 'yup'

export class LoginValidator {
    private static _email: Yup.StringSchema<string> = Yup.string()
        .required('Informe um email válido')

    private static _password: Yup.StringSchema<string> = Yup.string()
        .required('Informe uma senha válida')

    static get ValidationScheme(): Yup.ObjectSchema<object | undefined> {
        return Yup
            .object()
            .shape({
                email: this.email,
                password: this.password
            })
    }

    static get email(): Yup.StringSchema<string> {
        return this._email
    }

    static get password(): Yup.StringSchema<string> {
        return this._password
    }
}