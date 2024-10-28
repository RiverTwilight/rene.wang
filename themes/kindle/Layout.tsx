import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Container, KindleOasis } from "@kindle-ui/core";
import Header from "./components/Header";
import RelatedLink from "./components/RelatedLinks";
import { ICurrentPage, ISiteConfig } from "@/types/index";
import { ColorSchemeProvider } from "@/contexts/colorScheme";
import "kindle-fonts/bookerly.css";
import "kindle-fonts/amazon-ember.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@900&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");

  * a {
	color: inherit;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
      Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, Arial;
      
    @media (min-width: 767px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(210, 210, 210);

      @media (prefers-color-scheme: dark) {
        background-color: rgb(30, 30, 30);
      }
    }
  }

  code {
    font-family: Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace;
  }

  article {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

const PlatformSection = styled.section`
	@media (min-width: 767px) {
		display: flex;
		justify-content: center;
	}
`;

const MainContent = styled.main`
	background-color: var(--bg-color);
	min-height: 80vh;

	@media (min-width: 767px) {
		width: 100%;
		padding-bottom: 30px;
	}
`;

const Layout = (props: {
	/**网站配置 */
	siteConfig: ISiteConfig;
	/**全部文章 */
	allPosts: ISiteConfig[];
	/** 当前页面 */
	currentPage: ICurrentPage;
	locale?: string;
	children: JSX.Element | JSX.Element[];
	menuItems: any[];
}) => {
	const { currentPage, siteConfig, locale, children, menuItems } = props;
	const { author, title } = siteConfig;

	const appliedTitle = `${currentPage ? `${currentPage.title} - ` : ""}${
		title[locale]
	}`;
	const appliedDescription =
		currentPage.description || siteConfig.description[locale];

	const [colorScheme, setColorScheme] = useState("light");
	const containerEle = useRef(null);

	useEffect(() => {
		// Check if there's a saved preference in localStorage
		const localStoragePreference = localStorage.getItem(
			"COLOR_SCHEME_PREFERENCE"
		);

		// if (localStoragePreference) {
		if (false) {
			setColorScheme(localStoragePreference);
		} else {
			// Query the media preference if no preference is saved in localStorage
			const darkMediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);

			setColorScheme(darkMediaQuery.matches ? "dark" : "light");
		}
	}, []);

	useEffect(() => {
		const container = document.querySelector(".content");

		if (container) {
			container.scrollTop = 0;
		}
	}, [currentPage]);

	return (
		<>
			<Head>
				<link
					rel="alternate"
					href="https://www.rene.wang/zh-CN"
					hrefLang="zh-CN"
				></link>
				<link
					rel="alternate"
					href="https://www.rene.wang/en-US"
					hrefLang="en"
				></link>

				<meta name="description" content={appliedDescription} />
				<meta name="keywords" content={siteConfig.keywords.join(",")} />
				<meta name="description" content={appliedDescription} />
				<meta name="author" content={author.name} />

				<meta itemProp="name" content={appliedTitle} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={appliedTitle} />
				<meta property="og:url" content={siteConfig.root} />
				<meta property="og:site_name" content={appliedTitle} />
				<meta property="og:description" content={appliedDescription} />
				<meta property="og:locale" content="zh_CN" />
				{!!currentPage.image && (
					<meta property="og:image" content={currentPage.image} />
				)}
				<meta property="article:author" content={author.name} />
				<meta property="article:tag" content={author.name} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@rea1DonandTrump" />
				<meta
					name="google-site-verification"
					content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
				/>
				<meta name="viewport" content="viewport-fit=cover" />
				<meta
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
					name="viewport"
				/>
				<title>{appliedTitle}</title>
			</Head>
			<GlobalStyle />
			<ColorSchemeProvider value={{ colorScheme, setColorScheme }}>
				<PlatformSection id="platform">
					<Container
						dark={colorScheme === "dark"}
						deviceFrame={KindleOasis}
					>
						<div ref={containerEle}>
							<Header
								menuItems={menuItems}
								lang={locale}
								currentPage={currentPage}
								siteConfig={siteConfig}
								containerEle={containerEle}
							/>
							<MainContent>
								<div>{children}</div>
								<br></br>
								<RelatedLink
									links={siteConfig.relatedLinks}
									locale={locale}
								/>
							</MainContent>
						</div>
					</Container>
				</PlatformSection>
			</ColorSchemeProvider>
		</>
	);
};

export default Layout;
