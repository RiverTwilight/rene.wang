import React from 'react'
import styled from 'styled-components'

const IconPath1 = styled.path`
    fill:none;
    stroke:#000;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:32px
`

const IconPath2 = styled.path`
    fill:none;
    stroke:#000;
    stroke-miterlimit:10;
    stroke-width:32px
`
export default () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
        <title>ionicons-v5-j</title>
        <IconPath1 d='M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z' />
        <IconPath2 d='M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z' />
    </svg>
)
