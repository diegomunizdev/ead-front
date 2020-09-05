import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

class Instructions extends Component<IProperties> {
    constructor(props: IProperties) {
        super(props)
    }

    public render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Card style={{ width: '100%' }}>
                            <Fieldset legend="Instruções">

                            </Fieldset>
                            <div className="d-flex justify-content-between mt-2">
                                <Button
                                    onClick={() => this.props.history.goBack()}
                                    icon="pi pi-arrow-left"
                                    className="p-button-raised p-button-secondary"
                                    label="Voltar" />
                                <Button
                                    onClick={() => this.props.history.push(`/ead/game`)}
                                    icon="pi pi-palette"
                                    className="p-button-raised p-button-primary"
                                    label="Iniciar jogo" />
                            </div>
                        </Card>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Instructions)