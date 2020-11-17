import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './style.css'
import { InputText } from 'primereact/inputtext'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import { IApplicationState } from '../../store'
import * as AuthActions from '../../store/ducks/auth/actions'
import { IAuth } from '../../store/ducks/auth/types'
import Spinner from '../../components/spinner/spinner'
import authService from '../../services/auth.service'
import { LoginValidator } from '../../store/application/validators/login.validator'
import { FormErrorMessage } from '../../components/form.error/form.error.message'
import Logo from '../../assets/logo.png'

interface IState {
    credentials: IAuth,
    data: any,
    error: boolean
    loading: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {

    loginRequest(credentials: IAuth): void

    changeEmail(email: string): void

    changePassword(password: string): void
}

type Props = IState & IDispatchProps

class Login extends Component<Props> {

    constructor(props: Props) {
        super(props)
        if (authService.isAuthenticated()) {
            this.props.history.push('/ead/main')
        }
    }

    public handleSubmit = async (event: any) => {
        const { loginRequest, credentials } = this.props
        loginRequest(credentials)
    }

    public changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { changeEmail } = this.props;
        changeEmail(event.target.value)
    }

    public changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { changePassword } = this.props;
        changePassword(event.target.value)
    }

    public render() {
        const { credentials } = this.props
        return (
            <div className="wrapper fade-in-down">
                {this.props.loading ? <Spinner /> : undefined}
                <div id="formContent">
                    <div className="m-3">
                        <img src={Logo} alt="Logo" width="70px" />
                        <h5><strong>CONTROLE ACADÊMICO</strong></h5>
                    </div>
                    <Formik
                        initialValues={credentials}
                        onSubmit={this.handleSubmit}
                        enableReinitialize={true}
                        validationSchema={LoginValidator.ValidationScheme}>
                        {({ isValid, resetForm, values }) => (
                            <Form>
                                <div>
                                    <Field name="email" id="email" type="customField">
                                        {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                            <div className="p-float-label input-login fadeIn second">
                                                <InputText
                                                    id="email"
                                                    className="input-container"
                                                    value={field.value}
                                                    onChange={(e: any) => {
                                                        setFieldValue('email', e.target.value)
                                                        this.changeEmail(e)
                                                    }}
                                                    onBlur={() => {
                                                        setFieldTouched('email', true, true)
                                                    }}
                                                />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        )}
                                    </Field>
                                    <FormErrorMessage name="email" />
                                </div>

                                <div>
                                    <Field name="password" id="password" type="customField">
                                        {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                            <div className="p-float-label input-login fadeIn third">
                                                <InputText
                                                    id="password"
                                                    className="input-container"
                                                    type="password"
                                                    value={field.value}
                                                    onChange={(e: any) => {
                                                        setFieldValue('password', e.target.value)
                                                        this.changePassword(e)
                                                    }}
                                                    onBlur={() => {
                                                        setFieldTouched('password', true, true)
                                                    }}
                                                />
                                                <label htmlFor="password">Senha</label>
                                            </div>
                                        )}
                                    </Field>
                                    <FormErrorMessage name="password" />
                                </div>

                                <div className="p-float-label input-login fadeIn">
                                    <button
                                        type="submit" className="btn-block btn-login fadeIn fourth"
                                        disabled={!isValid}>
                                        Entrar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    credentials: state.auth.login.credentials,
    error: state.auth.login.error,
    loading: state.auth.login.loading,
    data: state.auth.login.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))