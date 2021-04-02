import React from "react";
import getPaths from "../../utils/getPaths";
import getAllPosts from "../../utils/getAllPosts";
import Layout from "../../components/Layout";
import ReactMarkdown from "react-markdown";
import "../../scss/typo.scss";
import "./people.scss";

export async function getStaticPaths({ locale }) {
	return {
		paths: getPaths(locale, (id) => id, "peoples/**/*.md"),
		fallback: false,
	};
}

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;
	const posts = getAllPosts(
		{},
		//@ts-expect-error
		require.context("../../peoples", true, /\.md$/)
	);
	const config = await import(`../../data/config.json`);
	const currentPost = posts.filter((post: any) => post.id === currentId)[0];
	return {
		props: {
			currentPost,
			id: currentId,
			siteConfig: config.default,
			locale,
		},
	};
}

export default function People({ currentPost, id, locale, siteConfig }) {
	const {
		frontmatter: { nickname, title, cover },
	} = currentPost;
	const [isVisible, setVisible] = React.useState(false);
	const domRef = React.useRef();
	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => setVisible(entry.isIntersecting));
		});
		observer.observe(domRef.current);
		return () => observer.unobserve(domRef.current);
	}, []);
	return (
		<Layout
			allPosts={[]}
			currentPage={{
				text: title || id,
				path: "/blog/" + id,
			}}
			locale={locale}
			config={siteConfig}
		>
			<div className="P() card Br(30px) warpper">
				<div className="content">
					<section id="header">
						<img src={cover}></img>
						<div className="title">
							<p>A STORYBOOK WITH</p>
							<h1>{nickname}</h1>
						</div>
					</section>
					<section
						className={`fade-in-section ${
							isVisible ? "is-visible" : ""
						}`}
						ref={domRef}
						id="post"
					>
						<ReactMarkdown
							source={currentPost.markdownBody}
							escapeHtml={false}
						></ReactMarkdown>
					</section>
				</div>
				<audio
					autoPlay
					src="http://music.163.com/song/media/outer/url?id=1409136605.mp3"
				></audio>
			</div>
		</Layout>
	);
}
