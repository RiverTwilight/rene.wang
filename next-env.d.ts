/// <reference types="next" />
/// <reference types="next/types/global" />


interface Window {
    scrollListener: any
}

interface ICurrentPage {
    text: string,
    path: string
}

// 词典
type dictionary = {
    [dicIndex: string]: {
        [langIndex: number]: string
    }
};

type lang = 'zh' | 'en' | 'jp'

type IPost = {
    slug: string,
    defaultTitle: string,
    frontmatter: {
        date: string
    },
    id: number,
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
