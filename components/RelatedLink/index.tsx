//@ts-nocheck
import * as React from "react";
import { Card, Typography } from "kindle-ui";
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
		<Card>
			<Typography>
				<div className="P(10px) Textc(secondary)">
					{dic.RelatedLinks.title[locale]}: <Links />
					<a href="">{dic.RelatedLinks.submit[locale]}</a>
				</div>
			</Typography>
		</Card>
	);
};

export default RelatedLink;
