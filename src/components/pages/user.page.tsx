import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { Toast } from '../../services/toast'
import NameHeader from '../shared/name.header'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

const cards = [
    { title: 'Adicionar', type: 'new', icon: 'pi pi-user-plus', info: 'Adicionar novos usuários' },
    { title: 'Administradores', type: 'admin', icon: 'pi pi-users', info: 'Lista de Administradores' },
    { title: 'Professores', type: 'teacher', icon: 'pi pi-users', info: 'Lista de Professores' },
    { title: 'Tutores', type: 'tutor', icon: 'pi pi-users', info: 'Lista de Tutores' },
    { title: 'Estudantes', type: 'student', icon: 'pi pi-users', info: 'Lista de Estudantes' }
]

class UserPage extends Component<IProperties> {

    private toastService: Toast

    constructor(props: IProperties) {
        super(props)
        this.toastService = Toast.getInstance()
    }

    public render() {
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-users" nameHeader="Gerenciamento de usuários" />
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
                                                    onClick={() => this.props.history.push(`/ead/user/type/${el.type}`)}
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

export default withRouter(UserPage)
