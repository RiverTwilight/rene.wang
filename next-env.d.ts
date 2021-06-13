/// <reference types="next" />
/// <reference types="next/types/global" />


interface Window {
    scrollListener: any
}

interface ICurrentPage {
    title: string,
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
        date: string,
        /** 目录 */
        categories?: string[]
    },
    id: number,
    /** 文章 */
    markdownBody?: string
}

interface ISiteConfig {
    title: string,
    keywords: string[],
    description: string,
    root: string,
    author: {
        name: string,
        image?: string,
        intro: {
            title: string,
            content: string
        }[]
    }
}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }
