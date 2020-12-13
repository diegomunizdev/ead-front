import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Field, Form, Formik } from 'formik'
import { Toast } from '../../services/toast.service'
import { IApplicationState } from '../../store'
import NameHeader from '../../components/shared/name.header'
import { Card } from 'primereact/card'
import { FormErrorMessage } from '../../components/form.error/form.error.message'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { Dropdown } from 'primereact/dropdown'
import User, { UserTypes } from '../../store/application/models/user/user'

import * as UserActions from '../../store/ducks/user/actions'
import { UserValidator } from '../../store/application/validators/user.validator'

interface IState {
    readonly user: User
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetCreateUser(): void
    createUser(user: User): void
    updateUser(user: User): void
    findUser(userId: string): void
    changeUser(user: User): void
}

type Props = IState & IDispatchProps

class createUser extends Component<Props> {

    private spinnerMessage: string
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.spinnerMessage = ''
        this.toastService = Toast.getInstance()
    }

    public handleSubmit = async (values) => {
        const { createUser, updateUser } = this.props
        const user = new User().fromJSON({ ...values })
        if (user.id) {
            this.spinnerMessage = 'Atualizando usuário...'
            updateUser(user)
        } else {
            this.spinnerMessage = 'Adicionando usuário...'
            createUser(user)
        }

    }

    public componentWillUnmount(): void {
        this.props.resetCreateUser()
    }

    public render() {

        const { user } = this.props

        const typeUser: any[] = [
            { key: UserTypes.ADMIN, name: 'Administrador' },
            { key: UserTypes.TEACHER, name: 'Professor' },
            { key: UserTypes.TUTOR, name: 'Tutor' },
            { key: UserTypes.STUDENT, name: 'Estudante' },
        ]

        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-bars" nameHeader="Nova disciplina" />

                    <Card>
                        <Formik
                            initialValues={{ ...user?.toJSON() }}
                            onSubmit={this.handleSubmit}
                            enableReinitialize={true}
                            validationSchema={UserValidator.ValidationSchema}>
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
                                                            <label htmlFor="name">Nome Completo</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="name" />
                                            </div>

                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <Field name="email" id="email" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <InputText
                                                                id="email"
                                                                className="input-container"
                                                                type="email"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('email', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('email', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="email">E-mail</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="email" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                <Field name="password" id="password" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn second">
                                                            <InputText
                                                                id="password"
                                                                type="password"
                                                                className="input-container"
                                                                value={field?.value}
                                                                onChange={(e: any) => {
                                                                    setFieldValue('password', e.target.value)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('password', true, true)
                                                                }}
                                                            />
                                                            <label htmlFor="password">Senha temporária</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="password" />
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
                                                            <label htmlFor="period">Informe o período da disciplina</label>
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="period" />
                                            </div>

                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                <Field name="type" id="type" type="customField">
                                                    {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                        <div className="p-float-label input-login fadeIn third">
                                                            <Dropdown
                                                                style={{ width: '100%' }}
                                                                value={field?.value}
                                                                options={typeUser}
                                                                onChange={(e) => {
                                                                    setFieldValue('type', e.target.value.key)
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('type', true, true)
                                                                }}
                                                                optionLabel="name"
                                                                placeholder="Tipo de usuário" />
                                                        </div>
                                                    )}
                                                </Field>
                                                <FormErrorMessage name="type" />
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
                                            label="Salvar"
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
    user: state.user.createUser.user,
    loading: state.user.createUser.loading,
    success: state.user.createUser.success,
    error: state.user.createUser.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...UserActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(createUser))