import matter from "gray-matter";

const generateTokens = (path: string): { value: string; type: string }[] => {
	var tokens = [];
	let current = 0;
	while (current < path.length) {
		let currentChar = path[current];

		if (currentChar === "/") {
			tokens.push({
				value: "/",
				type: "slash",
			});

			current++;

			continue;
		}

		let str = "";

		while (currentChar !== "/" && current < path.length) {
			str += currentChar;
			currentChar = path[++current];
		}

		tokens.push({
			value: str,
			type: "path",
		});
	}

	return tokens;
};

interface IFile {
	name: string;
	type: "config" | "doc" | "folder";
	value?: any;
	children?: IFile[];
}

const generateAllFiles = (files: string[]): IFile => {
	const fileTokens = files.map((file, i) => {
		let token = {
			tokens: generateTokens(file),
			path: file,
		};
		return token;
	});

	var fileTrees = {
		name: ".",
		type: "folder",
		children: [],
	};

	var currentPosition = fileTrees;

	fileTokens.forEach((file) => {
		file.tokens.forEach((token) => {
			if (token.type === "path" && token.value !== ".") {
				if (/\./.test(token.value)) {
					console.log("is a file", currentPosition.name);

					currentPosition.children.push({
						name: token.value,
						type: "doc",
						path: file.path,
					});

					currentPosition = fileTrees;
				} else {
					const isExist = currentPosition.children.some((child) => {
						return child.name === token.value;
					});

					if (!isExist) {
						currentPosition.children.push({
							name: token.value,
							type: "folder",
							children: [],
						});

						currentPosition =
							currentPosition.children[
								currentPosition.children.length - 1
							];

						console.log("is a folder", currentPosition.name);
					} else {
						currentPosition = currentPosition.children.find(
							(child) => {
								return child.name === token.value;
							}
						);
					}
				}
			}
		});
	});

	// console.log(fileTrees.children[0]);

	return fileTrees;
};

const generateMap = (keys, values) => {
	let map = {};
	keys.forEach((key, i) => {
		map[key] = values[i];
	});
	return map;
};

export default function getAllPosts(
	pocessRes: {
		/**文档内容处理函数 */
		markdownBody?: (content: string) => string;
		id?: (id: string) => string;
	} = {},
	/**Node的require函数，请以./src/utils为主目录计算相对路径，如'path' */
	requireFunc: any,
	sort: boolean = false,
	locale: string
) {
	//get posts & context from folder
	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const key_value_map = generateMap(keys, values);
		const localizedTree = generateAllFiles(keys).children.find((child) => {
			return child.name === "zh-CN";
		});

		const validlization = (files: any[], pocessRes) => {
			return files.map((item) => {
				console.log(item.path);

				if (/[\.config|\.js]$/.test(item.path)) {
				} else if (item.type === "doc") {
					const slug = item.path
						.split(".")
						.slice(0, -1)
						.join(".")
						.trim();
					const id = pocessRes.hasOwnProperty("id")
						? pocessRes.id(slug)
						: slug;

					const document = matter(key_value_map[item.path].default);

					const { data: frontmatter, content: markdownBody } =
						document;

					return {
						defaultTitle: slug,
						frontmatter,
						id,
						markdownBody,
						locale,
					};
				} else {
					return {
						...item,
						children: validlization(item.children, pocessRes),
					};
				}
			});
		};

		const validlizedTree = validlization(localizedTree.children, pocessRes);

		console.log(validlizedTree);

		return validlizedTree;
	})(requireFunc);

	const sortedPosts = sort
		? posts
				.sort((a, b) => {
					let dayA = a.frontmatter.date.split("/")[2],
						dayB = b.frontmatter.date.split("/")[2];
					return dayB - dayA;
				})
				.sort((a, b) => {
					let monthA = a.frontmatter.date.split("/")[1],
						monthB = b.frontmatter.date.split("/")[1];
					return monthB - monthA;
				})
				.sort((a, b) => {
					let yearA = a.frontmatter.date.split("/")[0],
						yearB = b.frontmatter.date.split("/")[0];
					return yearB - yearA;
				})
		: posts;

	return sortedPosts;
}
