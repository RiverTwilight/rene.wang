interface ICategories {
	name: string;
}

// 仅支持二维目录

function getCategories(requireFunc): ICategories[] {
	const categories = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		console.log(keys, values);

		return values;
	})(requireFunc);

	return categories;
}

export default getCategories;
