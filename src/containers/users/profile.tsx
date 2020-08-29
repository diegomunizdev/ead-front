import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

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
import Spinner from '../../components/spinner/spinner'
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

type Props = IState & IDispatchProps

class Profile extends Component<Props> {
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.toastService = Toast.getInstance()
        //this.loadUser = this.loadUser.bind(this)
        //this.loadUser()

        const { findUser, match: { params } } = this.props
        if (params && params.userId) {
            findUser(params.userId)
        }
    }

    public handleSubmit = async () => {
        const { user } = this.props
        const newUser = new User().fromJSON({ ...user.toJSON() })

        const { updateUser } = this.props
        updateUser(newUser)

    }

    /*public loadUser(): void {
        const { findUser } = this.props;
        const accessToken = authService.decodeToken()
        if (accessToken && accessToken.sub) {
            findUser(accessToken.sub, accessToken.sub_type)
        }
    }*/

    public componentWillUnmount(): void {
        const { resetCreateUser } = this.props
        resetCreateUser()
    }

    public render() {
        const { user, changeUser } = this.props

        return (
            <React.Fragment>^

                <div className="header fade-in-down">
                    <h4 className="page-header">
                        Meus Dados
                    </h4>
                </div>

                <div id="page-inner">

                    {this.props.loading && <Spinner message='Carregando...' />}

                    <div className="row">

                        <div className='fade-in-down col-sm-12 col-md-12 col-lg-12 col-xl-8'>

                            <Card className='card'>

                                <Fieldset legend="Dados Pessoais">
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                                        </div>
                                    </form>
                                </Fieldset>


                                <div className="row">

                                    <Button label="Voltar" className="p-button-secondary left" icon="pi pi-arrow-left"
                                        onClick={() => {
                                            this.props.history.goBack()
                                        }} />

                                    <Button label="Salvar" className="p-button-primary right" icon="pi pi-save"
                                        onClick={this.handleSubmit} />

                                </div>

                            </Card>

                        </div>

                    </div>

                </div>

            </React.Fragment>

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