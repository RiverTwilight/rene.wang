import matter from "gray-matter";
import type { IPost } from "@/types/index";
import parseDate from "./parseDateStr";

// Do something like this: '/a/b/c' -> '["/", "a", "/", "b" , "/", "c"]'
const generateTokens = (
	path: string
): { value: string; type: "slash" | "path" }[] => {
	let tokens = [];
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
	type?: "config" | "doc" | "folder";
	value?: any;
	children?: IFile[];
	path?: string;
	root?: boolean;
}

const getFileTree = (files: string[]): IFile => {
	const fileTokens = files.map((file, i) => {
		let token = {
			tokens: generateTokens(file),
			path: file,
		};
		return token;
	});

	let fileTrees: IFile = {
		name: ".",
		type: "folder",
		root: true,
		children: [],
	};

	let currentPosition = fileTrees;

	fileTokens.forEach((file) => {
		file.tokens.forEach((token) => {
			if (token.type === "path" && token.value !== ".") {
				if (/\./.test(token.value)) {
					currentPosition.children.push({
						name: token.value,
						type: token.value.endsWith(".md") ? "doc" : "config",
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

						// console.log("is a folder", currentPosition.name);
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

	return fileTrees;
};

const generateMap = (
	keys: string[],
	values: string[]
): {
	[key: string]: string;
} => {
	let map = {};
	keys.forEach((key, i) => {
		map[key] = values[i];
	});
	return map;
};

const flatPost = (allPosts): IPost[] => {
	return allPosts
		.map((item) => {
			const classfiedPosts = item.children.map((post) =>
				Object.assign(
					{
						category: item.name,
					},
					post
				)
			);
			return classfiedPosts;
		})
		.flat();
};

export interface GetAllPostsOption {
	pocessRes?: {
		/**文档内容处理函数 */
		markdownBody?: (content: string) => string;
		id?: (id: string) => string;
	};
	enableSort?: boolean;
	enableFlat?: boolean;
	enableContent?: boolean;
	locale?: string;
}

export { flatPost };
export default function getAllPosts(
	/** Node的require函数，请以`./src/utils`为主目录计算相对路径，如'path' */
	requireFunc: NodeRequire["context"],
	options: GetAllPostsOption
) {
	const {
		locale,
		enableContent,
		enableFlat,
		enableSort,
		pocessRes = {
			markdownBody: (content) => content,
			id: (content) => content,
		},
	} = options;

	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const key_value_map = generateMap(keys, values);
		const localizedTree = getFileTree(keys).children.find((child) => {
			return locale ? child.name === locale : true;
		});

		console.log(locale, localizedTree);

		// console.log("./zh-CN/Tech/Macisfy-Your-Windows".split("/").pop());

		const validlization = (files: any[], pocessRes) => {
			return files
				.filter((item) => item.type !== "config")
				.map((item) => {
					if (item.type === "doc") {
						const slug = item.path
							.split("/")
							.pop() // doc-name.md
							.split(".")[0] // doc-name
							.trim();
						const id = pocessRes.hasOwnProperty("id")
							? pocessRes.id(slug)
							: slug;

						const document = matter(
							key_value_map[item.path].default
						);

						const { data: frontmatter, content: markdownBody } =
							document;
						
							frontmatter.date = parseDate(frontmatter.date).toLocaleDateString()

						return {
							defaultTitle: slug,
							frontmatter,
							id,
							markdownBody: !!enableContent
								? pocessRes.markdownBody(markdownBody)
								: "",
							locale: localizedTree.name,
						};
					} else if (item.type === "folder") {
						const configFile = item.children.find((file) => {
							return file.type === "config";
						});

						// console.log(
						// 	"is a folder",
						// 	item,
						// 	key_value_map[configFile.path]
						// );

						return {
							...item,
							config: configFile
								? key_value_map[configFile.path]
								: {},
							children: validlization(item.children, pocessRes),
						};
					}
				});
		};

		const validlizedTree = validlization(localizedTree.children, pocessRes);

		// console.log("server", validlizedTree);

		return validlizedTree;
	})(requireFunc);

	if (enableFlat) {
		if (enableSort) {
			return flatPost(posts).sort((a, b) => {
				console.log(a)
				const dateA = new Date(a.frontmatter.date);
				const dateB = new Date(b.frontmatter.date);

				return dateB - dateA;
			});
		}
		return flatPost(posts);
	}

	return posts;
}

export { generateMap, getFileTree as generateAllFiles };
