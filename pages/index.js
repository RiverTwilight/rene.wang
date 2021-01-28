import React from "react";
import PostItem from "../components/PostItem";
// import Marquee from "../components/Marquee";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import Link from "next/link";
import Text from "../utils/i18n";
import { postList } from "../data/i18n.json";
import getAllPosts from "../utils/getAllPosts";

export async function getStaticProps({ locale, locales }) {
	const sortedPosts = getAllPosts({
		markdownBody: (content) =>
			`${content.substr(0, 200)}${
				content.length >= 200 ? "..." : ""
			}`,
	});

	const config = await import(`../data/config.json`);
	return {
		props: {
			allPosts: sortedPosts.slice(0, 10),
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
		const { allPosts, siteConfig, locale } = this.props;
		const { channel } = this.state;
		return (
			<Layout
				currentPage={{
					text: "首页",
					path: "/",
				}}
				allPosts={allPosts}
				config={siteConfig}
				locale={locale}
			>
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
				<div className="card passage-list">
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
							<div className="bg-white passage-more">
								<Text allPosts />
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
			</Layout>
		);
	}
}

export default HomePage;
