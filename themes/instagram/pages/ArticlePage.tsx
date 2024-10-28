import React  from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import CodeBlock from "../components/CodeBlock";
import ImageBlock from "../components/ImageBlock";
import HeadingBlock from "../components/HeadingBlock";
import FrameBlock from "../components/FrameBlock";
import { paths, giscus as giscusConfig } from "../../../src/site.config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import Giscus from "@giscus/react";
import { useColorScheme } from "src/contexts/colorScheme";

function formatDate(dateString: string, locale: string): string {
	const date = new Date(dateString);

	if (locale === "zh-CN") {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year} 年 ${month} 月 ${day} 日`;
	} else {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "short",
			day: "numeric",
		};
		return date.toLocaleDateString("en-US", options);
	}
}

const Cover = styled.div`
	img {
		object-fit: cover;
		width: 100%;
		max-height: 40vh;
		border-radius: 0 0 24px 24px;
	}
	margin: 0;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40%;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
		border-radius: 0 0 24px 24px;
		pointer-events: none;
	}
`;

const CommentContainer = styled.div`
	padding: 16px 24px;
	margin-top: 32px;
	background-color: ${({ theme }) => {
		const { colorScheme } = useColorScheme();
		return colorScheme === "dark" ? "#2D2D2D" : "#F3F3F3";
	}};
	border-radius: 16px;

	@media (min-width: 1024px) {
		margin: 32px auto;
		max-width: 800px;
	}
`;

const StyledArticlePage = styled.div`
	padding: 0;
	overflow: hidden;
	background-color: ${({ theme }) => {
		const { colorScheme } = useColorScheme();
		return colorScheme === "dark" ? "#2D2D2D" : "#F3F3F3";
	}};
	@media (min-width: 1024px) {
		max-width: 800px;
		margin: 24px auto;
		border-radius: 28px;
		padding: 24px;
		border: 2px solid black;
		box-shadow: ${({ theme }) =>
			theme.colorScheme === "dark"
				? "0px 2px 6px rgba(0, 0, 0, 0.3)"
				: "0px 2px 6px rgba(0, 0, 0, 0.1)"};
	}

	& section[itemProp="articleBody"] {
		font-family: "Bookerly", "Noto Serif SC";
		padding: 16px 24px;

		h1 {
			font-size: 2.5rem;
			line-height: 1.2;
			margin: 24px 0 16px;
			color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#E6E6E6" : "#1A1A1A";
			}};
		}

		h2 {
			font-size: 2rem;
			margin: 32px 0 16px;
			color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#E6E6E6" : "#1A1A1A";
			}};
		}

		p {
			font-size: 1.125rem;
			line-height: 1.7;
			margin: 16px 0;
			color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#BDBDBD" : "#424242";
			}};
		}

		a {
			color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#90CAF9" : "#1976D2";
			}};
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}

		code {
			background-color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#333333" : "#F5F5F5";
			}};
			padding: 2px 6px;
			border-radius: 4px;
			font-family: "Roboto Mono", monospace;
		}

		blockquote {
			margin: 16px 0;
			padding: 8px 24px;
			border-left: 4px solid
				${({ theme }) => {
					const { colorScheme } = useColorScheme();
					return colorScheme === "dark" ? "#424242" : "#E0E0E0";
				}};
			background-color: ${({ theme }) => {
				const { colorScheme } = useColorScheme();
				return colorScheme === "dark" ? "#2D2D2D" : "#F5F5F5";
			}};
			border-radius: 4px;
		}
	}
`;

const ArticleHeader = styled.div`
	padding: 16px 24px;

	h1 {
		font-size: 2rem;
		line-height: 1.2;
		margin: 16px 0 8px;
		color: ${({ theme }) => {
			const { colorScheme } = useColorScheme();
			return colorScheme === "dark" ? "#E6E6E6" : "#1A1A1A";
		}};
	}

	time {
		font-size: 0.875rem;
		color: ${({ theme }) => {
			const { colorScheme } = useColorScheme();
			return colorScheme === "dark" ? "#BDBDBD" : "#757575";
		}};
	}
`;

const ArticlePage = ({ id, postProps, postContent, siteConfig, locale }) => {
	if (!postProps) return null;

	const { colorScheme } = useColorScheme();

	return (
		<div>
			<StyledArticlePage>
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
				<div itemScope itemType="http://schema.org/Article">
					<meta itemProp="mainEntityOfPage" content={id} />

					<ArticleHeader>
						<h1 itemProp="headline">{postProps.title}</h1>
						<time
							itemProp="datePublished"
							dateTime={postProps.date}
						>
							{formatDate(postProps.date, locale)}
						</time>
					</ArticleHeader>

					<meta itemProp="author" content={postProps.author} />
					<meta itemProp="publisher" content={siteConfig.author} />
					<meta itemProp="inLanguage" content={locale} />
					<br />
					<section itemProp="articleBody">
						<ReactMarkdown
							remarkPlugins={[remarkMath, remarkGfm]}
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
				</div>
			</StyledArticlePage>
			{giscusConfig.enabled && (
				<CommentContainer>
					<Giscus
						repo={giscusConfig.config.repo}
						repoId={giscusConfig.config.repoId}
						category={giscusConfig.config.category}
						categoryId={giscusConfig.config.categoryId}
						mapping="pathname"
						strict="0"
						reactions-enabled="1"
						emit-metadata="0"
						input-position="bottom"
						theme={
							colorScheme === "dark"
								? "noborder_dark"
								: "noborder_light"
						}
						lang={giscusConfig.config.lang}
						loading="lazy"
					></Giscus>
				</CommentContainer>
			)}
		</div>
	);
};

export default ArticlePage;
