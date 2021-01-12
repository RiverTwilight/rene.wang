 const posts = ((context) => {
                const keys = context.keys();
                const values = keys.map(context);
                const data = keys.splice(0, 15).map((key, index) => {
                        // Create slug from filename
                        const slug = key
                                .replace(/^.*[\\\/]/, "")
                                .split(".")
                                .slice(0, -1)
                                .join(".");
                        const value = values[index];
                        // Parse yaml metadata & markdownbody in document
                        const document = matter(value.default);
                        return {
                                id: uuidv5(slug, "1b671a64-40d5-491e-99b0-da01ff1f3341").substr(
                                        0,
                                        8
                                ),
                                defaultTitle: slug,
                                frontmatter: document.data,
                                markdownBody: `${document.content.substr(0, 200)}${
                                        document.content.length >= 200 ? "..." : ""
                                }`,
                                slug: slug,
                                locale: key.split("/")[1],
                        };
                });
                return data;
        })(require.context("../posts", true, /\.md$/));

