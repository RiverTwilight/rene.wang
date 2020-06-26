import React from 'react'
import '../scss/button.scss'

export default ({ theme = 'primary', children, ...others }: {
    theme?: 'primary' | '',
    children: React.ReactChildren,
    others: any
}) => {
    return (
        <button
            type="button"
            className={`button ${'btn-' + theme}`}
            {...others}
        >
            {children}
        </button>
    )
}
