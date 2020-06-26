import React, {useState} from 'react'
import matter from 'gray-matter'
import PassageItem from '../components/PassageLine'
import Marquee from '../components/Marquee'
import Text from '../utils/languages'
import Layout from '../layout/index'
import '../scss/tab.scss'

export async function getStaticProps() {
    //get posts & context from folder
    const posts = (context => {
        const keys = context.keys()
        const values = keys.map(context)
        const data = keys.map((key, index) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.')
            const value = values[index]
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default)
            return {
                defaultTitle: slug,
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            }
        })
        return data
    })(require.context('../posts', true, /\.md$/))
    const config = await import(`../data/config.json`)
    return {
        props: {
            allBlogs: posts,
            siteConfig: config.default
        },
    }
}

const Tab = ({ onChange }) => {
    const [extandTab, setExtandTab] = useState(false);
    const [selected, setSelected] = useState(0)
    const dic = {
        tab1: {
            1: 'News',
            0: '新闻动态'
        },
        tab2: {
            1: 'Notice',
            0: '信息公告'
        },
        tab3: {
            1: 'Spirit',
            0: '德育视窗'
        },
        tab4: {
            1: 'Teachers\' education',
            0: '教师培训'
        },
        tab5: {
            1: 'Teachers',
            0: '师资风采'
        },
        party: {
            1: 'Communisium',
            0: '党群工会'
        }
    }
    return (
        <div className="header-tab card">
            <nav className={`tab ${extandTab ? 'tab-extend' : ''}`}>
                <Text language='1' dictionary={dic}>
                    {[
                        {
                            text: <Text tab1 />,
                            to: "/",
                            exact: true
                        }, {
                            text: <Text tab2 />,
                            to: "/notice"
                        }, {
                            text: <Text tab3 />,
                            to: "/spirit"
                        }, {
                            text: <Text tab4 />,
                            to: "/image"
                        }, {
                            text: <Text tab5 />,
                            to: "/image"
                        }, {
                            text: <Text party />,
                            to: "/image"
                        }
                    ].map((tab, i) => (
                        <a
                            onClick={_ => {
                                onChange(i)
                                setSelected(i)
                            }}
                            className={selected === i ? 'tab-active' : ''}>
                            {tab.text}
                        </a>
                    ))}
                </Text>
            </nav>
            <button
                className="tab-showmore"
                onClick={_ => {
                    setExtandTab(!extandTab)
                }}
            >
                {!extandTab ? '显示更多' : '收起更多'}
            </button>
        </div>
    )
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: 0
        }
    }
    render() {
        const { allBlogs, siteConfig } = this.props
        return (
            <Layout config={siteConfig}>
                <Marquee
                    imgList={[
                        "//7953524.s21i.faiusr.com/2/ABUIABACGAAgn4b40AUoz5e4lAQwgA84wgM.jpg",
                        "//7953524.s21i.faiusr.com/2/ABUIABACGAAgjIP40AUou5fWHzCADzjCAw.jpg",
                        "//7953524.s21i.faiusr.com/2/ABUIABACGAAgp4P40AUo9fX3-wEwgA84wgM.jpg"
                    ]}
                />
                <Tab onChange={index => {
                    this.setState({
                        channel: index
                    })
                }}
                />
                <div className="card passage-list">
                    {allBlogs.map((post, i) => (
                        <PassageItem
                            key={i}
                            title={post.frontmatter.title}
                            slug={post.slug}
                            summary={post.markdownBody}
                            cover={post.frontmatter.cover}
                            date={post.frontmatter.date}
                        />
                    ))}
                </div>
            </Layout>
        )
    }
}
