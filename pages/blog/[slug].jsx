import React from 'react'
import matter from 'gray-matter'
import glob from 'glob'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../components/CodeBlock'
import ImgaeBlock from '../../components/LazyloadImage'
import ToTop from '../../components/ToTop'
import HeadingBlock from '../../components/HeadingBlock'
import Layout from '../../layout/index'
import '../../scss/typo.scss'

/**
 * 文章详情
 * @todo
 */

export default ({ slug, frontmatter, markdownBody, siteConfig }) => {
    return (
        <Layout config={siteConfig}>
            <article style={{
                marginBottom: '7px'
            }} className="p-a-1 typo bg-white">
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
            <ToTop />
        </Layout>
    )
}

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params
    const content = await import(`../../posts/${slug}.md`)
    const data = matter(content.default)
    const config = await import(`../../data/config.json`)

    return {
        props: {
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
