interface PostsData {
    
}

export type IPost = {
    slug: string,
    frontmatter: {
        date: string
    },
    markdownBody: string,
    siteConfig: config.default
}