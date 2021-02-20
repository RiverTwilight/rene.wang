import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
// import Gitalk from "gitalk";
import Layout from "../../components/Layout";
import CodeBlock from "../../components/CodeBlock";
import ImgaeBlock from "../../components/LazyloadImage";
// import ToTop from "../../components/ToTop";
import Card from "../../components/Card";
import HeadingBlock from "../../components/HeadingBlock";
import PostItem from "../../components/PostItem";
import getAllPosts from "../../utils/getAllPosts";
import getPaths from "../../utils/getPaths";
import getPostId from "../../utils/getPostId";
// import ChatsBubbles from "../../static/icon/chatbubble-outline.svg";
import BookOutline from "../../static/icon/book-outline.svg";
// import Wave from "../../static/wave.svg";
import "../../scss/typo.scss";

/**
 * 获取相关文章，包含相同标签
 * @param {Array} allPosts
 * @param {Array} categories 当前文章的目录
 * @param {String} currentId
 */
const getRecommendPost = (allPosts: IPost[], categories: any[], currentId) => {
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
	const config = await import(`../../data/config.json`);
	const currentPost = posts.filter((post: any) => post.id === currentId)[0];
	return {
		props: {
			recommendPost: getRecommendPost(
				posts,
				currentPost.frontmatter.categories || ["Unfiled"],
				currentId
			),
			currentPost,
			id: currentId,
			siteConfig: config.default,
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
	margin-top: -19px;
	margin-left: -19px;
	margin-right: -19px;
	img {
		object-fit: cover;
		width: 100%;
		max-height: 40vh;
		border-radius: 30px 30px 0px 0px;
	}
`;

const ReadMore = ({ data }: any) => {
	return (
		<Card className="Br(30px)" title="阅读更多" icon={<BookOutline />}>
			{data.map((item, i) => (
				<PostItem
					key={i}
					id={item.id}
					title={item.frontmatter.title || item.slug}
					summary={item.markdownBody.substr(0, 200)}
					cover={item.frontmatter.cover}
					date={item.frontmatter.date}
				/>
			))}
		</Card>
	);
};

/**
 * 文章详情
 * // FIXME 评论模块
 */

const Post = ({ id, recommendPost, currentPost, siteConfig, locale }) => {
	// siteConfig.gitalk &&
	// 	React.useEffect(() => {
	// 		const gitalk = new Gitalk(
	// 			Object.assign(siteConfig.gitalk, {
	// 				id: "/blog/" + id,
	// 				distractionFreeMode: false,
	// 			})
	// 		);
	// 		gitalk.render("gitalk-container");
	// 	});
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

	return (
		<Layout
			allPosts={[]}
			currentPage={{
				text: frontmatter.title || slug,
				path: "/blog/" + id,
			}}
			locale={locale}
			config={siteConfig}
			catalog={generateCatalog(markdownBody)}
		>
			{/* <link
				href="https://cdn.bootcdn.net/ajax/libs/gitalk/1.6.2/gitalk.min.css"
				rel="stylesheet"
			></link> */}
			{/* <link rel="stylesheet" href="//unpkg.com/heti/umd/heti.min.css"></link> */}
			{/* <Progress width={50} /> */}
			<article
				style={{
					marginBottom: "7px",
				}}
				className="P(20px) card Br(30px) Bgc(white)"
				itemScope
				itemType="http://schema.org/Article"
			>
				<Cover>
					{frontmatter.cover && (
						<>
							<ImgaeBlock src={frontmatter.cover} />
							<meta
								itemProp="thumbnailUrl"
								content={frontmatter.cover}
							></meta>
						</>
					)}
				</Cover>

				<h1 itemProp="headline" className="Texta(center)">
					{frontmatter.title || slug}
				</h1>
				<div className="typo">
					<div className="typo-meta Textc(secondary) Texta(center)">
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
					<div className="typo-detail">
						<div className="typo-detail-date"></div>
					</div>
					<div itemProp="articleBody">
						<ReactMarkdown
							renderers={{
								code: CodeBlock,
								heading: HeadingBlock,
								image: ImgaeBlock,
							}}
							escapeHtml={false}
							source={markdownBody}
						></ReactMarkdown>
					</div>
					{/* <div className="typo-split">
							<Wave />
						</div> */}
				</div>
			</article>
			{/* <Card title="评论" icon={<ChatsBubbles />}>
				<div id="gitalk-container"></div>
			</Card> */}
			<ReadMore
				currentId={id}
				categories={frontmatter.categories}
				data={recommendPost}
			/>
			{/* <ToTop /> */}
		</Layout>
	);
};

export default Post;
