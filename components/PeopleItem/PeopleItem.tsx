import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkIcon from "../../public/static/icon/link.svg";

/**
 * 单个人物组件
 */

export default function PeopleItem({
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
}) {
	const { nickname, portrait, link, review } = frontmatter;
	const LINK = "/people/" + id;
	return (
		<div key={key} className={"people-item card Br(30px)"}>
			{portrait && (
				<div className="people-item-protrait br-above">
					<Image alt="Picture of the author" unsized src={portrait} />
				</div>
			)}
			<div className={`people-item-content`}>
				<div className="people-item-content-header Dis(flex)">
					<Link href={LINK} locale={lang}>
						<a className="people-item-header-title">{nickname}</a>
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
	);
}
