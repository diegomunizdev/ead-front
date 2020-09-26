import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Game from '../../store/application/models/game.model'
import { IPaginator } from '../../store/ducks/root.types'
import { Toast } from '../../services/toast'
import { IApplicationState } from '../../store'
import * as GameActions from '../../store/ducks/game/actions'

import { Paginator } from 'primereact/paginator'

interface IState {
    readonly games: Game[]
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
    readonly paginator: IPaginator
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetGame(): void
    loadGameRequest(paginator: IPaginator): void
    changePaginator(period: string, paginator: IPaginator): void
}

type Props = IState & IDispatchProps

class ListGame extends Component<Props> {
    private toastService: Toast

    constructor(props: Props) {
        super(props)
        this.toastService = Toast.getInstance()
        this.loadGames()
    }

    public componentWillUnmount(): void {
        this.props.resetGame()
    }

    public render() {
        const {
            games,
            paginator,
            changePaginator
        } = this.props

        return (
            <React.Fragment>
                <div className="container">
                    {games.map(game => game.question)}
                    <Paginator
                        rows={paginator.rows}
                        totalRecords={paginator.totalRecords}
                        rowsPerPageOptions={[1, 10, 20, 30]}
                        first={paginator.first}
                        onPageChange={(e: any) => {
                            changePaginator('2', { ...paginator, ...e })
                        }}
                    />
                </div>

            </React.Fragment>
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
    paginator: state.game.listGames.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(GameActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListGame))