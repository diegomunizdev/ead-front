import React, { Component } from 'react'
import User, { UserTypes } from '../../store/application/models/user/user'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RouteComponentProps } from 'react-router-dom'
import { IPaginator } from '../../store/ducks/root.types'
import NameHeader from '../shared/name.header'
import { Card } from 'primereact/card'


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

export default class ListUser extends Component<Props> {

    constructor(props: Props) {
        super(props)

        const { loadUsers, userType, paginator } = this.props
        loadUsers(userType, paginator)
    }

    public render() {

        const { users } = this.props
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-users" nameHeader="Usuários" />
                    <Card style={{ padding: '10px'}}>
                        <div className="row">
                            <DataTable
                                value={users}
                                responsive={true}
                                lazy={true}
                            >
                                <Column
                                    field="#"
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
}