import React, { useMemo } from "react";
import Link from "next/link";
import { Typography } from "@kindle-ui/core";
import { sortByDate } from "@/utils/sortPosts";
import type { AllPostsProps } from "@/pages/all";

const groupByYear = (posts) => {
	return posts.reduce((acc, post) => {
		const year = new Date(post.frontmatter.date).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(post);
		return acc;
	}, {});
};

const AllPost: React.FC<AllPostsProps> = ({
	allPosts,
	flattedPosts,
	locale,
}) => {
	const sortedPosts = useMemo(() => sortByDate(flattedPosts), [allPosts]);
	const postsByYear = useMemo(() => groupByYear(sortedPosts), [sortedPosts]);
	const sortedYears = useMemo(
		() => Object.keys(postsByYear).sort((a, b) => b - a),
		[postsByYear]
	);

	return (
		<>
		  <Typography>
			<h1>全部文章</h1>
			{sortedYears.map((year) => (
			  <div key={year}>
				<h2>{year}</h2>
				<ul>
				  {postsByYear[year].map((post) => (
					<li key={post.id}>
					  <Link
						href={"/p/" + post.id}
						locale={locale}
						legacyBehavior
					  >
						{post.frontmatter.title || post.slug}
					  </Link>
					</li>
				  ))}
				</ul>
			  </div>
			))}
		  </Typography>
		</>
	  );
};

export default AllPost;
