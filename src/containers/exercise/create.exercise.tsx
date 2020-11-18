import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Field, Form, Formik } from 'formik'
import * as ExerciseActions from '../../store/ducks/exercises/actions'
import { Toast } from '../../services/toast.service'
import { IApplicationState } from '../../store'
import NameHeader from '../../components/shared/name.header'
import { Card } from 'primereact/card'
import { FormErrorMessage } from '../../components/form.error/form.error.message'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import Exercise from '../../store/application/models/exercise.model'
import { ExerciseValidator } from '../../store/application/validators/exercise.validator'
import { FileUpload } from 'primereact/fileupload';

interface IState {
    readonly exercise: Exercise
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetExercise(): void
    findExerciseRequest(subjectId: string): void
    changeExercise(exercise: Exercise): void
    createExerciseRequest(exercise: Exercise): void
    updateExerciseRequest(exercise: Exercise): void
}

type Props = IState & IDispatchProps

class CreateClasses extends Component<Props> {

    private spinnerMessage: string
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.spinnerMessage = ''
        this.toastService = Toast.getInstance()

        const { findExerciseRequest, changeExercise, match: { params } } = this.props
        if (params && params.subjectId) {
            changeExercise(new Exercise().fromJSON({
                ...this.props,
                subjectId: params.subjectId
            }))
            this.spinnerMessage = 'Buscando exercício...'
            findExerciseRequest(params.subjectId)
        }
    }

    public handleSubmit = async (values) => {
        const { createExerciseRequest, updateExerciseRequest } = this.props
        const exercise = new Exercise().fromJSON({ ...values })
        console.log('exercise: ', exercise)
        /* if (exercise.id) {
            this.spinnerMessage = 'Atualizando exercício...'
            updateExerciseRequest(exercise)
        } else { */
        this.spinnerMessage = 'Registrando exercício...'
        createExerciseRequest(exercise)
        /* } */

    }

    public componentWillUnmount(): void {
        this.props.resetExercise()
    }

    public render() {

        const { exercise } = this.props
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-copy" nameHeader="Exercício" />

                    <Card className="fade-in-down">
                        <Formik
                            initialValues={{ ...exercise.toJSON() }}
                            onSubmit={this.handleSubmit}
                            enableReinitialize={true}
                            validationSchema={ExerciseValidator.ValidationScheme}>
                            {({ isValid, resetForm, values }) => (
                                <Form>
                                    <Fieldset legend="Novo Exercício">

                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="title" id="title" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="title"
                                                                className="input-container"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('title', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('title', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="title">Título</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="title" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="description" id="description" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="description"
                                                                className="input-container"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('description', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('description', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="description">Descrição do Exercício</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="description" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="delivery" id="delivery" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <InputText
                                                                id="delivery"
                                                                className="input-container"
                                                                type="date"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('delivery', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('delivery', true, true)
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="delivery" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="urlVideo" id="urlVideo" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="urlVideo"
                                                                className="input-container"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('urlVideo', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('urlVideo', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="urlVideo">Vídeo aula / YouTube</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="urlVideo" />
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                <Field name="file" id="file" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="delivery"
                                                                className="input-container"
                                                                type="file"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('file', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('file', true, true)
                                                                }}
                                                            />
                                                            {/* <label htmlFor="file">Arquivo / Material</label> */}
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="file" />
                                            </div>
                                        </div>
                                    </Fieldset>

                                    <div className="d-flex justify-content-between">

                                        <Button
                                            style={{ marginTop: '10px' }}
                                            tooltip="Voltar"
                                            type="button"
                                            onClick={() => this.props.history.goBack()}
                                            icon="pi pi-arrow-left"
                                            className="p-button-raised p-button-secondary" />

                                        <Button
                                            style={{ marginTop: '10px' }}
                                            disabled={!isValid}
                                            label="Registrar"
                                            type="submit"
                                            icon="pi pi-save"
                                            onClick={() => this.props.history.goBack()}
                                            className="p-button-raised p-button-primary" />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Card>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    exercise: state.exercise.createExercise.exercise,
    data: state.exercise.createExercise.data,
    loading: state.exercise.createExercise.loading,
    success: state.exercise.createExercise.success,
    error: state.exercise.createExercise.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...ExerciseActions
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClasses))