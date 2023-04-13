import React from "react";
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
	const showTitle = `${currentPage ? `${currentPage.title} - ` : ""}${title}`;
	const showDescription = currentPage.description || siteConfig.description;
	// const childrenWithProps = React.Children.map(props.children, (child) => {
	// 	// checking isValidElement is the safe way and avoids a typescript error too
	// 	const props = { locale };
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, props);
	// 	}
	// 	return child;
	// });
	return (
		<>
			<Head>
				<meta name="description" content={showDescription} />
				<meta name="keywords" content={siteConfig.keywords.join(",")} />
				<meta
					itemProp="description"
					name="description"
					content={showDescription}
				/>
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
			<div className="hidden-xs" style={{ height: "30px" }}></div>
			<div id="platform">
				<Container deviceFrame={KindleOasis}>
					<Header
						menuItems={menuItems}
						lang={locale}
						currentPage={currentPage}
						siteConfig={siteConfig}
					/>
					<main>
						<div style={{ minHeight: "50vh" }}>{children}</div>
						<br></br>
						<RelatedLink
							links={siteConfig.relatedLinks}
							locale={locale}
						/>
					</main>
				</Container>
			</div>
		</>
	);
};

export default Layout;
