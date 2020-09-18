import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import '../styles.css'

import { Toolbar } from 'primereact/toolbar'
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Menu } from 'primereact/menu';
import authService from '../../services/auth'

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
                            <h5 style={{ fontWeight: 'normal', marginTop: '1em' }}>Menu</h5>

                            <Button
                                icon="pi pi-home"
                                iconPos="left"
                                label="Home"
                                className="p-button-menu"
                                onClick={() => {
                                    this.props.history.push(`/ead/main`)
                                    this.setState({ sb: false })
                                }} />
                            <Button
                                icon="pi pi-user"
                                iconPos="left"
                                label="Perfil"
                                className="p-button-menu"
                                onClick={() => {
                                    this.props.history.push(`/ead/user/${authService.UserId()}/profile`)
                                    this.setState({ sb: false })
                                }} />
                            <Button
                                icon="pi pi-palette"
                                iconPos="left"
                                label="Show de Aprendizagem"
                                className="p-button-menu"
                                onClick={() => {
                                    this.props.history.push(`/ead/game/period`)
                                    this.setState({ sb: false })
                                }} />

                            <Button
                                className="p-button-sm  p-button-danger"
                                style={{ width: '100%', marginTop: '2em' }}
                                label="Sair"
                                onClick={() => {
                                    localStorage.clear()
                                    this.props.history.push('/ead/auth/signin')
                                }} />
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