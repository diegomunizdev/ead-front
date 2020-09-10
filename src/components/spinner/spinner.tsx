import React, { Component } from 'react'
import './spinners.css'

class Spinner extends Component <{ message?: string }, {}> {

    public render() {
        return (
            <div id="externa">

                <div id="interna">

                    <div className="lds-spinner">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>

                    {this.props.message ? <p className="text-center">{this.props.message}</p> : undefined}

                </div>

            </div>
        )
    }
}

export default Spinner