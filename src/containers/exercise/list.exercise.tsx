import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Toast } from '../../services/toast.service'

import Exercise from '../../store/application/models/exercise.model'
import * as ExerciseActions from '../../store/ducks/exercises/actions'
import { IApplicationState } from '../../store'
import { IPaginator } from '../../store/ducks/root.types'
import NameHeader from '../../components/shared/name.header'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Permission } from '../../components/permission/permission'

interface IState {
    readonly exercises: Exercise[]
    readonly data: ErrorEvent
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    resetExercise(): void
    loadExercisesRequest(subjectId: string, paginator?: IPaginator): void
}

type Props = IState & IDispatchProps

class ListExercises extends Component<Props> {

    private spinnerMessage: string
    private toastService: Toast

    constructor(props: Props) {
        super(props)

        this.spinnerMessage = ''
        this.toastService = Toast.getInstance()

        const { loadExercisesRequest, match: { params } } = this.props
        if (params && params.subjectId) {
            loadExercisesRequest(params.subjectId)
        }
    }

    public render() {

        const { exercises } = this.props

        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-copy" nameHeader="Exercícios" />
                    <Card className="fade-in-down">
                        <DataTable
                            value={exercises}
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
                                header="Título"
                                field="title" />
                            <Column
                                header="Descrição"
                                field="description" />
                            <Column
                                header="Data da Entrega"
                                field="delivery" />
                            <Column
                                header="Link do YouTube"
                                body={data => {
                                    return <div className="d-flex justify-content-center">
                                        <a href={data.urlVideo}><Button
                                            style={{ marginRight: '15px' }}
                                            className="p-button-raised p-button-danger"
                                            icon="pi pi-play"
                                            tooltip="Vídeo para estudo"
                                            tooltipOptions={{ position: 'top' }}
                                        /></a>

                                    </div>
                                }}
                            />
                            <Column
                                header="Arquivo"
                                body={data => {
                                    return <div className="d-flex justify-content-center">
                                        <a href={data.file}><Button
                                            style={{ marginRight: '15px' }}
                                            className="p-button-raised p-button-info"
                                            icon="pi pi-download"
                                            tooltip="Arquivo para download"
                                            tooltipOptions={{ position: 'top' }}
                                        /></a>

                                    </div>
                                }} />

                        </DataTable>

                        <div className="d-flex justify-content-between mt-2">

                            <Button
                                tooltip="Voltar"
                                className="p-button-secondary left"
                                icon="pi pi-arrow-left"
                                onClick={() => {
                                    this.props.history.goBack()
                                }} />

                            <Permission
                                type="teacher"
                                body={
                                    <Button
                                        label="Adicionar"
                                        className="p-button-primary right"
                                        icon="pi pi-plus"
                                        onClick={() => {
                                            const { match: { params } } = this.props
                                            return this.props.history.push(`/ead/subject/${params.subjectId}/exercise/new`)
                                        }} />
                                }
                            />

                        </div>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    exercises: state.exercise.listExercise.exercises,
    data: state.exercise.listExercise.data,
    loading: state.exercise.listExercise.loading,
    success: state.exercise.listExercise.success,
    error: state.exercise.listExercise.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...ExerciseActions
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListExercises))