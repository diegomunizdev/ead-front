import React, { Component } from 'react'
import User, { UserTypes } from '../../store/application/models/user/user'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RouteComponentProps } from 'react-router-dom'
import { IPaginator } from '../../store/ducks/root.types'
import NameHeader from '../shared/name.header'
import { Card } from 'primereact/card'

import { INITIAL_STATE } from '../../store/ducks/user/reducer'

interface IState {
    readonly users: User[]
    readonly title?: string
    readonly header?: string
    readonly loading: boolean
    readonly error: boolean
    readonly paginator: any
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(userType: UserTypes, paginator: IPaginator): void

    removeUser(userIdForRemove: string, userType: UserTypes): void

    loadUsers(userType: UserTypes, paginator?: IPaginator): void

    changeUser(user: User): void

}

interface IOwnProps {
    userType: UserTypes
}

type Props = IState & IDispatchProps & IOwnProps

class ListUser extends Component<Props> {

    constructor(props: Props) {
        super(props)
        this.changePaginator = this.changePaginator.bind(this)
        const { loadUsers, userType } = this.props
        loadUsers(userType, INITIAL_STATE.listAdmins.paginator)
    }

    public render() {

        const { users, userType } = this.props
        // TODO: remover console
        console.log('user.list - userType: ', userType)
        console.log('user.list - users', users)
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-users" nameHeader="Usuários" />
                    <Card style={{ padding: '10px' }}>
                        <div className="row">
                            <DataTable
                                value={users}
                                responsive={true}
                                lazy={true}
                            >
                                <Column
                                    header="#"
                                    field=""
                                    style={{ width: '5%' }}
                                    body={(data: any, column: any) => column.rowIndex + 1}
                                />
                                <Column
                                    header="Nome"
                                    field="name" />
                                <Column
                                    header="Email"
                                    field="email" />
                                <Column
                                    header="Tipo"
                                    field="type" />
                                <Column
                                    header="Período"
                                    field="period" />
                            </DataTable>
                        </div>
                    </Card>
                </div>
            </React.Fragment>
        )
    }

    private changePaginator(userType: UserTypes, paginator: any): void {
        const { changePaginator } = this.props
        changePaginator(userType, paginator)
    }
}

export default ListUser