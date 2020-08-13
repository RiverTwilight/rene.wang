/// <reference types="next" />
/// <reference types="next/types/global" />


interface Window {
    scrollListener: any
}

type IPost = {
    slug: string,
    defaultTitle: string,
    frontmatter: {
        date: string
    },
    markdownBody: string
}

interface ISiteConfig {
    title: string,
    keywords: string[],
    author: {
        name: string,
        image?: string,
        intro: {
            title: string,
            content: string
        }[]
    }
}
