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
                defaultTitle: slug,
                frontmatter: document.data,
                markdownBody: document.content,
                slug: encodeURI(slug),
            }
        })
        return data
    })(require.context('../posts', true, /\.md$/))
    const config = await import(`../data/config.json`)
    return {
        props: {
            allPosts: posts,
            siteConfig: config.default
        },
    }
}

export default class extends React.Component {
    postsPerPage = 5;
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            page: 1
        }
    }
    render() {
        const { allPosts, siteConfig } = this.props;
        const { channel, page } = this.state;
        return (
            <Layout config={siteConfig}>
                <Marquee
                    //如果网站配置里没有海报，那么使用带有封面的文章
                    imgList={siteConfig.poster || allPosts
                        .filter(blog => blog.frontmatter.cover)
                        .map(blog => ({
                            url: blog.frontmatter.cover,
                            href: '/blog/' + blog.slug
                        }))}
                />
                <Tab
                    tabs={Object.assign(siteConfig.categories, {
                        all: {
                            1: 'All Posts',
                            0: '全部'
                        }
                    })}
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
                        .slice(0, page * this.postsPerPage)
                        .map(post => (
                            <PassageItem
                                key={post.slug}
                                title={post.frontmatter.title || post.slug}
                                slug={post.slug}
                                summary={post.markdownBody}
                                cover={post.frontmatter.cover}
                                date={post.frontmatter.date}
                            />
                        ))}
                    <div style={{
                        display: page === Math.ceil(allPosts.length / this.postsPerPage) ? 'hidden' : ''
                    }} onClick={() => {
                        this.setState({ page: page + 1 })
                    }} className="bg-white passage-more">
                        加载更多
                    </div>
                </div>
            </Layout>
        )
    }
}
