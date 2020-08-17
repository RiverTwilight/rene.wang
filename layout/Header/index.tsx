import * as React from 'react'
import styled from 'styled-components'
import Search from './Search'
import Text from '../../utils/i18n'
import { nav } from '../../data/i18n.json'
import ActiveLink from '../../utils/AcitiveLink'
import '../../scss/header.scss'
import { LinkTargetResolver } from 'react-markdown'

/**
 * 头部
 * @todo 分离各个组件rr
 */

const ShareIcon = styled.path`
    fill: #1DA1F2;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:48px;
`

const Menu = ({ lang }): React.ReactElement => {
    return (
        <ul className="app-header-list">
            <Text dictionary={nav} language={lang} >
                {[
                    {
                        text: <Text homePage />,
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
        list: { text: string, code: lang }[];
        cb(newLang: lang): void;
        value: lang
    }, {
        isShowUl: boolean;
        style: {};
    }
    >
{
    input: any
    constructor(props) {
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
                            this.setState({ isShowUl: true }, () => {
                                document.body.addEventListener('click', () => {
                                    this.setState({ isShowUl: false });
                                    document.body.removeEventListener('click', () => { })
                                })
                            })
                        }}
                    >{list.filter(lang => lang.code === value)[0].text}</button>
                    <div style={Object.assign({
                        display: isShowUl ? 'block' : 'none'
                    }, style)}>
                        <span className="arrow-up"></span>
                        <ul className="card">
                            {list.map(({ code, text }) => (
                                <li key={code} onClick={_ => {
                                    cb && cb(code);
                                    this.setState({ isShowUl: false })
                                }}>{text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

const SubHeader = ({ currentPage, siteConfig }) => (
    <div
        className="app-header-inner"
    >
        <a href="/" className="logo hidden-sm-down">
            <img alt={siteConfig.title} className="logo-large" src={siteConfig.logo.large} />
        </a>
        <h2 className="app-header-inner-subtitle" >{currentPage.text}</h2>
        <div className="app-header-space"></div>
        <a target="_blank" href={`https://twitter.com/intent/tweet?url=${siteConfig.root}${currentPage.path}`}>
            <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>ionicons-v5_logos</title>
                <ShareIcon d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
            </svg>
        </a>
    </div>
)

const MainHeader = ({ siteConfig, allPosts, lang }) => (
    <div
        className="app-header-inner">
        <a href="/" className="logo hidden-sm-down">
            <img alt={siteConfig.title} className="logo-large" src={siteConfig.logo.large} />
        </a>
        <a href="/" className="logo hidden-md-up">
            <img alt={siteConfig.title} className="logo-small" src={siteConfig.logo.small} />
        </a>
        <Menu lang={lang} />
        <div className="app-header-space"></div>
        <Search allPosts={allPosts} />
        <Language
            value={lang}
            cb={lang => {
                localStorage.setItem('lang', lang);
                window.location.reload()
            }}
            list={[{
                text: '简体中文',
                code: 'zh'
            }, {
                text: 'English',
                code: "en"

            }]}
        />
    </div>
)

class Header extends React.Component<
    {
        config: any;
        allPosts: any,
        currentPage?: ICurrentPage,
        lang: lang,
    },
    {
        subHeader: boolean
    }>{

    constructor(props: any) {
        super(props);
        this.state = {
            subHeader: false
        }
    }
    handleScroll() {
        const t1 = document.documentElement.scrollTop || document.body.scrollTop;
        if (!window.scrollListener && this.props.currentPage.path.match(/\/blog\/\d+/)) {
            window.scrollListener = setTimeout(() => {
                let t2 = document.documentElement.scrollTop || document.body.scrollTop;
                if (t2 - t1 > 70) {
                    this.setState({ subHeader: true })
                } else if (t2 - t1 < -70) {
                    this.setState({ subHeader: false })
                }
                clearTimeout(window.scrollListener)
                window.scrollListener = null
            }, 400)
        }
    }
    activeMonitor() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }
    render() {
        const { subHeader } = this.state;
        const { lang, config, allPosts, currentPage } = this.props;
        return (
            <>
                <div
                    style={this.props.currentPage.path.match(/\/blog\/\d+/) ? {
                        marginTop: subHeader ? '-50px' : '',
                        height: !subHeader ? '50px' : ''
                    } : {
                            marginTop: '',
                            height: '50px'
                        }}
                    className="app-header">
                    <MainHeader
                        lang={lang}
                        siteConfig={config}
                        allPosts={allPosts}
                    />
                    <SubHeader
                        siteConfig={config}
                        currentPage={currentPage}
                    />
                </div>
            </>
        )
    }
}

export default Header
