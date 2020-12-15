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
import authService from '../../services/auth.service'
import { UserTypes } from '../../store/application/models/user/user'

interface IState {
    readonly subjects: Subjects[]
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: IPaginator

    readonly idForRemove: string
    readonly visibilityModal: boolean
    readonly successRemove: boolean
    readonly loadingRemove: boolean
    readonly errorRemove: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    loadAllSubjectRequest(paginator?: IPaginator): void
    changePaginator(teacherId: string, paginator?: IPaginator): void
    removeSubjectRequest(idForRemove: string): void
    loadSubjectRequest(teacherId: string, paginator?: IPaginator): void
    loadPeriodSubjectsRequest(period: string): void
}

type Props = IState & IDispatchProps

class ListSubjects extends Component<Props> {

    constructor(props: Props) {
        super(props)

        const {
            loadAllSubjectRequest,
            loadSubjectRequest,
            loadPeriodSubjectsRequest,
            paginator,
            match: { params }
        } = this.props
        if (authService.typeUser() === UserTypes.ADMIN) {
            loadAllSubjectRequest(paginator)
        } else if (authService.typeUser() === UserTypes.TEACHER) {
            loadSubjectRequest(params.teacherId, paginator)
        } else {
            loadPeriodSubjectsRequest(authService.period())
        }
    }

    public render() {
        const { subjects, removeSubjectRequest } = this.props

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
                                            className="p-button-raised p-button-warning"
                                            icon="pi pi-plus"
                                            tooltip="Informações da disciplina..."
                                            tooltipOptions={{ position: 'top' }}
                                            onClick={() => {
                                                return authService.typeUser() === UserTypes.TEACHER
                                                 ? this.props.history.push(`/ead/classes/${data.id}/subject`)
                                                 : this.props.history.push(`/ead/subjects/${data.id}/exercise`)
                                            }}
                                        />
                                        <Permission
                                            type="admin"
                                            body={
                                                <div>
                                                    <Button
                                                        style={{ marginRight: '15px' }}
                                                        className="p-button-raised p-button-info"
                                                        icon="pi pi-pencil"
                                                        tooltip="Editar disciplina..."
                                                        tooltipOptions={{ position: 'top' }}
                                                        onClick={() => this.props.history.push(`/ead/subjects/${data.id}/new`)}
                                                    />
                                                    <Button
                                                        className="p-button-raised p-button-danger"
                                                        icon="pi pi-trash"
                                                        tooltip="Excluir disciplina..."
                                                        tooltipOptions={{ position: 'top' }}
                                                        onClick={() => {
                                                            removeSubjectRequest(data.id)
                                                        }}
                                                    />
                                                </div>
                                            }
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
                                    label="Adicionar"
                                    onClick={() => this.props.history.push('/ead/subjects/new')}
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
    paginator: state.subject.listSubjects.paginator,

    idForRemove: state.subject.removeSubject.idForRemove,
    visibilityModal: state.subject.removeSubject.visibilityModal,
    successRemove: state.subject.removeSubject.success,
    loadingRemove: state.subject.removeSubject.loading,
    errorRemove: state.subject.removeSubject.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...SubjectsActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSubjects))