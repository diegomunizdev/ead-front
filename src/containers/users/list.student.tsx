import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import User, { UserTypes } from '../../store/application/models/user/user'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import ListUsers from '../../components/pages/user.list'
import { IPaginator, ISearch } from '../../store/ducks/root.types'

interface IState {
    readonly users: User[]
    readonly loading: boolean
    readonly error: boolean
    readonly paginator: any

    readonly removeVisibilityModal: boolean,
    readonly removeLoading: boolean,
    readonly removeError: boolean,
    readonly removeSuccess: boolean
    readonly userIdForRemove: string
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(userType: UserTypes, paginator: IPaginator): void

    changeRemoveModal(visibilityModal: boolean, userIdForRemove: string): void

    removeUser(userIdForRemove: string, userType: UserTypes): void

    loadUsers(userType: UserTypes, paginator: IPaginator): void

    changeDialog(dialog: boolean): void

    changeUser(user: User): void

    changeSearchPaginator(search: ISearch): void
}

type Props = IState & IDispatchProps

class ListStudent extends Component<Props> {

    public render() {
        const {
            users,
            loading,
            error,
            paginator,
            changePaginator,
            removeUser,
            loadUsers,
            history,
            location,
            match,
            changeUser,
        } = this.props

        // TODO: remover console
        console.log('users', users)
        return (
            <ListUsers
                users={users}
                loading={loading}
                error={error}
                paginator={paginator}
                changePaginator={changePaginator}
                changeUser={changeUser}
                removeUser={removeUser}
                loadUsers={loadUsers}
                history={history}
                location={location}
                match={match}
                userType={UserTypes.STUDENT}
            />

        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    users: state.user.listAdmins.users,
    loading: state.user.listAdmins.loading,
    paginator: state.user.listAdmins.paginator,
    error: state.user.listAdmins.error,

    removeVisibilityModal: state.user.removeUser.visibilityModal,
    removeLoading: state.user.removeUser.loading,
    removeError: state.user.removeUser.error,
    removeSuccess: state.user.removeUser.success,
    userIdForRemove: state.user.removeUser.userIdForRemove

})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStudent))