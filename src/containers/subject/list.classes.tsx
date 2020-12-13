import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Toast } from '../../services/toast.service'
import * as SubjectsActions from '../../store/ducks/subjects/actions'
import Subjects from '../../store/application/models/subjects.model'
import { IApplicationState } from '../../store'
import { Card } from 'primereact/card'
import NameHeader from '../../components/shared/name.header'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import * as ClassesActions from '../../store/ducks/classes/actions'

import User, { UserTypes } from '../../store/application/models/user/user'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator } from '../../store/ducks/root.types'
import { INITIAL_STATE } from '../../store/ducks/user/reducer'
import Classes from '../../store/application/models/classes.model'

interface IState {
  readonly subject: Subjects
  readonly data: ErrorEvent
  readonly loading: boolean
  readonly success: boolean
  readonly error: boolean

  readonly classes: Classes[]
  readonly dataClasse: ErrorEvent
  readonly loadingClasse: boolean
  readonly errorClasse: boolean
  readonly successClasse: boolean

  readonly users: User[]
  readonly dataUser: ErrorEvent
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

  loadClassesRequest(subjectId: string, paginator?: IPaginator): void

  loadUsers(userType: UserTypes, paginator: IPaginator): void
}

interface IOwnProps {
  userType: UserTypes
}

type Props = IState & IDispatchProps & IOwnProps

class ListClasses extends Component<Props> {

  private spinnerMessage: string
  private toastService: Toast

  constructor(props: Props) {
    super(props)

    this.spinnerMessage = ''
    this.toastService = Toast.getInstance()

    const { loadClassesRequest, findSubjectRequest, changeSubject, match: { params }, loadUsers } = this.props
    loadUsers(UserTypes.STUDENT, INITIAL_STATE.listAdmins.paginator)
    if (params && params.subjectId) {
      changeSubject(new Subjects().fromJSON({
        ...this.props,
        id: params.subjectId
      }))
      this.spinnerMessage = 'Buscando disciplina...'
      findSubjectRequest(params.subjectId)
      loadClassesRequest(params.subjectId)
    }
  }

  public render() {
    const { subject, users, classes } = this.props

    return (
      <React.Fragment>
        <div className="container">
          <NameHeader icon="pi pi-bars" nameHeader={subject.name ? subject.name : ''} />

          <div className="row fade-in-down">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Card title="Lista de aluno matriculados" subTitle={`Total de Alunos: ${String(users.length)}`}>
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
              <Card title="Registro de aulas" subTitle={`Total de aulas: ${String(classes.length)}`}>
                <DataTable
                  value={classes}
                  responsive={true}
                  lazy={true}
                  emptyMessage="Nenhuma aula registrada até o momento."
                >
                  <Column
                    header="#"
                    style={{ width: '5%' }}
                    body={(data: any, column: any) => column.rowIndex + 1}
                  />
                  <Column
                    header="Assuntos"
                    field="record"
                  />
                  <Column
                    header="Data"
                    field="date"
                  />
                </DataTable>

                <div className="d-flex justify-content-end">
                  <Button
                    style={{ marginTop: '10px' }}
                    label="Registrar aula"
                    onClick={() => this.props.history.push(`/ead/subject/${subject.id}/classes/new`)}
                    className="p-button-raised p-button-primary" />
                </div>

              </Card>
            </div>
          </div>

          <Button
            style={{ marginTop: '10px' }}
            label="Voltar"
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

  classes: state.classes.listClasses.classes,
  dataClasse: state.classes.listClasses.data,
  loadingClasse: state.classes.listClasses.loading,
  errorClasse: state.classes.listClasses.error,
  successClasse: state.classes.listClasses.success,

  users: state.user.listStudent.users,
  loadingUser: state.user.listStudent.loading,
  successUser: state.user.listStudent.success,
  errorUser: state.user.listStudent.error,
  paginator: state.user.listStudent.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  ...SubjectsActions,
  ...UserActions,
  ...ClassesActions
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListClasses))