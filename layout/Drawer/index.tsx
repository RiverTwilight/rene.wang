import React from 'react'
import { Headmaster, CardMenu } from './utils';
/**
 * PC端右侧部公共菜单
 */
interface DrawerProps {
    config: any
}

interface DrawerState {
    copyrightFixed: boolean;
    drawerWidth: number;
    drawerLeft: number;
    copyrightTop: number
}

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
            var t = document.documentElement.scrollTop || document.body.scrollTop;
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
            top: `-${copyrightTop + 65.5}px`
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
                    本博客系统基于Next.js开发，Theme By 江村暮<br></br>
                    <a href="https://github.com/rivertwilight/knows">开放源代码</a> - <a href="https://www.yungeeker.com">关于作者</a><br></br>
                </div>
            </div>
        )
    }
}
