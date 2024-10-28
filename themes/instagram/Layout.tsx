import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./components/Header";
import { ICurrentPage, ISiteConfig } from "@/types/index";
import { ColorSchemeProvider } from "@/contexts/colorScheme";
import styled from "styled-components";
import { GlobalStyles } from "./globalStyles";

const LayoutWrapper = styled.div<{ isDark: boolean }>`
	min-height: 100vh;
	position: relative;
	color: ${(props) => (props.isDark ? "#fff" : "#333")};
	transition: background-color 0.3s ease;

	&::before {
		content: "";
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: url("/image/background.jpeg") no-repeat center center;
		background-size: cover;
		z-index: -1;
	}
`;

const MainContainer = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 16px;

	@media (max-width: 768px) {
		padding: 16px 8px;
	}
`;

const MainContent = styled.main`
	margin-top: 64px; // Space for fixed header
`;

const HeaderWrapper = styled.header<{ isDark: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: #ecbbd0;
`;

const HeaderContainer = styled.div`
	max-width: 1160px;
	margin: 0 auto;
	padding: 8px 0;
	height: 64px;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding: 8px;
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

	useEffect(() => {
		const darkMediaQuery = window.matchMedia(
			"(prefers-color-scheme: dark)"
		);
		setColorScheme(darkMediaQuery.matches ? "dark" : "light");

		const handleChange = (e: MediaQueryListEvent) => {
			setColorScheme(e.matches ? "dark" : "light");
		};

		darkMediaQuery.addEventListener("change", handleChange);
		return () => darkMediaQuery.removeEventListener("change", handleChange);
	}, []);

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
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				/>
				<title>{appliedTitle}</title>
			</Head>
			<ColorSchemeProvider value={{ colorScheme, setColorScheme }}>
				<GlobalStyles isDark={colorScheme === "dark"} />
				<LayoutWrapper isDark={colorScheme === "dark"}>
					<HeaderWrapper isDark={colorScheme === "dark"}>
						<HeaderContainer>
							<Header
								menuItems={menuItems}
								lang={locale}
								currentPage={currentPage}
								siteConfig={siteConfig}
							/>
						</HeaderContainer>
					</HeaderWrapper>
					<MainContainer>
						<MainContent>{children}</MainContent>
					</MainContainer>
				</LayoutWrapper>
			</ColorSchemeProvider>
		</>
	);
};

export default Layout;
