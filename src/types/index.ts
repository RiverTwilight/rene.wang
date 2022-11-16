export type IPost = {
	slug: string;
	defaultTitle: string;
	frontmatter: {
		title?: string;
		date: string;
		/** 目录 */
		categories?: string[];
	};
	id: number;
	/** 文章 */
	markdownBody?: string;
};

interface Window {
	scrollListener: any;
}

export interface ICurrentPage {
	title: string;
	path: string;
	description?: string;
}

// 词典
export type TDictionary = {
	[dicIndex: string]: {
		[langIndex: number]: string;
	};
};

export type TLocale = "zh-CN" | "en-US";

export interface ISiteConfig {
	title: string;
	keywords: string[];
	description: string;
	root: string;
	relatedLinks: {
		title: string;
		url: string;
	}[];
	author: {
		name: string;
		image?: string;
		github?: string;
		twitter?: string;
		intro: {
			title: string;
			content: string;
		}[];
	};
}

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
