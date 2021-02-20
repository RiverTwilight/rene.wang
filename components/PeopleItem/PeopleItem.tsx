import * as React from "react";
import ReactMarkdown from "react-markdown";
// import CodeBlock from '../components/CodeBlock'
import Link from "next/link";
import Image from "next/image";
import LinkIcon from "../../static/icon/Link.svg";
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
		link: string;
		review: string;
	};
}) => {
	const { nickname, portrait, link, review } = frontmatter;
	const LINK = "/people/" + id;
	return (
		<Link href={LINK} locale={lang}>
			<div key={key} className={"people-item card Br(30px)"}>
				{portrait && (
					<div className="people-item-protrait br-above">
						<Image
							alt="Picture of the author"
							unsized
							src={portrait}
						/>
					</div>
				)}
				<div className={`people-item-content`}>
					<div className="people-item-content-header Dis(flex)">
						<Link href={LINK}>
							<a className="people-item-header-title">
								{nickname}
							</a>
						</Link>
						{link && (
							<a href={link} className="people-item-header-link">
								<LinkIcon />
							</a>
						)}
						<meta
							itemProp="url"
							content={`https://ygk-blog.yunser.com/people/${id}`}
						/>
						<meta itemProp="name" content={nickname} />
					</div>
					<div className="people-item-content-text">
						<p>{review}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
