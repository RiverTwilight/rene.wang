import React, { useMemo } from "react";
import Link from "next/link";
import { Typography } from "@kindle-ui/core";
import { sortByDate } from "@/utils/sortPosts";
import type { AllPostsProps } from "@/pages/all";

const AllPost: React.FC<AllPostsProps> = ({
	allPosts,
	flattedPosts,
	locale,
}) => {
	const sortedPosts = useMemo(() => sortByDate(flattedPosts), [allPosts]);

	return (
		<>
			<Typography>
				<h1>全部文章</h1>
				<ul>
					{sortedPosts.length &&
						sortedPosts.map((post) => {
							return (
								<li>
									<Link
										href={"/p/" + post.id}
										locale={locale}
										key={post.id}
										legacyBehavior
									>
										{post.frontmatter.title || post.slug}
									</Link>
								</li>
							);
						})}
				</ul>
			</Typography>
		</>
	);
};

export default AllPost;
