import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

class NotFound extends Component<IProperties, {}> {

    public render() {
        return (
            <div className="container not-found d-flex justify-content-center align-items-center">

                <Card>
                    <h2>PÁGINA NÃO ENCONTRADA!</h2>

                    <Button className="btn btn-success btn-block" label="VOLTAR" onClick={() => {
                        this.props.history.push('/app')
                    }} />
                </Card>

            </div>


        )
    }
}

export default withRouter(NotFound)