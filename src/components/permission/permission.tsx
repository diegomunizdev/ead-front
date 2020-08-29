import React, { Component } from 'react'
import authService from '../../services/auth'

interface IProps {
    type: string
    body: any
}

export class Permission extends Component<IProps> {

    constructor(props: IProps) {
        super(props)
    }

    public render() {
        const { type, body } = this.props
        return (
            <React.Fragment>
                {authService.typeUser() === type
                    ? body
                    : ''
                }
            </React.Fragment>
        )
    }

}