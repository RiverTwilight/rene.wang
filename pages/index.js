import React from "react";
import Link from "next/link";
import Text from "../utils/i18n";
import { postList } from "../data/i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";
import { Typography, Button, ListItem, Card } from "kindyle";

export async function getStaticProps({ locale, locales }) {
    const sortedPosts = getAllPosts(
        {
            markdownBody: (content) =>
                `${content.substr(0, 200)}${
                    content.length >= 200 ? "..." : ""
                }`,
            id: getPostId,
        },
        require.context("../posts", true, /\.md$/),
        true
    );

    return {
        props: {
            allPosts: sortedPosts.slice(0, 10),
            currentPage: {
                title: "首页",
                path: "/",
            },
            postNumber: sortedPosts.length,
            locale,
        },
    };
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            page: 1,
        };
    }
    render() {
        const { allPosts, siteConfig, locale, postNumber } = this.props;
        const { channel } = this.state;
        return (
            <>
                {/* <Tab
					lang={locale}
					tabs={siteConfig.categories}
					activeIndex={channel}
					onChange={(index) => {
						this.setState({
							channel: index,
						});
					}}
				/> */}
                <div className="passage-list">
                    {allPosts
                        .filter((post) => {
                            return (
                                [
                                    ...Object.values(
                                        post.frontmatter.categories || []
                                    ),
                                    "all",
                                ].includes(channel) && post.locale === locale
                            );
                        })
                        .map((post, i) => (
                            <Link href={"/blog/" + post.id}>
                                <ListItem
                                    primary={
                                        post.frontmatter.title || post.slug
                                    }
                                    second={post.frontmatter.date}
                                ></ListItem>
                            </Link>

                            // <PostItem
                            // 	lang={locale}
                            // 	id={post.id}
                            // 	title={post.frontmatter.title || post.slug}
                            // 	summary={post.markdownBody}
                            // 	cover={post.frontmatter.cover}
                            // 	date={post.frontmatter.date}
                            // />
                        ))}
                    <br />
                    <Text dictionary={postList} language={locale}>
                        <Link href="/all">
                            <Button className="center">
                                <Text allPosts={[postNumber]} />
                            </Button>
                        </Link>
                    </Text>
                </div>
            </>
        );
    }
}

export default HomePage;
