import * as Yup from 'yup'

export class SubjectValidator {
    private static _names: Yup.StringSchema<string> = Yup.string()
        .required('Informe o nome da disciplina')

    private static _shift: Yup.StringSchema<string> = Yup.string()
        .required('Informe o turno')

    private static _schedule: Yup.StringSchema<string> = Yup.string()
        .required('Informe o Horário')

    private static _period: Yup.StringSchema<string> = Yup.string()
        .required('Informa o período da disciplina')

    private static _teacherId: Yup.StringSchema<string | undefined> = Yup.string()
        .notRequired()

    static get ValidationScheme(): Yup.ObjectSchema<object | undefined> {
        return Yup
            .object()
            .shape({
                name: this.names,
                shift: this.shift,
                schedule: this.schedule,
                period: this.period,
                teacherId: this.teacherId
            })
    }

    static get names(): Yup.StringSchema<string> {
        return this._names
    }

    static get shift(): Yup.StringSchema<string> {
        return this._shift
    }

    static get schedule(): Yup.StringSchema<string> {
        return this._schedule
    }

    static get period(): Yup.StringSchema<string> {
        return this._period
    }

    static get teacherId(): Yup.StringSchema<string | undefined> {
        return this._teacherId
    }
}