import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import authService from '../../services/auth.service'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

class NotFound extends Component<IProperties, {}> {

    public render() {
        return (
            <div className="container not-found d-flex justify-content-center align-items-center">

                <Card
                    style={{ padding: '10px' }}
                    title="404 - Página não encontrada"
                    subTitle="Verifique se a URL foi digitada corretamente"
                    header={
                        <div className="d-flex justify-content-center p-3">
                            <i style={{ fontSize: '8em', color: '#212F3C' }} className="pi pi-times" />
                        </div>}
                >

                    <Button
                        style={{ marginTop: '25px' }}
                        className="p-button-raised p-button-primary btn-block"
                        label={
                            authService.isAuthenticated()
                                ? "Voltar para a página inicial"
                                : "Realizar login"
                        }
                        onClick={() => {
                            authService.isAuthenticated()
                                ? this.props.history.push('/ead/main')
                                : this.props.history.push('/ead/auth/Login')
                        }} />
                </Card>

            </div>


        )
    }
}

export default withRouter(NotFound)