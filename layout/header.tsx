import React from 'react'
import Text from '../utils/i18n'
import ActiveLink from '../utils/AcitiveLink'
import '../scss/header.scss'

/**
 * 头部
 * @todo 分离各个组件
 * @todo 搜索功能
 */

type IhotSearchData = {
    kwd: string;
    href: string;
}[]

interface SearchState {
    searchIsFocus: boolean;
    kwd: string | undefined;
    inputMarginLeft: number;
    hotSearchData?: IhotSearchData
}

interface SearchProps {
}

const Hot = ({ data, isHide, left }: { isHide: boolean, left: number, data: IhotSearchData }): React.ReactElement | null => {
    if (isHide) return null
    return (
        <div
            style={{
                left: left
            }}
            className="hotwords"
        >
            <div className="hotwords-inner">
                <div className="hotwords-subtitle">
                    搜索结果
                </div>
                {data.map((item: { kwd: string, href: string }) => (
                    <a
                        href={item.href}
                        className="hotwords-item">
                        {item.kwd}
                    </a>
                ))}
            </div>
        </div>
    )
}

class Search extends React.Component<SearchProps, SearchState>{
    searchField: any;
    constructor(props: {}) {
        super(props);
        this.state = {
            searchIsFocus: false,
            kwd: undefined,
            hotSearchData: [{
                kwd: '',
                href: '#'
            }],
            inputMarginLeft: 580
        }
    }
    adjustPos() {
        this.setState({
            inputMarginLeft: window.innerWidth > 640 ? this.searchField.getBoundingClientRect().left : ''
        })
    }
    componentDidMount() {
        this.adjustPos()
        window.onresize = () => {
            this.adjustPos()
        }
    }
    render() {
        const { kwd, searchIsFocus, hotSearchData, inputMarginLeft } = this.state
        return (
            <>
                <div ref={r => this.searchField = r} className={`search ${searchIsFocus ? 'search-focus' : ''}`}>
                    <input
                        onBlur={() => {
                            this.setState({ searchIsFocus: false })
                        }}
                        onFocus={() => {
                            this.setState({ searchIsFocus: true })
                        }}
                        type="search"
                        value={kwd}
                        onChange={e => {
                            this.setState({ kwd: e.target.value })
                        }}
                        placeholder={hotSearchData[0].kwd}
                    />
                    <button className="search-btn">
                        <svg fill="#8590a6" viewBox="0 0 24 24" width="18" height="18"><path d="M17.068 15.58a8.377 8.377 0 0 0 1.774-5.159 8.421 8.421 0 1 0-8.42 8.421 8.38 8.38 0 0 0 5.158-1.774l3.879 3.88c.957.573 2.131-.464 1.488-1.49l-3.879-3.878zm-6.647 1.157a6.323 6.323 0 0 1-6.316-6.316 6.323 6.323 0 0 1 6.316-6.316 6.323 6.323 0 0 1 6.316 6.316 6.323 6.323 0 0 1-6.316 6.316z" fillRule="evenodd"></path></svg>
                    </button>
                </div>
                <Hot
                    left={inputMarginLeft}
                    data={hotSearchData}
                    isHide={!searchIsFocus}
                />
            </>
        )
    }
}

const Menu = (): React.ReactElement => {
    const dic = {
        home: {
            1: 'Home',
            0: '首页'
        },
        about: {
            1: 'About',
            0: '学校概况'
        }
    }
    return (
        <ul className="app-header-list">
            <Text dictionary={dic} language={1} >
                {[
                    {
                        text: <Text home />,
                        to: '/'
                    }, {
                        text: <Text about />,
                        to: '/about'
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
                        className="hidden-sm-down"
                        ref={r => this.input = r}
                        onFocus={() => {
                            this.setState({ isShowUl: true })
                        }}
                        onBlur={() => {
                            //this.setState({ isShowUl: false })
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

export default class extends React.Component<{ config: any; }, { lang: number }>{
    constructor(props: any) {
        super(props);
        this.state = {
            lang: /*parseInt(localStorage.language) ||*/ 0
        }
    }
    render() {
        const { lang } = this.state;
        const { config } = this.props;
        return (
            <>
                <div className="app-header">
                    <div className="app-header-inner">
                        <a className="hidden-sm-down">
                            <img className="logo-large" src={config.logo.large} />
                        </a>
                        <a className="hidden-md-up">
                            <img className="logo-small" src={config.logo.small} />
                        </a>
                        <Menu />
                        <Search />
                        <Language
                            value={lang}
                            cb={lang => {
                                localStorage.setItem('language', String(lang));
                                window.location.reload()
                            }}
                            list={['简体中文', 'English']}
                        />
                    </div>
                </div>
            </>
        )
    }
}
