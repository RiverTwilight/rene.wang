import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Container, KindleOasis } from "@kindle-ui/core";
import RelatedLink from "../RelatedLink";
import { ICurrentPage, ISiteConfig } from "../../types";

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
	const showTitle = `${currentPage ? `${currentPage.title} - ` : ""}${
		title[locale]
	}`;
	const showDescription = currentPage.description || siteConfig.description;
	// const childrenWithProps = React.Children.map(props.children, (child) => {
	// 	// checking isValidElement is the safe way and avoids a typescript error too
	// 	const props = { locale };
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, props);
	// 	}
	// 	return child;
	// });

	const [dark, setDark] = useState(false);
	const containerEle = useRef(null);

	useEffect(() => {
		// Check if there's a saved preference in localStorage
		const localStoragePreference = localStorage.getItem(
			"COLOR_SCHEME_PREFERENCE"
		);

		if (localStoragePreference) {
			setDark(localStoragePreference === "dark");
		} else {
			// Query the media preference if no preference is saved in localStorage
			const darkMediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);
			setDark(darkMediaQuery.matches);
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
					hrefLang="en-US"
				></link>

				<meta name="description" content={showDescription} />
				<meta name="keywords" content={siteConfig.keywords.join(",")} />
				<meta name="description" content={showDescription} />
				<meta name="author" content={author.name} />

				<meta itemProp="name" content={showTitle} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={showTitle} />
				<meta property="og:url" content={siteConfig.root} />
				<meta property="og:site_name" content={showTitle} />
				<meta property="og:description" content={showDescription} />
				<meta property="og:locale" content="zh_CN" />
				<meta property="article:author" content={author.name} />
				<meta property="article:tag" content={author.name} />
				<meta property="article:tag" content="云极客" />
				<meta name="twitter:card" content={showDescription} />
				<meta
					name="google-site-verification"
					content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
				/>
				<meta name="viewport" content="viewport-fit=cover" />
				<meta
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
					name="viewport"
				/>
				<title>{showTitle}</title>
			</Head>
			<section id="platform">
				<Container dark={dark} deviceFrame={KindleOasis}>
					<div ref={containerEle}>
						<Header
							menuItems={menuItems}
							lang={locale}
							currentPage={currentPage}
							siteConfig={siteConfig}
							containerEle={containerEle}
						/>
						<main>
							<div>{children}</div>
							<br></br>
							<RelatedLink
								links={siteConfig.relatedLinks}
								locale={locale}
							/>
						</main>
					</div>
				</Container>
			</section>
			{/* <section id="gallery">
				<Gallery photos={galleryData[locale]} />
			</section> */}
		</>
	);
};

export default Layout;
