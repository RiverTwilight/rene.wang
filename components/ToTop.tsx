import * as React from 'react'
import styled, { css } from 'styled-components'

const ToTop = styled.button`
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    outline: none;
    transition: 0.5s all;
    ${props => props.hide && css`
        bottom: -50px
    `}
`

declare global {
    interface Window {
        toTop: any;
    }
}

export default () => {
    const [isHide, setHide] = React.useState(true)
    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t <= 148) {
                setHide(true)
            } else {
                setHide(false)
            }
        })
        return () => { window.removeEventListener("scroll", () => { }) }
    }, [])
    return (
        <ToTop
            hide={isHide}
            onClick={() => {
                if (document.documentElement.scrollTop) {
                    window.toTop = setInterval(() => {
                        if (document.documentElement.scrollTop === 0) clearInterval(window.toTop)
                        document.documentElement.scrollTop -= 200
                    }, 40);
                } else {
                    window.history.pushState(null, '', '#')//兼容
                }
            }}
        >
            t
        </ToTop>
    )
}
