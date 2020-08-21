import React from 'react'
import matter from 'gray-matter'
import glob from 'glob'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Gitalk from 'gitalk'
import Layout from '../../layout/index'
import CodeBlock from '../../components/CodeBlock'
import ImgaeBlock from '../../components/LazyloadImage'
import ToTop from '../../components/ToTop'
import Card from '../../components/Card'
import HeadingBlock from '../../components/HeadingBlock'
import List from '../../components/List'
import ChatsBubbles from '../../components/Icons/ChatsBubbles'
import BookOutline from '../../components/Icons/BookOutline'
import '../../scss/typo.scss'

const Progress = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    overflow: hidden;
    background-color: rgba(63,81,181,.2);
    border-radius: 2px;
`
const Cover = styled.div`
    margin-top: -19px;
    margin-left: -19px;
    margin-right: -19px;
    img{
        object-fit: cover;
        width: 100%;
        max-height: 40vh;
    }
`

const ReadMore = ({ allPosts }) => {
    const randomIndex = (min, max) => {
        let randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum);
    }
    // 随机选取三篇文章
    const data = [
        allPosts[randomIndex(0, (allPosts.length - 1) / 3)],
        allPosts[randomIndex((allPosts.length - 1) / 3, 2 * (allPosts.length - 1) / 3)],
        allPosts[randomIndex(2 * (allPosts.length - 1) / 3, (allPosts.length - 1))],
    ]
        .map(post => {
            return {
                title: post.frontmatter.title || post.slug,
                href: '/blog/' + post.id
            }
        })
    return (
        <Card title="阅读更多" icon={<BookOutline />}>
            <List
                items={data.map(item => (
                    <a href={item.href}>
                        {item.title}
                    </a>
                ))}
            />
        </Card>
    )
}

/**
 * 文章详情
 * @todo
 */

export default ({ index, allPosts, slug, frontmatter, markdownBody, siteConfig }) => {
    siteConfig.gitalk && React.useEffect(() => {
        const gitalk = new Gitalk(Object.assign(siteConfig.gitalk, {
            "id": "/blog/" + index,
            "distractionFreeMode": false
        }))
        gitalk.render('gitalk-container')
    })
    return (
        <Layout lang="zh" allPosts={allPosts} currentPage={{
            text: frontmatter.title || slug,
            path: '/blog/' + index
        }} config={siteConfig}>
            <link href="https://cdn.bootcdn.net/ajax/libs/gitalk/1.6.2/gitalk.min.css" rel="stylesheet"></link>
            <Progress width={50} />
            <article style={{
                marginBottom: '7px'
            }} className="p-a-2 card typo bg-white">
                <Cover>
                    {frontmatter.cover && <ImgaeBlock src={frontmatter.cover} />}
                </Cover>
                <h1 className="text-center">
                    {frontmatter.title || slug}
                </h1>
                <div className="typo-meta">
                    最后更新于{frontmatter.date}
                </div>
                <div className="typo-detail">
                    <div className="typo-detail-date">
                    </div>
                </div>
                <ReactMarkdown
                    renderers={{
                        code: CodeBlock,
                        heading: HeadingBlock,
                        image: ImgaeBlock
                    }}
                    escapeHtml={false}
                    source={markdownBody}>
                </ReactMarkdown>
                <div className="typo-split">END</div>
            </article>
            <Card title="评论" icon={<ChatsBubbles />}>
                <div id="gitalk-container"></div>
            </Card>
            <ReadMore allPosts={allPosts} />
            <ToTop />
        </Layout>
    )
}

export async function getStaticProps({ ...ctx }) {

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
                slug: slug,
                id: index
            }
        })
        return data
    })(require.context('../../posts', true, /\.md$/))

    const { id } = ctx.params;
    const currentFileName = posts[id].slug;
    const content = await import(`../../posts/${currentFileName}.md`)
    const data = matter(content.default)
    const config = await import(`../../data/config.json`);

    // const index = posts.map((post, i) => post.defaultTitle === slug).indexOf(true)

    return {
        props: {
            allPosts: posts,
            slug: currentFileName,
            index: id,
            frontmatter: data.data,
            markdownBody: data.content,
            siteConfig: config.default
        },
    }
}

export async function getStaticPaths() {
    //get all .md files in the posts dir
    const blogs = glob.sync('posts/**/*.md')

    //remove path and extension to leave filename only
    const blogSlugs = blogs.map(file =>
        file
            .split('/')[1]
            .replace(/ /g, '-')
            .slice(0, -3)
            .trim()
    )

    // create paths with `slug` param
    // const paths = blogSlugs.map(slug => `/blog/${encodeURI(slug)}`)
    const paths = blogSlugs.map((slug, i) => `/blog/${i}`)
    return {
        paths,
        fallback: false,
    }
}
