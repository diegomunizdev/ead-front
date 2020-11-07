import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './style.css'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Fieldset } from 'primereact/fieldset'
import { InputText } from 'primereact/inputtext'
import User, { UserTypes } from '../../store/application/models/user/user'
import { Toast } from '../../services/toast'
// import '../container.style.scss'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import NameHeader from '../../components/shared/name.header'

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

        // TODO: remover console.log
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
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 p-4">
                                                <span className="p-float-label">
                                                    <InputText id="period" className="input-container"
                                                        value={user.period}
                                                        disabled={true}
                                                        onChange={(event: any) => {
                                                            changeUser(new User().fromJSON({
                                                                ...user.toJSON(),
                                                                period: event.target.value
                                                            }))
                                                        }} />
                                                    <label htmlFor="period">Período</label>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-between m-3">
                                            <Card style={{ width: '20%', background: 'var(--color-nine)' }}
                                                subTitle="Nota 1 da primeira un."
                                                header={
                                                    <div className="d-flex justify-content-center p-3">
                                                        <span style={{ fontSize: '3em' }}>{user.noteOne}</span>
                                                    </div>}
                                            />
                                            <Card style={{ width: '20%', background: 'var(--color-nine)' }}
                                                subTitle="Nota 2 da primeira un."
                                                header={
                                                    <div className="d-flex justify-content-center p-3">
                                                        <span style={{ fontSize: '3em' }}>{user.noteTwo}</span>
                                                    </div>}
                                            />
                                            <Card style={{ width: '20%', background: 'var(--color-nine)' }}
                                                subTitle="Nota 1 da segunda un."
                                                header={
                                                    <div className="d-flex justify-content-center p-3">
                                                        <span style={{ fontSize: '3em' }}>{user.noteThree}</span>
                                                    </div>}
                                            />
                                            <Card style={{ width: '20%', background: 'var(--color-nine)' }}
                                                subTitle="Nota 2 da segunda un."
                                                header={
                                                    <div className="d-flex justify-content-center p-3">
                                                        <span style={{ fontSize: '3em' }}>{user.noteFour}</span>
                                                    </div>}
                                            />
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
                    <div className="row mb-5">
                        <div className="fade-in-down col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-2">
                            <Card
                                title="Sua pontuação"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <span style={{ fontSize: '6em' }}>{user.gamePoints ? user.gamePoints : 0}</span>
                                    </div>}

                            />
                        </div>
                        <div className="fade-in-down col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-2">
                            <Card
                                title="Média"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <span style={{ fontSize: '6em' }}>{
                                            ((user.noteOne ? user.noteOne : 0)
                                                + (user.noteTwo ? user.noteTwo : 0)
                                                + (user.noteThree ? user.noteThree : 0)
                                                + (user.noteFour ? user.noteFour : 0)) / 4
                                        }</span>
                                    </div>}
                            />
                        </div>
                        <div className="fade-in-down col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-2">
                            <Card
                                title="Faltas"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <span style={{ fontSize: '6em' }}>3/<small>100</small></span>
                                    </div>}
                            />
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