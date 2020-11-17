import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import '../styles.css'

import { Toolbar } from 'primereact/toolbar'
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import authService from '../../services/auth'
import { Permission } from "../permission/permission";

export interface IMenu {
    exact?: boolean
    strict?: boolean
    to: string
    icon?: string
    description: string
    scopes?: string[],
}

interface IProps {
    username: string
}



interface DispatchProps extends RouteComponentProps<any> {
    changeEmail(data: string): void
}

type Props = DispatchProps & IProps

class NavBar extends Component<Props, { sb: boolean }> {


    constructor(props: Props) {
        super(props)

        this.state = {
            sb: false
        }

    }

    public render() {

        const menuItems = [
            {
                label: 'Página Inicial', icon: 'pi pi-home', command: () => {
                    this.props.history.push(`/ead/main`)
                    this.setState({ sb: false })
                }
            },
            {
                label: 'Perfil', icon: 'pi pi-user', command: () => {
                    this.props.history.push(`/ead/user/${authService.UserId()}/profile`)
                    this.setState({ sb: false })
                },

            },

            {
                label: 'Show de Aprendizagem', icon: 'pi pi-palette', command: () => {
                    this.props.history.push(`/ead/user/${authService.UserId()}/game/period/1/question`)
                    this.setState({ sb: false })
                }
            }
        ]

        return (
            <React.Fragment>
                <Toolbar>

                    <div className="d-flex justify-content-between" >
                        <Button
                            className="p-button-bars"
                            icon="pi pi-bars"
                            tooltip="Menu"
                            tooltipOptions={{ position: 'right' }}
                            onClick={() => this.setState({ sb: true })} />

                        <Sidebar visible={this.state.sb} baseZIndex={1000000} onHide={() => this.setState({ sb: false })}>
                            {/* Opção de colocar o nome do usuário */}
                            <div style={{ height: '100%' }}>
                                <div className="d-flex justify-content-center" style={{ marginTop: '15px', borderBottom: '1px solid var(--color-eight)' }}>
                                    <h5 style={{ color: 'white', fontWeight: 'normal', marginTop: '1em' }}>Menu</h5>
                                </div>

                                {
                                    menuItems.map(items => {
                                        return <Button
                                            key={items.label}
                                            icon={items.icon}
                                            iconPos="left"
                                            style={{ textAlign: 'left' }}
                                            label={items.label}
                                            className="p-button-menu"
                                            onClick={items.command} />
                                    })
                                }

                                <Permission type="teacher" body={
                                    <Button
                                        icon="pi pi-users"
                                        iconPos="left"
                                        style={{ textAlign: 'left' }}
                                        label="Turmas"
                                        className="p-button-menu"
                                        onClick={() => {
                                            this.props.history.push(`/ead/classes/${authService.UserId()}`)
                                            this.setState({ sb: false })
                                        }} />
                                } />

                                <Permission type="admin" body={
                                    <Button
                                        icon="pi pi-users"
                                        iconPos="left"
                                        style={{ textAlign: 'left' }}
                                        label="Gerenciamento de Usuários"
                                        className="p-button-menu"
                                        onClick={() => {
                                            this.props.history.push('/ead/user/management')
                                            this.setState({ sb: false })
                                        }} />
                                } />



                                <Button
                                    className="p-button-sm  p-button-danger"
                                    style={{ width: '100%', marginTop: '2em' }}
                                    label="Sair"
                                    onClick={() => {
                                        localStorage.clear()
                                        this.props.history.push('/ead/auth/signin')
                                    }} />
                                <div className="d-flex justify-content-center align-items-end footer-sidebar">
                                    <div>Feito com <i style={{ color: 'red' }} className="pi pi-heart" /></div>
                                </div>
                            </div>
                        </Sidebar>

                        <h5>Controle Acadêmico</h5>
                        <span>
                            <Button
                                className="p-button-sm  p-button-danger"
                                tooltip="Sair"
                                tooltipOptions={{ position: 'left' }}
                                icon="pi pi-sign-out"
                                onClick={() => {
                                    localStorage.clear()
                                    this.props.history.push('/ead/auth/signin')
                                }} />
                        </span>

                    </div>
                </Toolbar>
            </React.Fragment>
        )
    }
}

export default NavBar