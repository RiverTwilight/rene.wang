interface PostsData {
    
}

export type IPost = {
    slug: string,
    defaultTitle: string,
    frontmatter: {
        date: string
    },
    markdownBody: string
}