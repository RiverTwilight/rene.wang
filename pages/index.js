import React from 'react'
import matter from 'gray-matter'
import PassageItem from '../components/PassageLine'
import Marquee from '../components/Marquee'
import Tab from '../components/Tab'
import Layout from '../layout/index'

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
                id: index,
                defaultTitle: slug,
                frontmatter: document.data,
                markdownBody: document.content,
                slug: slug,
            }
        })
        return data
    })(require.context('../posts', true, /\.md$/));

    const sortedPosts = posts
        .sort((a, b) => {
            let yearA = a.frontmatter.date.split('\/')[0]
                , yearB = b.frontmatter.date.split('\/')[0];
            return yearA - yearB
        })
        .sort((a, b) => {
            let dayA = a.frontmatter.date.split('\/')[2]
                , dayB = b.frontmatter.date.split('\/')[2];
            return dayB - dayA
        })
        .sort((a, b) => {
            let monthA = a.frontmatter.date.split('\/')[1]
                , monthB = b.frontmatter.date.split('\/')[1];
            return monthB - monthA
        });

    const config = await import(`../data/config.json`)
    return {
        props: {
            allPosts: sortedPosts,
            siteConfig: config.default
        },
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            page: 1,
            lang: props.siteConfig.defaultLanguage
        }
    }
    componentDidMount() {
        if (localStorage.lang) {
            this.setState({
                lang: localStorage.lang
            })
        }
    }
    render() {
        const { allPosts, siteConfig } = this.props;
        const { channel, lang } = this.state;
        return (
            <Layout lang={lang} currentPage={{
                text: "首页",
                path: "/"
            }} allPosts={allPosts} config={siteConfig}>
                <Marquee
                    // 如果网站配置里没有海报，那么使用带有封面的文章
                    imgList={siteConfig.poster || allPosts
                        .filter(blog => blog.frontmatter.cover)
                        .map(blog => ({
                            url: blog.frontmatter.cover,
                            href: '/blog/' + blog.id
                        }))}
                />
                <Tab
                    lang={lang}
                    tabs={Object.assign({
                        all: {
                            'en': 'All Posts',
                            'zh': '全部'
                        }
                    }, siteConfig.categories)}
                    activeIndex={channel}
                    onChange={index => {
                        this.setState({
                            channel: index
                        })
                    }}
                />
                <div className="card passage-list">
                    {allPosts
                        .filter(post => [...Object.values(post.frontmatter.categories || []), 'all'].includes(channel))
                        /*.slice(0, page * this.postsPerPage)*/
                        .map((post, i) => (
                            <PassageItem
                                key={post.slug}
                                title={post.frontmatter.title || post.slug}
                                id={post.id}
                                summary={post.markdownBody}
                                cover={post.frontmatter.cover}
                                date={post.frontmatter.date}
                            />
                        ))}
                    {/*<div style={{
                        display: page === Math.ceil(allPosts.length / this.postsPerPage) ? 'none' : ''
                    }} onClick={() => {
                        this.setState({ page: page + 1 })
                    }} className="bg-white passage-more">
                        加载更多
                    </div>*/}
                </div>
            </Layout>
        )
    }
}
