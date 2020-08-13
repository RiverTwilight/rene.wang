import React from 'react'
import styled from 'styled-components'
import { Headmaster, CardMenu } from './utils';

const LoveIcon = styled.svg`
    display: inline-block;
    width: 0.944444rem;
    color: rgb(255, 85, 85);
    transform: translateY(10%);
`

interface DrawerProps {
    config: any
}

interface DrawerState {
    copyrightFixed: boolean;
    drawerWidth: number;
    drawerLeft: number;
    copyrightTop: number
}

/**
 * PC端右侧部公共菜单
 */

export default class extends React.Component<DrawerProps, DrawerState> {
    drawer: any;
    copyright: any;
    constructor(props: Readonly<DrawerProps>) {
        super(props);
        this.state = {
            copyrightFixed: false,
            drawerWidth: 296,
            drawerLeft: 0,
            copyrightTop: 0
        }
    }
    componentDidMount() {
        window.innerWidth >= 640 && window.addEventListener('scroll', () => {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(t)
            if (t > 500) {
                this.setState({ copyrightFixed: true })
            } else {
                this.setState({ copyrightFixed: false })
            }
        })
        //将初始状态保存以便固定
        var toTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.setState({
            drawerLeft: this.drawer.getBoundingClientRect().left,
            drawerWidth: this.drawer.getBoundingClientRect().width,
            copyrightTop: this.copyright.getBoundingClientRect().top + toTop
        })
    }
    render() {
        const { copyrightFixed, drawerWidth, drawerLeft, copyrightTop } = this.state
        const drawerStyle = copyrightFixed ? {
            left: drawerLeft,
            width: drawerWidth + 'px',
        } : {}
        return (
            <div
                ref={r => this.drawer = r}
                style={drawerStyle}
                className={`${copyrightFixed ? "is-fixed" : ""}`}
            >
                <Headmaster config={this.props.config.author} />
                <CardMenu />
                <div className="creater-pannel card">
                    <div className="go-to-creater"></div>
                </div>
                <div ref={r => this.copyright = r} className={`copyright`}>
                    Made With
                    <LoveIcon viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></LoveIcon>
                    by 江村暮<br></br>
                    <a href="https://github.com/rivertwilight/NBlog">开放源代码</a> - <a href="https://www.yungeeker.com">关于作者</a><br></br>
                </div>
            </div>
        )
    }
}
