import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Field, Form, Formik } from 'formik'
import * as SubjectActions from '../../store/ducks/subjects/actions'
import { Toast } from '../../services/toast.service'
import Subjects from '../../store/application/models/subjects.model'
import { IApplicationState } from '../../store'
import NameHeader from '../../components/shared/name.header'
import { Card } from 'primereact/card'
import { FormErrorMessage } from '../../components/form.error/form.error.message'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { SubjectValidator } from '../../store/application/validators/subject.validator'
import { Dropdown } from 'primereact/dropdown'
import User, { UserTypes } from '../../store/application/models/user/user'
import { IPaginator } from '../../store/ducks/root.types'

import * as UserActions from '../../store/ducks/user/actions'
import { INITIAL_STATE } from '../../store/ducks/user/reducer'

interface IState {
    readonly subject: Subjects
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean

    readonly users: User[]
    readonly userLoading: boolean
    readonly userSuccess: boolean
    readonly userError: boolean
    readonly paginator: IPaginator
}

interface IDispatchProps extends RouteComponentProps<any> {
    createSubjectRequest(subject: Subjects): void
    findSubjectRequest(subjectId: string): void
    changeSubject(subject: Subjects): void
    resetSubject(): void
    updateSubjectRequest(subject: Subjects): void

    loadUsers(userType: UserTypes, paginator?: IPaginator): void
}

type Props = IState & IDispatchProps

class createSubject extends Component<Props> {

    private spinnerMessage: string
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.spinnerMessage = ''
        this.toastService = Toast.getInstance()

        const { findSubjectRequest, changeSubject, match: { params }, loadUsers } = this.props
        loadUsers(UserTypes.TEACHER, INITIAL_STATE.listTeacher.paginator)
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
        const { createSubjectRequest, updateSubjectRequest } = this.props
        const subject = new Subjects().fromJSON({ ...values })
        if (subject.id) {
            this.spinnerMessage = 'Atualizando disciplina...'
            updateSubjectRequest(subject)
        } else {
            this.spinnerMessage = 'Registrando disciplina...'
            createSubjectRequest(subject)
        }
    }

    public componentWillUnmount(): void {
        const { resetSubject } = this.props
        resetSubject()
    }

    public render() {

        const { subject, users } = this.props

        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-bars" nameHeader="Nova disciplina" />

                    <Card>
                        <Formik
                            initialValues={{ ...subject?.toJSON() }}
                            onSubmit={this.handleSubmit}
                            enableReinitialize={true}
                            validationSchema={SubjectValidator.ValidationScheme}>
                            {({ isValid, resetForm, values }) => (
                                <Form>
                                    <Fieldset legend="Registrar disciplina">

                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="name" id="name" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="name"
                                                                className="input-container"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('name', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('name', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="name">Nome da disciplina</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="name" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="shift" id="shift" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <InputText
                                                                id="shift"
                                                                className="input-container"
                                                                type="shift"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('shift', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('shift', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="shift">Turno</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="shift" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                <Field name="schedule" id="schedule" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="schedule"
                                                                className="input-container"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('schedule', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('schedule', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="schedule">Horário da aula</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="schedule" />
                                            </div>

                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                <Field name="period" id="period" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <InputText
                                                                id="period"
                                                                className="input-container"
                                                                type="period"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('period', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('period', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="period">Período</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="period" />
                                            </div>

                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                <Field name="teacherId" id="teacherId" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <Dropdown
                                                                style={{ width: '100%' }}
                                                                value={field?.value}
                                                                options={users}
                                                                onChange={(e) => {
                                                                    setFieldValue('teacherId', e.target.value.id)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('teacherId', true, true)
                                                                }}
                                                                optionLabel="name"
                                                                placeholder="Selecione o professor(a)" />
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="teacherId" />
                                            </div>
                                        </div>
                                    </Fieldset>

                                    <div className="d-flex justify-content-between">

                                        <Button
                                            style={{ marginTop: '10px' }}
                                            tooltip="Voltar"
                                            type="button"
                                            onClick={resetForm && this.props.history.goBack}
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
    subject: state.subject.createSubject.subject,
    dataSubject: state.subject.createSubject.data,
    loadingSubject: state.subject.createSubject.loading,
    errorSubject: state.subject.createSubject.error,
    successSubject: state.subject.createSubject.success,

    users: state.user.listTeacher.users,
    userLoading: state.user.listTeacher.loading,
    userSuccess: state.user.listTeacher.success,
    userError: state.user.listTeacher.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...SubjectActions, ...UserActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(createSubject))