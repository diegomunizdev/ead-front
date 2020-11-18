import { yupToFormErrors } from 'formik'
import * as Yup from 'yup'

export class ClassesValidator {
    private static _record: Yup.StringSchema<string> = Yup.string()
        .required('Registre uma aula')

    private static _date: Yup.StringSchema<string> = Yup.string()
        .required('Informa a data da aula')

    static get ValidationScheme(): Yup.ObjectSchema<object | undefined> {
        return Yup
            .object()
            .shape({
                record: this.record,
                date: this.date
            })
    }

    static get record(): Yup.StringSchema<string> {
        return this._record
    }

    static get date(): Yup.StringSchema<string> {
        return this._date
    }
}