//@ts-nocheck
import * as React from "react";
import { Card, CardTitle, Typography } from "@kindle-ui/core";
import dic from "../../i18n.json";
import { relatedLinks } from "../../site.config";

const Links = () =>
	relatedLinks.map(({ title, url }, i) => (
		<>
			<a key={title + i} href={url}>
				{title}
			</a>
			&nbsp;
		</>
	));

const RelatedLink = ({ locale = "zh-CN" }) => {
	return (
		<div className="P(10px)">
			<Card>
				<Typography>
					<CardTitle>{dic.RelatedLinks.title[locale]}</CardTitle>{" "}
					<Links />
					<a href="">{dic.RelatedLinks.submit[locale]}</a>
				</Typography>
			</Card>
		</div>
	);
};

export default RelatedLink;
