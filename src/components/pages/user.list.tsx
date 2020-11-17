import React, { Component } from 'react'
import User, { UserTypes } from '../../store/application/models/user/user'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RouteComponentProps } from 'react-router-dom'
import { IPaginator } from '../../store/ducks/root.types'
import NameHeader from '../shared/name.header'
import { Card } from 'primereact/card'

import { INITIAL_STATE } from '../../store/ducks/user/reducer'
import { Permission } from '../permission/permission'
import authService from '../../services/auth.service'
import { Button } from 'primereact/button'

interface IState {
    readonly users: User[]
    readonly nameHeader: string
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

        const { users, nameHeader } = this.props
        return (
            <React.Fragment>
                <div className="container ">
                    <NameHeader icon="pi pi-users" nameHeader={nameHeader} />
                    <Card className="fade-in-down">
                        <div className="row">
                            <DataTable
                                style={{ margin: '10px' }}
                                value={users}
                                responsive={true}
                                lazy={true}
                                emptyMessage="Nenhum usuário encontrado."
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
                                    style={{ width: '15%' }}
                                    header="Ações"
                                    body={data => {
                                        return <div className="d-flex justify-content-between">
                                            <Button
                                                className="p-button-raised p-button-secondary"
                                                icon="pi pi-user"
                                                tooltip="Perfil do usuário..."
                                                tooltipOptions={{ position: 'top' }}
                                                onClick={() => this.props.history.push(`/ead/user/${data.id}/profile`)}
                                            />
                                            <Button
                                                className="p-button-raised p-button-info"
                                                icon="pi pi-pencil"
                                                tooltip="Editar usuário..."
                                                tooltipOptions={{ position: 'top' }}
                                                onClick={() => this.props.history.push(`/ead/user/${data.id}/profile`)}
                                            />
                                            <Button
                                                className="p-button-raised p-button-danger"
                                                icon="pi pi-trash"
                                                tooltip="Excluir usuário..."
                                                tooltipOptions={{ position: 'top' }}
                                                onClick={() => this.props.history.push(`/ead/user/${data.id}/profile`)}
                                            />

                                        </div>
                                    }}
                                />

                            </DataTable>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                tooltip="Voltar"
                                onClick={() => this.props.history.goBack()}
                                icon="pi pi-arrow-left"
                                className="p-button-raised p-button-secondary" />
                            <Button
                                onClick={() => this.props.history.push(`/ead/user/type/new`)}
                                icon="pi pi-user-plus"
                                className="p-button-raised p-button-primary"
                                label="Adicionar" />
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