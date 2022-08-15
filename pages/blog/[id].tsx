//@ts-nocheck
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import CodeBlock from "../../components/CodeBlock";
import ImageBlock from "../../components/LazyloadImage";
import HeadingBlock from "../../components/HeadingBlock";
import PostItem from "../../components/PostItem";
import getAllPosts from "../../utils/getAllPosts";
import getPaths from "../../utils/getPaths";
import getPostId from "../../utils/getPostId";
// import BookOutline from "../../static/icon/book-outline.svg";
import { Typography, TimeBar } from "kindle-ui";
import { IPost } from "../../types";

/**
 * 获取相关文章，包含相同标签
 * @param {Array} allPosts
 * @param {Array} categories 当前文章的目录
 * @param {String} currentId
 */
const getRecommendPost = (
	allPosts: IPost[],
	categories: any[],
	currentId: string
) => {
	let data = [];
	allPosts.forEach((post) => {
		categories.forEach((cate) => {
			post.frontmatter.categories.includes(cate) &&
				!data.includes(post) &&
				currentId !== post.id &&
				data.push(post);
		});
	});
	return data.slice(0, 3);
};

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;

	const posts = getAllPosts(
		{
			id: getPostId,
		},
		require.context("../../posts", true, /\.md$/),
		true
	);
	const currentPost = posts.filter((post: any) => post.id === currentId)[0];
	// console.log(
	// 	posts.filter((post: any) => {
	// 		console.log(post.id, currentId);
	// 		return post.id === currentId;
	// 	})
	// );
	return {
		props: {
			recommendPost: getRecommendPost(
				posts,
				currentPost.frontmatter.categories || ["Unfiled"],
				currentId
			),
			currentPost,
			currentPage: {
				title: currentPost.frontmatter.title || currentPost.slug,
				path: "/blog/" + currentPost.id,
				description:
					currentPost.frontmatter.summary ||
					currentPost.markdownBody.slice(0, 100),
				currentPost,
			},
			id: currentId,
			locale,
		},
	};
}

export async function getStaticPaths({ locale }) {
	return {
		paths: getPaths(locale, getPostId, "posts/**/*.md"),
		fallback: false,
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

const Post = ({ id, recommendPost, currentPost, siteConfig, locale }) => {
	const { slug, frontmatter, markdownBody } = currentPost;
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

	// TODO 右上角菜单显示 AboutThisBook

	return (
		<>
			<TimeBar />
			<Typography itemScope itemType="http://schema.org/Article">
				<Cover>
					{frontmatter.cover && (
						<>
							<ImageBlock src={frontmatter.cover} />
							<meta
								itemProp="thumbnailUrl"
								content={frontmatter.cover}
							/>
						</>
					)}
				</Cover>

				<h1 itemProp="headline">{frontmatter.title || slug}</h1>
				<div className="Textc(secondary)">
					最后更新于
					<span itemProp="dateCreated">{frontmatter.date}</span>
					&nbsp;分类:
					{frontmatter.categories
						? frontmatter.categories.map(
								(cate) =>
									`${siteConfig.categories[cate][locale]} `
						  )
						: "未分类"}
				</div>
				<br />
				<article itemProp="articleBody">
					<ReactMarkdown
						renderers={{
							code: CodeBlock,
							heading: HeadingBlock,
							image: ImageBlock,
						}}
						escapeHtml={false}
						source={markdownBody}
					></ReactMarkdown>
				</article>
				{/* <ReadMore
				currentId={id}
				categories={frontmatter.categories}
				data={recommendPost}
			/> */}
			</Typography>
		</>
	);
};

export default Post;
