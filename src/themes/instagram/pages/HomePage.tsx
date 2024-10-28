import React, { useMemo, useState } from "react";
import Link from "next/link";
import Text from "@/utils/i18n";
import { postList, homePage } from "../i18n.json";
import type { IPost } from "@/types/index";
import {
	StyledGrid,
	StyledCard,
	CardTitle,
	CardDate,
	Section,
	SectionTitle,
	TabContainer,
	TabButton,
	CenteredButton,
	ButtonWrapper,
} from "../components/styled";

const MAX_POST_COUNT = 15;

function PostList({
	allPosts,
	falttedPosts,
	activeCategory,
}: {
	activeCategory: string;
	allPosts: any;
	falttedPosts: IPost[];
}) {
	const classfiedPosts =
		activeCategory !== "All"
			? falttedPosts.filter((post) => post.category === activeCategory)
			: falttedPosts;

	return (
		<StyledGrid>
			{classfiedPosts.slice(0, MAX_POST_COUNT).map((post) => (
				<Link
					key={post.id}
					href={"/p/" + post.id}
					style={{ textDecoration: "none" }}
					legacyBehavior
				>
					<StyledCard>
						<CardTitle>
							{post.frontmatter
								? post.frontmatter.title
								: post.slug}
						</CardTitle>
						<CardDate>
							{post.frontmatter
								? post.frontmatter.date
								: "1970/01/01"}
						</CardDate>
					</StyledCard>
				</Link>
			))}
		</StyledGrid>
	);
}

const Home = (props: any) => {
	const { allPosts, falttedPosts, locale, allCategories } = props;
	const [activeCategory, setActiveCategory] = useState("All");

	const tabs = useMemo<{ name: string; text: string }[]>(
		() =>
			[{ name: "All", text: "全部" }].concat(
				allCategories.map((item) => {
					return { name: item.slug, text: item.config.name };
				})
			),
		[allCategories]
	);

	return (
		<>
			<Section>
				<TabContainer>
					{tabs.map((tab) => (
						<TabButton
							key={tab.name}
							active={activeCategory === tab.name}
							onClick={() => setActiveCategory(tab.name)}
						>
							{tab.text}
						</TabButton>
					))}
				</TabContainer>

				<PostList
					activeCategory={activeCategory}
					allPosts={allPosts}
					falttedPosts={falttedPosts}
				/>
				<ButtonWrapper>
					<Text dictionary={postList} language={locale}>
						<Link href="/archive" passHref>
							<CenteredButton>
								<Text allPosts={[falttedPosts.length]} />
							</CenteredButton>
						</Link>
					</Text>
				</ButtonWrapper>
			</Section>
		</>
	);
};

export default Home;
