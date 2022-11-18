import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import siteConfig from "../site.config.js";
import { Container } from "@kindle-ui/core";
import "./App.css";

function MyApp({ Component, pageProps }) {
	const [colorTheme, setColorTheme] = useState("light");

	useEffect(() => {
		if (localStorage.getItem("colorTheme")) {
			setColorTheme(localStorage.getItem("colorTheme"));
		}
		window.setColorTheme = (state) => {
			setColorTheme(state);
		};
		console.log("Some global functions to nerds: Window.setColorTheme()");
	}, []);

	const {
		currentPage = {
			title: "404",
		},
		locale = "zh-CN",
		menuItems = [],
	} = pageProps;

	return (
		<Container dark={colorTheme === "dark"}>
			<Layout
				siteConfig={siteConfig}
				locale={locale}
				currentPage={currentPage}
				menuItems={menuItems}
			>
				<Component {...pageProps} siteConfig={siteConfig} />
			</Layout>
		</Container>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     console.log(appProps);

//     return { ...appProps };
// };

export default MyApp;
