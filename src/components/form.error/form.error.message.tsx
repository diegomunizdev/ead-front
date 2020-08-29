import React from 'react'

import { ErrorMessage } from 'formik'

export function FormErrorMessage(props: { name: string }) {
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            &ensp;
            <ErrorMessage className="color-error text-center"
                          name={props.name} component="span"/>
        </div>
    )
}