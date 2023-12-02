import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import CodeBlock from "@/components/CodeBlock";
import ImageBlock from "@/components/ImageBlock";
import HeadingBlock from "@/components/HeadingBlock";
import FrameBlock from "@/components/FrameBlock";
import getPaths from "@/utils/getPaths";
import getFilename from "@/utils/getFilename";
import { Typography, TimeBar } from "@kindle-ui/core";
import { paths } from "../../site.config";
import matter from "gray-matter";
import parseDate from "@/utils/parseDateStr";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { GetStaticProps, GetStaticPaths } from "next";

interface IPostProps {
	title: string;
	date: string;
	author: string;
	cover?: string;
}

interface ICurrentPage {
	title: string;
	path: string;
	description: string;
}

interface IPost {
	id: string;
	frontmatter: IPostProps;
	markdownBody: string;
	slug: string;
}

interface IProps {
	recommendPost: IPost[];
	postContent: string;
	postProps: IPostProps;
	currentPage: ICurrentPage;
	id: string;
	locale: string;
}

function formatDate(dateString) {
	const date = new Date(dateString);

	const year = date.getFullYear().toString().substr(-4); // Extract the last two digits of the year
	const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add 1 to month (0-indexed) and pad with 0 if needed
	const day = ("0" + date.getDate()).slice(-2); // Pad with 0 if needed

	return new Date(Number(year), Number(month), Number(day));
}

/**
 * 获取相关文章，包含相同标签
 * @param {Array} allPosts
 * @param {Array} categories 当前文章的目录
 * @param {String} currentId
 */
// const getRecommendPost = (
// 	allPosts: IPost[],
// 	categories: any[],
// 	currentId: string
// ) => {
// 	let data = [];
// 	allPosts.forEach((post) => {
// 		categories.forEach((cate) => {
// 			post.frontmatter.categories.includes(cate) &&
// 				!data.includes(post) &&
// 				currentId !== post.id &&
// 				data.push(post);
// 		});
// 	});
// 	return data.slice(0, 3);
// };

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;

	const currentPost = matter(
		((context) => {
			const keys = context
				.keys()
				.find(
					(path) =>
						path.includes(locale) && getFilename(path) === currentId
				);
			return context(keys).default;
		})(require.context("../../../posts", true, /\.md$/))
	);

	// console.log(
	// 	posts.filter((post: any) => {
	// 		console.log(post.id, currentId);
	// 		return post.id === currentId;
	// 	})
	// );
	return {
		props: {
			// recommendPost: getRecommendPost(
			// 	posts,
			// 	currentPost.frontmatter.categories || ["Unfiled"],
			// 	currentId
			// ),
			// https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
			postContent: JSON.parse(JSON.stringify(currentPost.content)),
			postProps: JSON.parse(JSON.stringify(currentPost.data)),
			currentPage: {
				title: currentPost.data.title || currentPost.data.slug,
				path: "/" + paths.blog + currentId,
				description:
					currentPost.data.summary ||
					currentPost.content.slice(0, 100),
			},
			id: currentId,
			locale,
		},
	};
}

export async function getStaticPaths(props: GetStaticPaths) {
	return {
		paths: ["zh-CN", "en-US"]
			.map((locale: string) => {
				return getPaths(locale);
			})
			.flat(),
		fallback: true,
	};
}

const Cover = styled.div`
	img {
		object-fit: cover;
		width: 100%;
		max-height: 40vh;
		border-radius: 30px 30px 0px 0px;
	}
`;

const StyledArticlePage = styled.div`
	padding: 0;
	overflow: hidden;

	@media (min-width: 1024px) {
		padding: 0 12px;
	}

	& section[itemProp="articleBody"] {
		font-family: "Bookerly", "Noto Serif SC";
	}
`;

// const ReadMore = ({ data }: any) => {
// 	return (
// 		<Card className="Br(30px)" title="阅读更多" icon={<BookOutline />}>
// 			{data.map((item, i) => (
// 				<PostItem
// 					key={i}
// 					id={item.id}
// 					title={item.frontmatter.title || item.slug}
// 					summary={item.markdownBody.substr(0, 200)}
// 					cover={item.frontmatter.cover}
// 					date={item.frontmatter.date}
// 				/>
// 			))}
// 		</Card>
// 	);
// };

const generateCatalog = (post) => {
	var matchTitle = post.match(/\#+\s(.+)/g) || [];
	return [
		{
			title: frontmatter.title || slug,
			level: 0,
		},
		...matchTitle.map((tit) => {
			return {
				title: tit.substr(tit.lastIndexOf("#") + 1).trim(),
				level: tit.lastIndexOf("#"),
			};
		}),
	];
};

const Post = ({ id, postProps, postContent, siteConfig, locale }) => {
	if (!postProps) return null;

	return (
		<StyledArticlePage>
			<Typography itemScope itemType="http://schema.org/Article">
				<meta itemProp="mainEntityOfPage" content={id} />
				<Cover>
					{typeof postProps.cover == "string" && (
						<>
							<ImageBlock alt="Cover" src={postProps.cover} />
							<meta
								itemProp="thumbnailUrl"
								content={postProps.cover}
							/>
						</>
					)}
				</Cover>

				<h1 itemProp="headline">{postProps.title}</h1>
				<div className="Textc(secondary)">
					最后更新于
					<time itemProp="datePublished" dateTime={postProps.date}>
						{postProps.date.includes("T")
							? formatDate(postProps.date).toLocaleDateString()
							: parseDate(postProps.date).toLocaleDateString()}
					</time>
				</div>
				<meta itemProp="author" content={postProps.author} />
				<meta itemProp="publisher" content={siteConfig.author} />
				<meta itemProp="inLanguage" content={locale} />
				<br />
				<section itemProp="articleBody">
					<ReactMarkdown
						escapeHtml={false}
						remarkPlugins={[remarkMath]}
						rehypePlugins={[rehypeKatex]}
						components={{
							code: CodeBlock,
							heading: HeadingBlock,
							img: ImageBlock,
							iframe: FrameBlock,
						}}
						children={postContent}
					></ReactMarkdown>
				</section>
			</Typography>
		</StyledArticlePage>
	);
};

export default Post;
