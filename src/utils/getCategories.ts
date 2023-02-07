import { generateMap } from "./getAllPosts";

export interface ICategory {
	slug: string;
	config: {
		name?: string;
	};
}

// 仅支持二维目录

function getCategories(requireFunc, options): ICategory[] {
	const { locale } = options
	
	const categories = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);

		console.log(keys, values);

		const key_value_map = generateMap(keys, values);

		var res = [];

		Object.keys(key_value_map)
			.filter((key) => key.includes(locale))
			.forEach((key) => {
				let parentPath = key.split("/").slice(0, -1).pop();

				res.push({
					slug: key_value_map[key].slug || parentPath,
					config: key_value_map[key],
				});
			});

		return res;
	})(requireFunc);

	return categories;
}

export default getCategories;
