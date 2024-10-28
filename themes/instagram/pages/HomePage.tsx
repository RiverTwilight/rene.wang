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
							{activeCategory === tab.name && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#1a73e8"
									style={{
										marginRight: "8px",
										verticalAlign: "middle",
									}}
								>
									<path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
								</svg>
							)}
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
								{/* Change the prop name and pass the number directly */}
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
