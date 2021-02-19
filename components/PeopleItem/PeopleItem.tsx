import * as React from "react";
import ReactMarkdown from "react-markdown";
// import CodeBlock from '../components/CodeBlock'
import Link from "next/link";
import Image from "next/image";
import Text from "../../utils/i18n";
import { postItem } from "../../data/i18n.json";
//  '../scss/typo.scss'

/**
 * 单个人物组件
 */

export default ({
	frontmatter,
	key,
	body,
	id,
	lang,
}: {
	id: string;
	key: string | number;
	body: string;
	lang: string;
	frontmatter: {
		nickname: string;
		portrait: string;
		date: string;
	};
}) => {
	const { nickname, portrait, date } = frontmatter;
	const LINK = "/people/" + id;
	return (
		<Link href={LINK} locale={lang}>
			<div key={key} className={"people-item"}>
				{portrait && (
					<div className="people-item-portrait">
						<div className="people-item-portrait-inner">
							<Image unsized alt={nickname} src={portrait} />
						</div>
					</div>
				)}
				<div className={`people-item-content`}>
					<div className="people-item-content-header">
						<a className="people-item-header-title">{nickname}</a>
						<meta
							itemProp="url"
							content={`https://ygk-blog.yunser.com/people/${id}`}
						/>
						<meta itemProp="name" content={nickname} />
						<div className="people-item-header-date">{date}</div>
					</div>
					<div className="people-item-content-text">
						<ReactMarkdown allowedTypes={["paragraph", "text"]}>
							{body.replace(/\<[^\>]+\>/g, "")}
						</ReactMarkdown>
					</div>
				</div>
			</div>
		</Link>
	);
};
