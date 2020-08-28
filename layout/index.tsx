import React from "react";
import Head from "next/head";
import Header from "./Header";
import Drawer from "./Drawer";
import "../scss/App.scss";

class Layout extends React.Component<
	{
		config: ISiteConfig;
		allPosts: IPost[];
		currentPage: ICurrentPage;
	},
	{
		lang: lang;
	}
> {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.config.defaultLanguage,
		};
	}
	componentDidMount() {
		if (localStorage.lang) {
			this.setState({
				lang: localStorage.lang,
			});
		}
	}
	render() {
		const { config, currentPage } = this.props;
		const { lang } = this.state;
		const { description, author, title } = config;
		const showTitle = `${
			currentPage ? `${currentPage.text} - ` : ""
		}${title}`;
		const childrenWithProps = React.Children.map(
			this.props.children,
			(child) => {
				// checking isValidElement is the safe way and avoids a typescript error too
				const props = { lang };
				if (React.isValidElement(child)) {
					return React.cloneElement(child, props);
				}
				return child;
			}
		);
		return (
			<>
				<Head>
					<meta name="description" content={description} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={showTitle} />
					<meta
						property="og:url"
						content="https://blog.yungeeker.com/index.html"
					/>
					<meta property="og:site_name" content={showTitle} />
					<meta property="og:description" content={description} />
					<meta property="og:locale" content="zh_CN" />
					<meta property="article:author" content={author.name} />
					<meta property="article:tag" content={author.name} />
					<meta property="article:tag" content="云极客" />
					<meta name="twitter:card" content="summary" />
					<title>{showTitle}</title>
				</Head>
				<div
					style={{ display: "inline-block" }}
					className="header-liner"
				></div>
				<Header lang={lang} {...this.props} />
				<main className="main">
					<div className="container">
						<div className="container-left">
							{childrenWithProps}
						</div>
						<div className="container-right">
							<Drawer lang={lang} config={config} />
						</div>
					</div>
				</main>
			</>
		);
	}
}

export default Layout;
