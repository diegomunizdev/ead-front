import React, { Component } from 'react'
import '../styles.css'

interface IProps {
    icon: string
    nameHeader: string
}

class NameHeader extends Component<IProps> {
    public render() {
        const { icon, nameHeader } = this.props
        return (
            <React.Fragment>
                <div className="header-page">
                    <i className={icon + " icon-header"} />
                    <span className="h3 name-header">{nameHeader}</span>
                </div>
            </React.Fragment>
        )
    }
}

export default NameHeader