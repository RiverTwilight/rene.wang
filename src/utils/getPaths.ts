import getAllPosts from "@/utils/getAllPosts";

export default (locale) => {

	const allPosts = getAllPosts(
		require.context("../../posts", true, /^(\.)(.+)[\.md|(\.js)]$/),
		{
			enableFlat: true,
			locale
		}
	);

	const paths = allPosts.map((post) => {
		return {
			params: {
				id: post.id,
			},
			locale: post.locale,
		};
	});

	// console.log(paths);

	return paths;
};
