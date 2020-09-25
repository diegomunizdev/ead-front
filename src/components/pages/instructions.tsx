import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { History } from 'history'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import NameHeader from '../shared/name.header'

interface IProperties extends RouteComponentProps<any> {
    history: History
}

class Instructions extends Component<IProperties> {
    public render() {
        return (
            <React.Fragment>
                <div className="container">
                    <NameHeader icon="pi pi-file-o" nameHeader="Instruções do Jogo" />
                    <div className="row fade-in-down">
                        <Card className="col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ width: '100%' }}>
                            <Fieldset legend="COMO JOGAR?">
                                <div className="container d-flex justify-content-center text-justify pl-5 pr-5">
                                    <div className="row">
                                        <h3 className="left"><b>Descrição</b></h3>
                                        <br />
                                        <br />
                                        <div>  O jogo Show de Aprendizagem, tem como objetivo principal desenvolver os
                                        conhecimentos em disciplinas voltadas para o curso de <b>Ciência da Computação</b>,
                                        onde são abordadas questões de diversos níveis de acordo com o conhecimento
                                        do aluno. O jogo visa uma melhora na aprendizagem do aluno através de um jogo
                                        baseado no antigo jogo “Show do Milhão” onde os participantes respondem perguntas
                                        referentes ao tema de sua preferência dentre as alternativas existe uma correta,
                                        ao escolher a resposta correta recebem um prêmio nesse caso em dinheiro, a medida
                                        das respostas corretas, os participantes chegavam ao seu objetivo e última pergunta
                                        que valia 1 milhão de reais.</div>
                                    </div>
                                </div>

                                <div className="container d-flex justify-content-center text-justify p-5">
                                    <div className="row">
                                        <h3 className="left"><b>Instruções</b></h3>
                                        <br />
                                        <br />
                                        <span>Para jogar é bem simples, e espero que você já tenha estudado bastante sobre o
                                        assunto para responder tranquilamente todas as perguntas.
                                        </span>
                                        <br />
                                        <br />
                                        <span>Basicamente, se você alguma vez na vida assistiu o famoso jogo "Show do Milhão" então
                                        você já tem conhecimentos básicos sobre o jogo.
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            Você terá que responder questões sobre programação da disciplina que envolve programação
                                            no seu período atual o do período que você já foi aprovado, por exemplo: No primeiro período
                                            é dado a disciplina de <b>Algoritmos</b>, onde você começa a aprender o básico sobre o mundo
                                            da codificação.
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            As questões serão todas baseadas na disciplina do período que você está cursando:
                                            <br />
                                            <br />
                                            Primeiro período: <b>Algoritmos</b>
                                            <br />
                                            Segundo período: <b>Linguagem C</b>
                                            <br />
                                            Terceiro período: <b>Java</b>
                                            <br />
                                            Quarto período: <b>Banco de Dados</b>
                                            <br />
                                            Quinto período: <b>Análise e Projeto de Sistemas</b>
                                            <br />
                                            ...
                                        </span>
                                    </div>
                                </div>
                            </Fieldset>
                            <div className="d-flex justify-content-between mt-2">
                                <Button
                                    tooltip="Voltar"
                                    onClick={() => this.props.history.goBack()}
                                    icon="pi pi-arrow-left"
                                    className="p-button-raised p-button-secondary" />
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