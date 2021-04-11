import Document, { Html, Head, Main, NextScript } from "next/document";

export default class extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				// useful for wrapping the whole react tree
				enhanceApp: (App) => App,
				// useful for wrapping in a per-page basis
				enhanceComponent: (Component) => Component,
			});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);
		const config = await import(`../data/config.json`);

		return {
			...initialProps,
			config: config.default,
		};
	}
	render() {
		// const { title, description, author } = this.props.config;
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<link rel="icon" href="/public/static/image/favicon.ico" />
					<meta name="theme-color" content="#000000" />
					<link
						rel="apple-touch-icon"
						href="%PUBLIC_URL%/logo192.png"
					/>
					<meta name="renderer" content="webkit" />
					<meta name="force-rendering" content="webkit" />
					<meta
						httpEquiv="X-UA-Compatible"
						content="IE=edge,chrome=1"
					/>
					<script
						defer
						src="//hm.baidu.com/hm.js?29ab8ced8f951b925920356991531a45"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
