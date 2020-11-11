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

class ListClasses extends Component<Props> {

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
          <NameHeader icon="pi pi-bars" nameHeader="Turmas" />
          <Card>
            <DataTable
              value={subjects}
              responsive={true}
              lazy={true}
              emptyMessage="Nenhuma turma encontrada."
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
                header="Turmas"
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
                      className="p-button-raised p-button-info"
                      icon="pi pi-bars"
                      tooltip="Listar alunos..."
                      tooltipOptions={{ position: 'top' }}
                      onClick={() => this.props.history.push(`/ead/classes/${data.id}/subject`)}
                    />
                  </div>
                }}
              />

            </DataTable>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListClasses))