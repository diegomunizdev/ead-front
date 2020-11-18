import * as Yup from 'yup'

export class ExerciseValidator {
    private static _title: Yup.StringSchema<string> = Yup.string()
        .required('Informe o título do Exercício')

    private static _description: Yup.StringSchema<string> = Yup.string()
        .required('Informe a descrição do exercício')

    private static _delivery: Yup.StringSchema<string> = Yup.string()
        .required('Informe a data de entrega')

    private static _urlVideo: Yup.StringSchema<string | undefined> = Yup.string()
        .notRequired()

    private static _file: Yup.StringSchema<string | undefined> = Yup.string()
        .notRequired()

    static get title(): Yup.StringSchema<string> {
        return this._title
    }

    static get description(): Yup.StringSchema<string> {
        return this._description
    }

    static get delivery(): Yup.StringSchema<string> {
        return this._delivery
    }

    static get urlVideo(): Yup.StringSchema<string | undefined> {
        return this._urlVideo
    }

    static get file(): Yup.StringSchema<string | undefined> {
        return this._file
    }

    static get ValidationScheme(): Yup.ObjectSchema<object | undefined> {
        return Yup.object()
            .shape({
                title: this.title,
                description: this.description,
                delivery: this.delivery,
                urlVideo: this.urlVideo,
                file: this.file
            })
    }
}