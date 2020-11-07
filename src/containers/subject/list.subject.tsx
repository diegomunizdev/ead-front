import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

import Subjects from '../../store/application/models/subjects.model'
import { IPaginator } from '../../store/ducks/root.types'
import { IApplicationState } from '../../store'
import * as SubjectsActions from '../../store/ducks/subjects/actions'


interface IState {
    readonly subjects: Subjects[]
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: IPaginator
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetSubject(): void
    loadSubjectRequest(paginator?: IPaginator): void
    changePaginator(paginator?: IPaginator): void
}

type Props = IState & IDispatchProps

class ListSubjects extends Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    public componentWillUnmount(): void {
        this.props.resetSubject()
    }

    public render() {
        const { subjects } = this.props

        return (
            <React.Fragment>
                <div className="container">
                    <DataTable
                        style={{ margin: '10px' }}
                        value={subjects}
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
                            header="Disciplina"
                            field="name" />
                        <Column
                            header="Turno"
                            field="shift" />
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    subjects: state.subject.listSubjects.subjects,
    data: state.subject.listSubjects.data,
    loading: state.subject.listSubjects.loading,
    error: state.subject.listSubjects.error,
    success: state.subject.listSubjects.success,
    paginator: state.subject.listSubjects.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(SubjectsActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSubjects))