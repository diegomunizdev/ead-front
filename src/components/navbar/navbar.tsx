import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import '../styles.css'

import { Toolbar } from 'primereact/toolbar'
import { Button } from "primereact/button";

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
    changeUsername(data: string): void
}

type Props = DispatchProps & IProps

class NavBar extends Component<Props> {

    public render() {

        return (
            <React.Fragment>
                <Toolbar>
                    <div className="d-flex justify-content-between" >
                        <h5>Controle Acadêmico</h5>
                        <span>
                            <Button className="p-button-danger p-button-raised" label="Sair" iconPos="right" icon="pi pi-sign-out" onClick={() => {
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