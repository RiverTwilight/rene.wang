import React from 'react'
import matter from 'gray-matter'
import glob from 'glob'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '../../layout/index'
import CodeBlock from '../../components/CodeBlock'
import ImgaeBlock from '../../components/LazyloadImage'
import ToTop from '../../components/ToTop'
import HeadingBlock from '../../components/HeadingBlock'
import List from '../../components/List'
import BookIcon from '../../static/icon/book-outline'
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

const ReadMore = ({ allPosts, correctIndex }) => {

    // 选取当前文章附近的三篇文章
    const data = allPosts
        .slice(correctIndex - 3, correctIndex)
        .map(post => {
            return {
                title: post.frontmatter.title || post.slug,
                href: '/blog/' + encodeURI(post.slug)
            }
        })
    return (
        <div className="our-headmaster card">
            <div className="headmaster-title">
                <BookIcon />
                &nbsp;&nbsp;阅读更多
            </div>
            <div className="headmaster-content">
                <List
                    items={data.map(item => (
                        <a href={item.href}>
                            {item.title}
                        </a>
                    ))}
                />
            </div>
        </div>
    )
}

/**
 * 文章详情
 * @todo
 */

export default ({ index, allPosts, slug, frontmatter, markdownBody, siteConfig }) => {
    return (
        <Layout correctPage={frontmatter.title || slug} config={siteConfig}>
            <Progress width={50} />
            <article style={{
                marginBottom: '7px'
            }} className="p-a-2 typo bg-white">
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
            <ReadMore correctIndex={index} allPosts={allPosts} />
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
            }
        })
        return data
    })(require.context('../../posts', true, /\.md$/))

    const { slug } = ctx.params
    const content = await import(`../../posts/${slug}.md`)
    const data = matter(content.default)
    const config = await import(`../../data/config.json`);

    const index = posts.map((post, i) => post.defaultTitle === slug).indexOf(true)

    console.log(index)
    return {
        props: {
            allPosts: posts,
            index,
            slug,
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
    const paths = blogSlugs.map(slug => `/blog/${encodeURI(slug)}`)

    return {
        paths,
        fallback: false,
    }
}
