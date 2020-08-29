import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'
import { Toast } from '../../services/toast'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

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
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-1">
                            <Card title="PERFIL" subTitle="Informações pessoais">
                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => this.props.history.push('/app/church')} icon="pi pi-user" className="p-button-raised p-button-primary" label="Acessar" />
                                </div>
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-1">
                            <Card title="Title card" subTitle="Subtitle do card">
                                <Button onClick={() => this.props.history.goBack()} className="p-button-raised p-button-primary" label="Acessar" />
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-1">
                            <Card title="Title card" subTitle="Subtitle do card">
                                <Button onClick={() => this.toastService.show('success', 'Testando...', 'Testando o toast')} className="p-button-raised p-button-primary" label="Acessar" />
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 p-1">
                            <Card title="Title card" subTitle="Subtitle do card">
                                <Button onClick={() => this.props.history.push('/app')} className="p-button-raised p-button-primary" label="Acessar" />
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 p-1">
                            <Card title="Title card" subTitle="Subtitle do card">
                                <Button onClick={() => this.props.history.goBack()} className="p-button-raised p-button-primary" label="Acessar" />
                            </Card>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(Main)
