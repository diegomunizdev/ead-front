import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Field, Form, Formik } from 'formik'
import * as ClassesActions from '../../store/ducks/classes/actions'
import * as SubjectActions from '../../store/ducks/subjects/actions'
import { Toast } from '../../services/toast'
import Classes from '../../store/application/models/classes.model'
import Subjects from '../../store/application/models/subjects.model'
import { IApplicationState } from '../../store'
import NameHeader from '../../components/shared/name.header'
import { Card } from 'primereact/card'
import { FormErrorMessage } from '../../components/form.error/form.error.message'
import { InputText } from 'primereact/inputtext'
import { ClassesValidator } from '../../store/application/validators/classes.validator'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'

interface IState {
    readonly classe: Classes
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean

    readonly subject: Subjects
    readonly dataSubject: ErrorEvent
    readonly loadingSubject: boolean
    readonly errorSubject: boolean
    readonly successSubject: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    findSubjectRequest(subjectId: string): void
    changeSubject(subject: Subjects): void
    resetClasse(): void
    createClassesRequest(classe: Classes): void
}

type Props = IState & IDispatchProps

class CreateClasses extends Component<Props> {

    private spinnerMessage: string
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.spinnerMessage = ''
        this.toastService = Toast.getInstance()

        const { findSubjectRequest, changeSubject, match: { params } } = this.props
        if (params && params.subjectId) {
            changeSubject(new Subjects().fromJSON({
                ...this.props,
                id: params.subjectId
            }))
            this.spinnerMessage = 'Buscando disciplina...'
            findSubjectRequest(params.subjectId)
        }
    }

    public handleSubmit = async (values) => {
        const { createClassesRequest } = this.props
        const classe = new Classes().fromJSON({ ...values })
        this.spinnerMessage = 'Registrando aula...'
        createClassesRequest(classe)
    }

    public componentWillUnmount(): void {
        this.props.resetClasse()
    }

    public render() {

        const { subject, classe } = this.props
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-bars" nameHeader={subject.name ? subject.name : ''} />

                    <Card>
                        <Formik
                            initialValues={{ ...classe.toJSON(), subjectId: subject.id }}
                            onSubmit={this.handleSubmit}
                            enableReinitialize={true}
                            validationSchema={ClassesValidator.ValidationScheme}>
                            {({ isValid, resetForm, values }) => (
                                <Form>
                                    <Fieldset legend="Registrar aula">

                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="record" id="record" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="record"
                                                                className="input-container"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('record', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('record', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="record">Informações da aula</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="record" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="date" id="date" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <InputText
                                                                id="date"
                                                                className="input-container"
                                                                type="date"
                                                                value={field.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('date', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('date', true, true)
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="date" />
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
    classe: state.classes.createClasses.classe,
    data: state.classes.createClasses.data,
    loading: state.classes.createClasses.loading,
    error: state.classes.createClasses.error,
    success: state.classes.createClasses.success,

    subject: state.subject.createSubject.subject,
    dataSubject: state.subject.createSubject.data,
    loadingSubject: state.subject.createSubject.loading,
    errorSubject: state.subject.createSubject.error,
    successSubject: state.subject.createSubject.success
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...ClassesActions,
    ...SubjectActions
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClasses))