import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { Toast } from '../../services/toast.service'
import NameHeader from '../shared/name.header'
import authService from '../../services/auth.service'
import { Permission } from '../permission/permission'

interface IProperties extends RouteComponentProps<any> {
  history: History
}

class SubjectPage extends Component<IProperties> {

  private toastService: Toast

  constructor(props: IProperties) {
    super(props)
    this.toastService = Toast.getInstance()
  }

  public render() {
    return (
      <React.Fragment>
        <div className="container">
          <NameHeader icon="pi pi-clone" nameHeader="Gerenciamento de Disciplinas" />
          <div className="row fade-in-down">
            <Permission type="admin" body={
              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                <Card
                  title="Adicionar"
                  subTitle="Adicionar novas disciplinas"
                  header={
                    <div className="d-flex justify-content-center p-3">
                      <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-plus move-icon" />
                    </div>}
                  footer={
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => this.props.history.push(`/ead/subjects/list`)}
                        className="p-button-raised p-button-primary"
                        label="Acessar" />
                    </div>
                  }
                />
              </div>
            } />

            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
              <Card
                title="Disciplinas"
                subTitle="Disciplinas que estou matriculado"
                header={
                  <div className="d-flex justify-content-center p-3">
                    <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-clone move-icon" />
                  </div>}
                footer={
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => this.props.history.push(`/ead/subjects/${authService.UserId()}`)}
                      className="p-button-raised p-button-primary"
                      label="Acessar" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </React.Fragment >
    )
  }

}

export default withRouter(SubjectPage)