import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Paginator } from 'primereact/paginator'

import { RadioButton } from 'primereact/radiobutton';

import Game from '../../store/application/models/game.model'
import { IPaginator } from '../../store/ducks/root.types'
import { Toast } from '../../services/toast'
import { IApplicationState } from '../../store'
import * as GameActions from '../../store/ducks/game/actions'
import * as UserActions from '../../store/ducks/user/actions'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import NameHeader from '../../components/shared/name.header'
import { setupMaster } from 'cluster'
import User from '../../store/application/models/user/user'

interface IState {
    readonly games: Game[]
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
    readonly paginator: IPaginator

    readonly user: User
    readonly userData: ErrorEvent
    readonly userSuccess: boolean
    readonly userLoading: boolean
    readonly userErro: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetGame(): void
    findUser(userId: string): void
    updateUser(user: User): void
    updateGameRequest(game: Game): void
    loadGameRequest(paginator: IPaginator): void
    changePaginator(period: string, paginator: IPaginator): void
}

type Props = IState & IDispatchProps

class ListGame extends Component<Props, {
    count: number,
    opt: string,
    selected: string,
    points: number | undefined
    gamePoint: number
}> {
    private toastService: Toast
    private pontos: number

    constructor(props: Props) {
        super(props)
        this.toastService = Toast.getInstance()
        this.loadGames()
        this.pontos = 0

        this.state = {
            count: 0,
            opt: '',
            selected: '',
            points: 0,
            gamePoint: 0
        }

        const { findUser, match: { params } } = this.props
        if (params && params.userId) {
            findUser(params.userId)
        }
    }

    public componentWillUnmount(): void {
        this.props.resetGame()
    }

    public handleSubmit = async (game: Game, user: User) => {
        const { updateGameRequest, updateUser } = this.props
        const up = new User().fromJSON({ ...user, gamePoints: this.pontos })
        const newGame = new Game().fromJSON({ ...game, answered: true, userResponse: this.state.selected })
        updateUser(up)
        updateGameRequest(newGame)
    }

    public render() {
        const {
            games,
            user,
            paginator,
            changePaginator
        } = this.props

        const questions = games.map(el => el)
        const options = games?.map(el => el.options)
        const opt = options.map(el => el?.map((ell, index) => { return { name: ell, key: index } }))

        return (
            <React.Fragment>

                <div className="container">
                    <NameHeader icon="pi pi-copy" nameHeader="Perguntas" />
                    {
                        <Card title={questions[this.state.count]?.question}>
                            <div className="row">
                                {
                                    <div>{opt[this.state.count]?.map(el => {
                                        return (
                                            <div key={el.key} className="p-field-radiobutton">
                                                <RadioButton
                                                    style={{ margin: '10px 10px 10px' }}
                                                    inputId={String(el?.key)}
                                                    name="category"
                                                    value={el.name}
                                                    onChange={(e) => {
                                                        this.setState({ ...this.state, selected: e.target.value })
                                                    }}
                                                    checked={this.state.selected === el.name} />
                                                <label htmlFor={String(el.key)}>{el.name}</label>
                                            </div>
                                        )
                                    })}</div>
                                }
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => {
                                        this.state.selected === questions[this.state.count]?.correctAnswer
                                            ? this.pontos = this.pontos + 10
                                            : this.pontos = this.pontos + 0
                                        this.setState({ ...this.state, count: this.state.count + 1 })
                                        this.state.count === (questions.length - 1)
                                            ? this.handleSubmit(questions[this.state.count], user.toJSON())
                                            : console.log('certo') // TODO: Configurar depois...
                                    }}
                                    className="p-button-raised p-button-primary"
                                    label={this.state.count === (questions.length - 1)
                                        ? 'Responder & Finalizar'
                                        : 'Responder'} />
                            </div>
                        </Card>
                    }
                </div>
            </React.Fragment >
        )
    }

    public loadGames(): void {
        const { loadGameRequest, paginator } = this.props
        loadGameRequest(paginator)
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    games: state.game.listGames.games,
    data: state.game.listGames.data,
    loading: state.game.listGames.loading,
    error: state.game.listGames.error,
    success: state.game.listGames.success,
    paginator: state.game.listGames.paginator,

    user: state.user.profile.user,
    userData: state.user.profile.data,
    userSuccess: state.user.profile.success,
    userLoading: state.user.profile.loading,
    userErro: state.user.profile.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...GameActions, ...UserActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListGame))