import * as React from "react";
import { Card, CardTitle, Typography, CardContent } from "@kindle-ui/core";
import dic from "../i18n.json";
import type { ISiteConfig } from "@/types/index";
import styled from "styled-components";

const LinkList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	row-gap: 0.5em;
	column-gap: 0.75em;

	@media (max-width: 767px) {
		grid-template-columns: repeat(2, 1fr);
	}

	& a {
		color: inherit;
	}
`;

const LinkItem = ({ title, url }) => (
	<a key={title} href={url}>
		{title}
	</a>
);

const RelatedLink = ({
	locale = "zh-CN",
	links = [],
}: {
	locale: string;
	links: ISiteConfig["relatedLinks"];
}) => {
	return (
		<div className="P(10px)">
			<Card>
				<CardTitle>{dic.RelatedLinks.title[locale]}</CardTitle>
				<CardContent>
					<Typography>
						<LinkList>
							{[
								...links,
								{
									title: dic.RelatedLinks.submit[locale],
									url: "https://github.com/RiverTwilight/rene.wang/issues/22",
								},
							].map((item, i) => (
								<LinkItem {...item} key={i} />
							))}
						</LinkList>
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default RelatedLink;
