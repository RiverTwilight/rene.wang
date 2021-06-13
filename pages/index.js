import React from "react";
import PostItem from "../components/PostItem";
// import Marquee from "../components/Marquee";
import Tab from "../components/Tab";
import Link from "next/link";
import Text from "../utils/i18n";
import { postList } from "../data/i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";
import Image from "next/image";

export async function getStaticProps({ locale, locales }) {
	const sortedPosts = getAllPosts(
		{
			markdownBody: (content) =>
				`${content.substr(0, 200)}${
					content.length >= 200 ? "..." : ""
				}`,
			id: getPostId,
		},
		require.context("../posts", true, /\.md$/),
		true
	);

	const config = await import(`../data/config.json`);
	return {
		props: {
			allPosts: sortedPosts.slice(0, 10),
			currentPage:{
				title: "首页",
				path: "/"
			},
			postNumber: sortedPosts.length,
			siteConfig: config.default,
			locale,
		},
	};
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channel: "all",
			page: 1,
		};
	}
	render() {
		const { allPosts, siteConfig, locale, postNumber } = this.props;
		const { channel } = this.state;
		return (
			<>
				{/* <Marquee
					// 如果网站配置里没有海报，那么使用带有封面的文章
					imgList={
						siteConfig.poster ||
						allPosts
							.filter((blog) => blog.frontmatter.cover)
							.map((blog) => ({
								url: blog.frontmatter.cover,
								href: "/blog/" + blog.id,
							}))
					}
				/> */}
				<Image unsized alt="My favorite charactor" src="/static/image/bilibili.png" />
				<Tab
					lang={locale}
					tabs={siteConfig.categories}
					activeIndex={channel}
					onChange={(index) => {
						this.setState({
							channel: index,
						});
					}}
				/>
				<div className="card Bgc(white) passage-list">
					{allPosts
						.filter((post) => {
							return (
								[
									...Object.values(
										post.frontmatter.categories || []
									),
									"all",
								].includes(channel) && post.locale === locale
							);
						})
						/*.slice(0, page * this.postsPerPage)*/
						.map((post, i) => (
							<PostItem
								lang={locale}
								id={post.id}
								title={post.frontmatter.title || post.slug}
								summary={post.markdownBody}
								cover={post.frontmatter.cover}
								date={post.frontmatter.date}
							/>
						))}
					<Text dictionary={postList} language={locale}>
						<Link href="/all">
							<div className="Bgc(white) passage-more Cur(pointer) Dis(flex)">
								<Text allPosts={[postNumber]} />
							</div>
						</Link>
					</Text>
					{/*<div style={{
                        display: page === Math.ceil(allPosts.length / this.postsPerPage) ? 'none' : ''
                    }} onClick={() => {
                        this.setState({ page: page + 1 })
                    }} className="bg-white passage-more">
                        加载更多
                    </div>*/}
				</div>
			</>
		);
	}
}

export default HomePage;
