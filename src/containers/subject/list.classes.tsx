import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Toast } from '../../services/toast'
import * as SubjectsActions from '../../store/ducks/subjects/actions'
import Subjects from '../../store/application/models/subjects.model'
import { IApplicationState } from '../../store'
import { Card } from 'primereact/card'
import NameHeader from '../../components/shared/name.header'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import User, { UserTypes } from '../../store/application/models/user/user'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator } from '../../store/ducks/root.types'
import { INITIAL_STATE } from '../../store/ducks/user/reducer'
import user from '../../services/user'

interface IState {
  readonly subject: Subjects
  readonly data: ErrorEvent
  readonly loading: boolean
  readonly success: boolean
  readonly error: boolean

  readonly users: User[]
  readonly loadingUser: boolean
  readonly successUser: boolean
  readonly errorUser: boolean
  readonly paginator: any
}

interface IDispatchProps extends RouteComponentProps<any> {
  resetSubject(): void
  createSubjectRequest(subject: Subjects): void
  changeSubject(subject: Subjects): void
  findSubjectRequest(subjectId: string): void
  updateSubjectRequest(subject: Subjects): void

  loadUsers(userType: UserTypes, paginator: IPaginator): void
}

interface IOwnProps {
  userType: UserTypes
}

type Props = IState & IDispatchProps & IOwnProps

class CreateSubjects extends Component<Props> {

  private spinnerMessage: string
  private toastService: Toast

  constructor(props: Props) {
    super(props)

    this.spinnerMessage = ''
    this.toastService = Toast.getInstance()

    const { findSubjectRequest, changeSubject, match: { params }, loadUsers, userType } = this.props
    loadUsers(UserTypes.STUDENT, INITIAL_STATE.listAdmins.paginator)
    if (params && params.subjectId) {
      changeSubject(new Subjects().fromJSON({
        ...this.props,
        id: params.subjectId
      }))
      this.spinnerMessage = 'Buscando disciplina...'
      findSubjectRequest(params.subjectId)
    }
  }

  public handleSubmit = async (values) => {
    const subject = new Subjects().fromJSON({ ...values })
    if (subject.id) {
      const { updateSubjectRequest } = this.props
      this.spinnerMessage = 'Atualizando disciplina...'
      updateSubjectRequest(subject)
    } else {
      const { createSubjectRequest } = this.props
      this.spinnerMessage = 'Salvando disciplina...'
      createSubjectRequest(subject)
    }
  }

  public componentWillUnmount(): void {
    this.props.resetSubject()
  }

  public render() {
    const { subject, users } = this.props

    return (
      <React.Fragment>
        <div className="container">
          <NameHeader icon="pi pi-bars" nameHeader={subject.name ? subject.name : ''} />

          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Card title="Lista de aluno matriculados" subTitle={`Total: ${String(users.length)}`}>
                <DataTable
                  value={users}
                  responsive={true}
                  lazy={true}
                  emptyMessage="Nenhum aluno matriculado nesta turma."
                >
                  <Column
                    header="#"
                    style={{ width: '5%' }}
                    body={(data: any, column: any) => column.rowIndex + 1}
                  />
                  <Column
                    header="Alunos"
                    field="name"
                  />
                  <Column
                    style={{ width: '15%' }}
                    header="Ações"
                    body={data => {
                      return <div className="d-flex justify-content-center">
                        <Button
                          className="p-button-raised p-button-info"
                          icon="pi pi-pencil"
                          tooltip="Editar aluno..."
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => this.props.history.push(`/ead/user/${data.id}/profile`)}
                        />
                      </div>
                    }}
                  />

                </DataTable>

              </Card>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Card title="Registro de aulas" subTitle={`Total de aulas: ${String(users.length)}`}>
                <DataTable
                  value={users}
                  responsive={true}
                  lazy={true}
                  emptyMessage="Nenhum aluno matriculado nesta turma."
                >
                  <Column
                    header="#"
                    style={{ width: '5%' }}
                    body={(data: any, column: any) => column.rowIndex + 1}
                  />
                  <Column
                    header="Assuntos"
                    field="name"
                  />
                  <Column
                    header="Data"
                    field="name"
                  />
                </DataTable>

              </Card>
            </div>
          </div>

          <Button
            style={{ marginTop: '10px' }}
            tooltip="Voltar"
            onClick={() => this.props.history.goBack()}
            icon="pi pi-arrow-left"
            className="p-button-raised p-button-secondary" />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  subject: state.subject.createSubject.subject,
  data: state.subject.createSubject.data,
  loading: state.subject.createSubject.loading,
  success: state.subject.createSubject.success,
  error: state.subject.createSubject.error,

  users: state.user.listStudent.users,
  loadingUser: state.user.listStudent.loading,
  successUser: state.user.listStudent.success,
  errorUser: state.user.listStudent.error,
  paginator: state.user.listStudent.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...SubjectsActions, ...UserActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSubjects))