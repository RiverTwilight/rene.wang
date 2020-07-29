import * as React from 'react'
import Search from './Search'
import Text from '../../utils/i18n'
import ActiveLink from '../../utils/AcitiveLink'
import '../../scss/header.scss'

/**
 * 头部
 * @todo 分离各个组件
 * @todo 搜索功能
 */

const Menu = (): React.ReactElement => {
    const dic = {
        home: {
            1: 'Home',
            0: '首页'
        }
    }
    return (
        <ul className="app-header-list">
            <Text dictionary={dic} language={0} >
                {[
                    {
                        text: <Text home />,
                        to: '/'
                    }
                ].map(item => (
                    <ActiveLink activeClassName="app-header-list-item-active" href={item.to}>
                        <a className="app-header-list-item">{item.text}</a>
                    </ActiveLink>
                ))}
            </Text>
        </ul>
    )
}

class Language extends React.Component
    <
    {
        list: string[];
        cb(newLang: number): void;
        value: number
    }, {
        isShowUl: boolean;
        style: {};
    }
    >
{
    input: any
    constructor(props: Readonly<{ list: string[]; cb(newLang: number): void; value: number }>) {
        super(props);
        this.state = {
            isShowUl: false,
            style: {}
        }
    }
    componentDidMount() {
        this.setState({
            style: {
                position: "fixed",
                top: this.input.getBoundingClientRect().top + this.input.style.height,
                left: this.input.getBoundingClientRect().left
            }
        })
    }
    render() {
        const { isShowUl, style } = this.state
        const { list, cb, value } = this.props;
        return (
            <>
                <div className="select language">
                    <button
                        className=""
                        ref={r => this.input = r}
                        onClick={() => {                   
                            this.setState({ isShowUl: true }, ()=>{
                                document.body.addEventListener('click', () => {
                                    this.setState({ isShowUl: false });
                                    document.body.removeEventListener('click', ()=>{})
                                })
                            })
                        }}
                    >{list[value]}</button>
                    <div style={Object.assign({
                        display: isShowUl ? 'block' : 'none'
                    }, style)}>
                        <span className="arrow-up"></span>
                        <ul className="card">
                            {list.map((item, i) => (
                                <li key={item} onClick={_ => {
                                    cb && cb(i);
                                    this.setState({ isShowUl: false })
                                }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default class extends React.Component<{ config: any; allPosts: any }, { lang: number }>{
    constructor(props: any) {
        super(props);
        this.state = {
            lang: /*parseInt(localStorage.language) ||*/ 0
        }
    }
    render() {
        const { lang } = this.state;
        const { config, allPosts } = this.props;
        return (
            <>
                <div className="app-header">
                    <div className="app-header-inner">
                        <a href="/" className="logo hidden-sm-down">
                            <img className="logo-large" src={config.logo.large} />
                        </a>
                        <a href="/" className="logo hidden-md-up">
                            <img className="logo-small" src={config.logo.small} />
                        </a>
                        <Menu />
                        <div className="app-header-space"></div>
                        <Search allPosts={allPosts} />
                        {/**<Language
                            value={lang}
                            cb={lang => {
                                localStorage.setItem('language', String(lang));
                                window.location.reload()
                            }}
                            list={['简体中文', 'English']}
                        />**/}
                    </div>
                </div>
            </>
        )
    }
}
