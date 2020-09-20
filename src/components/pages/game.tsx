import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

const cards = [
    { title: 'Bem vindo ao seu Primeiro Código, opa... quis dizer Período', subtitle: 'Inicie sua jornada na programação com o assunto de Algoritmos', period: '1', button: 'Que comecem os jogos' },
    { title: 'Segundo e tenso Período', subtitle: 'Próxima parada, Linguagem C, o medo dos devs fracos', period: '2', button: 'C tá com medo né?' },
    { title: '10 linhas de código pra saída ser um: Terceiro Período', subtitle: 'Tá melhorando hein, vamos ver nesse período Ha-Ha-Ha', period: '3', button: 'Javai se preparando' },
    { title: 'Quarto e louco Período', subtitle: 'Preparado para guardar suas respostas?', period: '4', button: 'BD da sofrência' },
    { title: 'Documente o seu Quinto Período', subtitle: 'Mas faltou apenas uma vírgula na documentação', period: '5', button: 'Boa sorte' }
]

class Games extends Component<IProperties> {

    public render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Card
                        className="card col-sm-12 col-md-12 col-col-lg-12 col-xl-12 mb-2 fade-in-down"
                    >
                        <div className="d-flex justify-content-center">
                            <h2>Show de Aprendizagem</h2>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                tooltip="Voltar"
                                className=" p-button-raised p-button-secondary"
                                icon="pi pi-arrow-left"
                                onClick={() => {
                                    this.props.history.goBack()
                                }} />
                            <Button
                                tooltip="Iniciar"
                                label="Iniciar"
                                className="p-button-raised p-button-primary"
                                icon="pi pi-palette"
                                onClick={() => {
                                    this.props.history.push('/ead/game/period/1')
                                }} />
                        </div>
                    </Card>

                    {cards.map(card => {
                        return <Card key={card.period}
                            className="card col-sm-12 col-md-12 col-col-lg-12 col-xl-12 mb-2 fade-in-down"
                            title={card.title}
                            subTitle={card.subtitle}>
                            <div className="d-flex justify-content-end">
                                <Button
                                    tooltip="Iniciar"
                                    tooltipOptions={{ position: 'top' }}
                                    onClick={() => this.props.history.push(`/ead/game/period/${card.period}`)}
                                    className="p-button-raised p-button-primary"
                                    label={card.button} />
                            </div>
                        </Card>
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Games)