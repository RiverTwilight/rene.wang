import React from 'react'
import matter from 'gray-matter'
import glob from 'glob'
import ReactMarkdown from 'react-markdown'
import Layout from '../../layout/index'
import '../../scss/typo.scss'

export default ({ frontmatter, markdownBody, siteConfig }) => {
    return (
        <Layout config={siteConfig}>
            <div className="typo">
                <div className="typo">
                    <div className="typo-title text-center">
                        {frontmatter.title}
                    </div>
                    <div className="typo-detail">
                        <div className="typo-detail-date">
                        </div>
                    </div>
                    <ReactMarkdown source={markdownBody}></ReactMarkdown>
                </div>
                <div className="typo-split">END</div>
            </div>
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
    const paths = blogSlugs.map(slug => `/blog/${slug}`)

    return {
        paths,
        fallback: false,
    }
}