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
import { Card } from 'primereact/card'
import NameHeader from '../../components/shared/name.header'
import { Permission } from '../../components/permission/permission'

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
    loadSubjectRequest(teacherId: string, paginator?: IPaginator): void
    changePaginator(teacherId: string, paginator?: IPaginator): void
}

type Props = IState & IDispatchProps

class ListSubjects extends Component<Props> {

    constructor(props: Props) {
        super(props)

        const { loadSubjectRequest, paginator, match: { params } } = this.props
        if (params && params.teacherId) {
            loadSubjectRequest(params.teacherId, paginator)
        }
    }

    public componentWillUnmount(): void {
        this.props.resetSubject()
    }

    public render() {
        const { subjects } = this.props

        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-bars" nameHeader="Disciplinas" />
                    <Card>
                        <DataTable
                            value={subjects}
                            responsive={true}
                            lazy={true}
                            emptyMessage="Nenhuma disciplina encontrada."
                        >
                            <Column
                                header="#"
                                style={{ width: '5%' }}
                                body={(data: any, column: any) => column.rowIndex + 1}
                            />
                            <Column
                                style={{ width: '8%' }}
                                header="Período"
                                field="period" />
                            <Column
                                header="Disciplina"
                                field="name" />
                            <Column
                                header="Turno"
                                field="shift" />
                            <Column
                                header="Horário"
                                field="schedule" />
                            <Column
                                style={{ width: '15%' }}
                                header="Ações"
                                body={data => {
                                    return <div className="d-flex justify-content-center">
                                        <Button
                                            style={{ marginRight: '15px' }}
                                            className="p-button-raised p-button-info"
                                            icon="pi pi-plus"
                                            tooltip="Novo exercício..."
                                            tooltipOptions={{ position: 'top' }}
                                            onClick={() => this.props.history.push(`/ead/subjects/${data.id}/exercise`)}
                                        />
                                    </div>
                                }}
                            />

                        </DataTable>

                        <div className="d-flex justify-content-between">

                            <Button
                                style={{ marginTop: '10px' }}
                                tooltip="Voltar"
                                type="button"
                                onClick={() => this.props.history.goBack()}
                                icon="pi pi-arrow-left"
                                className="p-button-raised p-button-secondary" />

                            <Permission type="admin" body={
                                <Button
                                    style={{ marginTop: '10px' }}
                                    label="Registrar"
                                    type="submit"
                                    icon="pi pi-save"
                                    className="p-button-raised p-button-primary" />
                            } />
                        </div>
                    </Card>
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