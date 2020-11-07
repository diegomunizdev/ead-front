import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { Toast } from '../../services/toast'
import NameHeader from '../shared/name.header'
import authService from '../../services/auth'

interface IProperties extends RouteComponentProps<any> {
  history: History
}

const cards = [
  { title: 'Adicionar', type: 'new', icon: 'pi pi-plus', info: 'Adicionar novas disciplinas' },
  { title: 'Disciplinas', type: 'admin', icon: 'pi pi-clone', info: 'Lista de disciplinas' },
]

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
            {
              cards.map(el => {
                return <div key={el.type} className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                  <Card
                    title={el.title}
                    className="bg-card"
                    subTitle={el.info}
                    header={
                      <div className="d-flex justify-content-center p-3">
                        <i style={{ fontSize: '5em', color: '#212F3C' }} className={`${el.icon} move-icon`} />
                      </div>}
                    footer={
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={() => this.props.history.push(`/ead/subjects/${authService.UserId()}`)}
                          className="p-button-raised p-button-primary"
                          label="Acessar" />
                      </div>} />
                </div>
              })
            }


          </div>
        </div>
      </React.Fragment >
    )
  }

}

export default withRouter(SubjectPage)