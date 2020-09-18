import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { Toast } from '../../services/toast'
import authService from '../../services/auth'
import { Permission } from '../permission/permission'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

class Main extends Component<IProperties> {

    private toastService: Toast

    constructor(props: IProperties) {
        super(props)
        this.toastService = Toast.getInstance()
    }

    public render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Perfil"
                                subTitle="Informações pessoais"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-user" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/user/${authService.UserId()}/profile`)}
                                            className="p-button-raised p-button-primary"
                                            label="Acessar" />
                                    </div>} />
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Fórum"
                                subTitle="Salas de dúvidas entre professores e alunos"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-comments" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/game/instructions`)}
                                            className="p-button-raised p-button-secondary"
                                            label="Informações" />
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/game/period`)}
                                            className="p-button-raised p-button-primary"
                                            label="Acessar" />
                                    </div>
                                }
                            />
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Turmas"
                                subTitle="Gerenciamento das turmas"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-users" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/user/${authService.UserId()}/profile`)}
                                            className="p-button-raised p-button-primary"
                                            label="Acessar" />
                                    </div>
                                }
                            />
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Arquivos"
                                subTitle="Material das disciplinas"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-folder-open" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/user/${authService.UserId()}/profile`)}
                                            className="p-button-raised p-button-primary"
                                            label="Acessar" />
                                    </div>} />
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Show de Aprendizagem"
                                subTitle="Aprenda jogando e ganhe pontos valiosos"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-palette" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/game/instructions`)}
                                            className="p-button-raised p-button-secondary"
                                            label="Instruções" />
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/game/period`)}
                                            className="p-button-raised p-button-primary"
                                            label="Jogar" />
                                    </div>
                                }
                            />
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2">
                            <Card
                                title="Usuários"
                                subTitle="Gerenciamento de usuários"
                                header={
                                    <div className="d-flex justify-content-center p-3">
                                        <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-user-edit" />
                                    </div>}
                                footer={
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            onClick={() => this.props.history.push(`/ead/user/${authService.UserId()}/profile`)}
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

export default withRouter(Main)
