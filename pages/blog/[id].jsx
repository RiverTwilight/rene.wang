import React from "react";
import matter from "gray-matter";
import glob from "glob";
import { v5 as uuidv5 } from "uuid";
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
// import ChatsBubbles from "../../static/icon/chatbubble-outline.svg";
import BookOutline from "../../static/icon/book-outline.svg";
import Wave from "../../static/wave.svg";
import "../../scss/typo.scss";

export async function getStaticProps({ locale, locales, ...ctx }) {
	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const data = keys.map((key, index) => {
			// Create slug from filename
			const slug = key
				.replace(/^.*[\\\/]/, "")
				.split(".")
				.slice(0, -1)
				.join(".");
			const value = values[index];
			// Parse yaml metadata & markdownbody in document
			const document = matter(value.default);
			return {
				defaultTitle: slug,
				frontmatter: document.data,
				slug: slug,
				markdownBody: document.content,
				id: uuidv5(slug, "1b671a64-40d5-491e-99b0-da01ff1f3341").substr(
					0,
					8
				),
			};
		});
		return data;
	})(require.context("../../posts", true, /\.md$/));

	const { id } = ctx.params;

	const config = await import(`../../data/config.json`);

	return {
		props: {
			allPosts: posts,
			id,
			siteConfig: config.default,
			locale,
		},
	};
}

export async function getStaticPaths({ locale }) {
	//get all .md files in the posts dir
	const blogs = glob.sync("posts/**/*.md", {
		stat: true,
	});

	//remove path and extension to leave filename only
	const blogSlugs = blogs.map((file) =>
		file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
	);
	// create paths with `slug` param
	// const paths = blogSlugs.map(slug => `/blog/${encodeURI(slug)}`)
	const paths = blogSlugs.map((slug) => {
		return {
			params: {
				id: `${uuidv5(
					slug,
					"1b671a64-40d5-491e-99b0-da01ff1f3341"
				).substr(0, 8)}`,
			},
			locale,
		};
	});

	return {
		paths,
		fallback: false,
	};
}

const Progress = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 4px;
	overflow: hidden;
	background-color: rgba(63, 81, 181, 0.2);
	border-radius: 2px;
`;

const Cover = styled.div`
	margin-top: -19px;
	margin-left: -19px;
	margin-right: -19px;
	img {
		object-fit: cover;
		width: 100%;
		max-height: 40vh;
	}
`;

const ReadMore = ({ allPosts, categories, currentId }) => {
	var data = [];
	allPosts.forEach((post) => {
		categories.forEach((cate) => {
			post.frontmatter.categories.includes(cate) &&
				!data.includes(post) &&
				currentId !== post.id &&
				data.push(post);
		});
	});
	return (
		<Card className="br-all" title="阅读更多" icon={<BookOutline />}>
			{data.slice(0, 3).map((item, i) => (
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

const Post = ({ id, allPosts, siteConfig, locale }) => {
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
	const currentFile = allPosts.filter((post) => post.id === id)[0];
	const { slug, frontmatter, markdownBody } = currentFile;
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
			allPosts={allPosts}
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
			<Progress width={50} />
			<article
				style={{
					marginBottom: "7px",
				}}
				className="p-a-2 card br-all  bg-white"
			>
				<Cover>
					{frontmatter.cover && (
						<ImgaeBlock src={frontmatter.cover} />
					)}
				</Cover>
				<h1 className="text-center">{frontmatter.title || slug}</h1>
				<div className="typo">
					<div className="typo-meta">
						最后更新于{frontmatter.date}
					</div>
					<div className="typo-detail">
						<div className="typo-detail-date"></div>
					</div>
					<ReactMarkdown
						renderers={{
							code: CodeBlock,
							heading: HeadingBlock,
							image: ImgaeBlock,
						}}
						escapeHtml={false}
						source={markdownBody}
					></ReactMarkdown>
					<div className="typo-split">
						<Wave />
					</div>
				</div>
			</article>
			{/* <Card title="评论" icon={<ChatsBubbles />}>
				<div id="gitalk-container"></div>
			</Card> */}
			<ReadMore
				currentId={id}
				categories={frontmatter.categories}
				allPosts={allPosts}
			/>
			{/* <ToTop /> */}
		</Layout>
	);
};

export default Post;
