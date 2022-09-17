// export async function getServerSideProps() {
// 	const config = await import(`../config.json`);

// 	return {
// 		props: {
// 			siteConfig: config.default,
// 			currentPage: {
// 				title: "404",
// 				path: "/404",
// 			},
// 		},
// 	};
// }

export default function Custom404() {
	return <h1>404 - Page Not Found</h1>;
}
