import * as React from 'react'
import styled from 'styled-components'

const List = styled.ul`
    padding: 10px;
    .subtitle {
        font-size: 14px;
        color: #8590a6;
        padding: 2px 0;
        width: 100%;
        border-bottom: 1px solid #f0f2f7;
    }
    li {
        font-size: 16px;
        cursor: pointer;
        width: 100%;
        margin: 10px 0;
        &:hover {
            color: $themeColor;
        }
    }
`

export default ({ items }: {items: React.ReactNode[]}) => (
    <List>
        {items.map((item: React.ReactNode) => (
            <li>{item}</li>
        ))}
    </List>
)