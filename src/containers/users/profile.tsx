import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './style.css'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Fieldset } from 'primereact/fieldset'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import User, { UserTypes } from '../../store/application/models/user/user'
import { Toast } from '../../services/toast'
// import '../container.style.scss'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import NameHeader from '../../components/shared/name.header'

import authService from '../../services/auth'

interface IState {
    readonly user: User
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {

    findUser(userId: string): void

    updateUser(user: User): void

    changeUser(user: User): void

    resetCreateUser(): void
}

export const translateType = {
    [UserTypes.ADMIN]: 'Administrador',
    [UserTypes.STUDENT]: 'Estudante',
    [UserTypes.TEACHER]: 'Professor',
    [UserTypes.TUTOR]: 'Tutor'
}


type Props = IState & IDispatchProps

class Profile extends Component<Props> {
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.toastService = Toast.getInstance()

        const { findUser, match: { params } } = this.props
        if (params && params.userId) {
            findUser(params.userId)
        }
    }

    public handleSubmit = async () => {
        const { user } = this.props
        const newUser = new User().fromJSON({ ...user.toJSON(), password: undefined })

        // const { updateUser } = this.props
        // TODO: Atualizar usuário e remover console
        console.log('atualizar ', newUser)
        // updateUser(newUser)

    }

    public componentWillUnmount(): void {
        const { resetCreateUser } = this.props
        resetCreateUser()
    }

    public render() {
        const { user, changeUser } = this.props
        // TODO: remover console
        console.log('user: ', user)

        return (
            <React.Fragment>

                <div className="container">
                    <NameHeader icon="pi pi-user" nameHeader="Perfil" />
                    <div className="row">
                        <div className='fade-in-down col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                            <Card>
                                <Fieldset legend="Dados Pessoais">

                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center">
                                        {user?.avatar
                                            ? <img
                                                src={user?.avatar}
                                                alt="Avatar do usuário"
                                                style={{ width: '180px', height: '170px', borderRadius: '50%' }} />
                                            : <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-user" />}
                                    </div>

                                    <form>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 p-4">
                                                <span className="p-float-label">
                                                    <InputText id="name" className="input-container"
                                                        value={user.name}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                name: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="name">Nome</label>
                                                </span>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 p-4">
                                                <span className="p-float-label">
                                                    <InputText id="email" className="input-container"
                                                        value={user.email}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                email: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="email">Email</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 p-4">
                                                <span className="p-float-label">
                                                    <InputText id="type" className="input-container"
                                                        value={translateType[user.type ? user.type : '']}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                type: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="type">Tipo</label>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-between">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-2">
                                                <span className="p-float-label">
                                                    <InputNumber
                                                        id="noteOne"
                                                        value={user.noteOne}
                                                        disabled={authService.typeUser() === 'student' ? true : false}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                noteOne: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="noteTwo">Nota 1 da Primeira unidade</label>
                                                </span>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-2">
                                                <span className="p-float-label">
                                                    <InputNumber
                                                        id="noteTwo"
                                                        value={user.noteTwo}
                                                        disabled={authService.typeUser() === 'student' ? true : false}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                noteTwo: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="noteTwo">Nota 2 da Primeira unidade</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-2">
                                                <span className="p-float-label">
                                                    <InputNumber
                                                        id="noteThree"
                                                        value={user.noteThree}
                                                        disabled={authService.typeUser() === 'student' ? true : false}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                noteThree: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="noteThree">Nota 2 da Primeira unidade</label>
                                                </span>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-2">
                                                <span className="p-float-label">
                                                    <InputNumber
                                                        id="noteFour"
                                                        value={user.noteFour}
                                                        disabled={authService.typeUser() === 'student' ? true : false}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                noteFour: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="noteFour">Nota 2 da Primeira unidade</label>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </Fieldset>


                                <div className="d-flex justify-content-between mt-2">

                                    <Button
                                        tooltip="Voltar"
                                        className="p-button-secondary left"
                                        icon="pi pi-arrow-left"
                                        onClick={() => {
                                            this.props.history.goBack()
                                        }} />

                                    <Button
                                        label="Salvar"
                                        className="p-button-primary right"
                                        icon="pi pi-save"
                                        onClick={this.handleSubmit} />

                                </div>

                            </Card>

                        </div>
                    </div>
                </div>
            </React.Fragment >

        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    user: state.user.profile.user,
    error: state.user.profile.error,
    success: state.user.profile.success,
    loading: state.user.profile.loading,
    data: state.user.profile.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))