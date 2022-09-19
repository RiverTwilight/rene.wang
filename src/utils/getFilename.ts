function getFilename(path: string) {
	return path
		.split("/")
		.pop() // doc-name.md
		.split(".")[0] // doc-name
		.trim();
}

export default getFilename;
